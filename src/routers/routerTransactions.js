
import { Router } from 'express';
import { Transaction } from '../controller/transaction.js';
import { middleware } from '../middleware/middleware.js';
import { corsMiddleware } from '../middleware/cors.js';

export  const routerTransactions = Router();


const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
const transactionController = new Transaction();

routerTransactions.post("/transactions", corsMiddleware, middleware, asyncHandler(transactionController.execute.bind(transactionController)));
routerTransactions.get("/transactions/:id",corsMiddleware, middleware, asyncHandler(transactionController.getTransactionById.bind(transactionController)));
routerTransactions.delete("/transactions/:id",corsMiddleware, middleware, asyncHandler(transactionController.deleteTransaction.bind(transactionController)));
routerTransactions.put("/transactions/:id",corsMiddleware, middleware, asyncHandler(transactionController.updateTransaction.bind(transactionController)));

export default routerTransactions;
