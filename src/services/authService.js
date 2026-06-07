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

);
const refreshToken = jwt.sign(

    {
id: user.id,
email:user.email
    },
    process.env.JWT_REFRESH_SECRET ,
    {
        expiresIn: "7d"
    }

);

const {
  password: removedPassword,
  ...userWithoutPassword
} = user;

return {
    user: userWithoutPassword,
    token,
    refreshToken
}


}catch(error){

    if(error.status){
        throw error;
    }   
    throw new Error(
     "erro ao fazer login :" + error.message )

}
    }

    async refresh(refreshToken) {
        try {
            if (!refreshToken) {
                throw unauthorizedError("Refresh token não fornecido");
            }

            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

            const newToken = jwt.sign(
                {
                    id: decoded.id,
                    email: decoded.email
                },
                process.env.JWT_REFRESH_SECRET,
                {
                    expiresIn: "7h"
                }
            );

            return {
                token: newToken
            };
        } catch (error) {
            if (error.status) {
                throw error;
            }
            throw unauthorizedError("Refresh token inválido");
        }
    }

}




