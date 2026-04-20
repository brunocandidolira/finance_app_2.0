import { Router } from "express";
import { user_Controller } from "../controller/userController.js";

export const userRouter = Router();

// Função que "envelopa" o controller para capturar erros assíncronos
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

const userController = new user_Controller();

userRouter.post("/users", asyncHandler(userController.createUser.bind(userController)));
userRouter.get("/users/:id", asyncHandler(userController.getUser.bind(userController)));
