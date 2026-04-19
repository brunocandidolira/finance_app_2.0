import { CreateUserSchema } from '../db/schemas/user_schema.js';
import { User_Service } from '../services/user_service.js';


export class user_Controller {
// criar usuário
    async createUser(req, res) {
        const data = CreateUserSchema.parse(req.body);
        const userService = new User_Service();

        const user = await userService.execute(data);
        res.status(201).json(user);
    }
}