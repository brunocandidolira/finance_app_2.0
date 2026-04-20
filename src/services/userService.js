import {v4 as uuidv4} from 'uuid';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/userRepository.js';
import { conflictError } from '../controller/error.js';


export class User_Service{
    constructor(){
 this.repository = new UserRepository();
    }

async execute(createUserParams){
    
try{
const normalizedEmail = createUserParams.email.trim().toLowerCase();
//virifique se o email já existe(depois criar uma função para isso) 
const existingUser = await this.repository.getUserByEmail(normalizedEmail);
if(existingUser){
   throw conflictError("Email já cadastrado");
}
//gerar id do usuario
const userid = uuidv4();

//criptografar senha
const  hashPassword = await bcrypt.hash(createUserParams.password, 10);

//salvar no banco de dados
const user = {
    ...createUserParams,
 id: userid,
 email: normalizedEmail,
 password: hashPassword,
}
//chamar o repositório para salvar o usuário
await this.repository.execute(user);
const{password, ...userWithoutPassword} = user;
return userWithoutPassword;
}
catch (error) {
    if (error.code === "23505") {
        throw conflictError("Email já cadastrado");
    }

    if (error.status) {
        throw error;
    }

    throw new Error("Erro ao criar usuário: " + error.message); 

}
}
async getUserByEmail(email) {
try {
    const user = await this.repository.getUserByEmail(email);   
return user;

}   
catch (error) {
    throw new Error("Erro ao buscar usuário por email: " + error.message); 

}
}
}
