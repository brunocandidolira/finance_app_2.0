import {Router} from "express";
import  {AuthController}  from "../controller/authController.js";



export const authRouter = Router();


const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
const auth= new AuthController();

authRouter.post("/login", asyncHandler(auth.login.bind(auth)));

export default authRouter;
