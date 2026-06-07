import { Router } from "express";
import { user_Controller } from "../controller/userController.js";
import { middleware } from "../middleware/middleware.js";
import { corsMiddleware } from "../middleware/cors.js";

export const userRouter = Router();

// Função que "envelopa" o controller para capturar erros assíncronos
const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

const userController = new user_Controller();

userRouter.post("/users", corsMiddleware,middleware,asyncHandler(userController.createUser.bind(userController)));
userRouter.get("/users", corsMiddleware,middleware,asyncHandler(userController.getUser.bind(userController)));
userRouter.get("/users/:id", corsMiddleware,middleware,asyncHandler(userController.getUserById.bind(userController)));
userRouter.put("/users/:id", corsMiddleware,middleware, asyncHandler(userController.userUpdate.bind(userController)));
userRouter.delete("/users/:id",corsMiddleware, middleware, asyncHandler(userController.userDelete.bind(userController)));  

export default userRouter;