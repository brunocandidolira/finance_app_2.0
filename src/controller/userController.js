import { CreateUserSchema } from '../db/schemas/userSchema.js';
import { User_Service } from '../services/userService.js';


export class user_Controller {
    constructor() {
        this.userService = new User_Service();
    }

    async createUser(req, res) {
       try {
        const data = CreateUserSchema.parse(req.body);
        

        const user = await this.userService.execute(data);
        res.status(201).json(user);
    }
    catch (badrequest) {
        res.status(400).json({ error: badrequest.message });

    }
}
async getUser(req, res) {
    try {
        const user = await this.userService.getUserByEmail(req.params.email);
        return res.status(200).json(user);
    }
    catch (badrequest) {
        res.status(400).json({ error: badrequest.message });

    }

}
}