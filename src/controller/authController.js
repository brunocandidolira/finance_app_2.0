import { AuthService } from "../services/authService.js";




export class AuthController{


constructor(){

this.auth = new AuthService();


}
async login(req, res, next)  {  

try{
    if(
        typeof req.body.email !== "string" ||
        typeof req.body.password !== "string" ||
        !req.body.email.trim() ||
        !req.body.password
    ){
return res.status(400).json({

    error : "email ou senha não informado",

}
)
    }
const user = await this.auth.login(req.body);
return res.status(200).json(user);
}catch(error){

next(error);

}
}



}
