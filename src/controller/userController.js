import { CreateUserSchema } from '../db/schemas/userSchema.js';
import { User_Service } from '../services/userService.js';


export class user_Controller {
    constructor() {
        this.userService = new User_Service();
    }

    async createUser(req, res,next) {
       try {
        const data = CreateUserSchema.parse(req.body);
        

        const user = await this.userService.execute(data);
        res.status(201).json(user);
    }
    catch (error)
 {

       next(error);

    }
}
async getUser(req, res) {
    try {
        const user = await this.userService.getUserById(req.params.id);
        return res.status(200).json(user);
    }
    catch (badrequest) {
        res.status(400).json({ error: badrequest.message });

    }

}
}