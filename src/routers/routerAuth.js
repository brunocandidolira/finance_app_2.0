import {Router} from "express";
import  {AuthController}  from "../controller/authController.js";
import { corsMiddleware } from "../middleware/cors.js";


export const authRouter = Router();


const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
const auth= new AuthController();

authRouter.post("/auth/login",corsMiddleware, asyncHandler(auth.login.bind(auth)));
authRouter.post("/refresh", corsMiddleware,asyncHandler(auth.refresh.bind(auth)));

export default authRouter;
