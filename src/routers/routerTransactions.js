
import { Router } from 'express';
import { Transaction } from '../controller/transaction.js';


export  const routerTransactions = Router();


const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};
const transactionController = new Transaction();

routerTransactions.post("/transactions", asyncHandler(transactionController.execute.bind(transactionController)));
routerTransactions.get("/transactions/:id", asyncHandler(transactionController.getTransactionById.bind(transactionController)));
routerTransactions.delete("/transactions/:id", asyncHandler(transactionController.deleteTransaction.bind(transactionController)));
routerTransactions.put("/transactions/:id", asyncHandler(transactionController.updateTransaction.bind(transactionController)));

export default routerTransactions;
