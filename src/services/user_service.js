import {v4 as uuidv4} from 'uuid';
import { id } from 'zod/locales';
import bcrypt from 'bcrypt';
import { UserRepository } from '../repositories/user_repository.js';



export class ClienteUserService{
async execute(createUserParams){

//virifique se o email já existe(depois criar uma função para isso)

//gerar id do usuario
const userid = uuidv4();



//criptografar senha
const  hashPassword = await bcrypt.hash(createUserParams.password, 10);

//salvar no banco de dados
const user = {
    ...createUserParams,
 id: userid,
 password: hashPassword,
}
//chamar o repositório para salvar o usuário
const  repository = new UserRepository();
return await repository.execute(user);
}

}