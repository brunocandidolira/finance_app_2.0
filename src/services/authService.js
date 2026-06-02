import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthRepository } from "../repositories/authRepositoy.js";

import { unauthorizedError } from "../controller/error.js";


import "dotenv/config";




export class AuthService{

    constructor(){
 
 this.repository = new  AuthRepository();


    }
    async login(params){

try{
const {email, password} = params;
const normalizedEmail = email.trim().toLowerCase();
const user = await this.repository.login(normalizedEmail);
if(!user){
    throw unauthorizedError("email ou senha incorretos  ");

}

const passwordMatch = await bcrypt.compare(password, user.password);
if(!passwordMatch){
    throw unauthorizedError("email ou senha incorretos  ");

}
const token= jwt.sign(

    {


id: user.id,
email:user.email


    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }

)
const {
  password: removedPassword,
  ...userWithoutPassword
} = user;

return {
    user: userWithoutPassword,
    token
}


}catch(error){

    if(error.status){
        throw error;
    }   
    throw new Error(
     "erro ao fazer login :" + error.message )

}
    }    

}




