
import { TransactionRepository } from "../repositories/transactionsRepositories.js";
import { v4 as uuidv4 } from 'uuid';


export  class TransactionService{
constructor(){
    this.transactionRepository=new TransactionRepository();

}



async execute(data){
   try{
    console.log("data",data )
    const id=uuidv4();
    const transactionfin={
        ...data,
        id
    }
    console.log("transactionfin",transactionfin )
    const transaction=await this.transactionRepository.createTransaction(transactionfin);
    return transaction;
   }
   catch(error){
    throw new Error(error.message);
   }    
}
   async getTransaction(id){
    try{
        const transaction=await this.transactionRepository.getTransaction(id);
        return transaction;
       }
       catch(error){
        throw new Error(error.message);
       }    
   }
   async getTransactionById(user_id,id){
    try{
        const transaction=await this.transactionRepository.getTransactionById(user_id,id);
        return transaction;
       }
       catch(error){
        throw new Error(error.message);
       }    
   }
   async deleteTransaction(id){
    try{
const  transaction=await this.transactionRepository.getTransactionById(id);
if (!transaction){
    throw new Error("transação não encontrada");
}
await this.transactionRepository.deleteTransaction(id);
return transaction;
    
      
       }
       catch(error){
        throw new Error(error.message);
       }    
   }
   async updateTransaction(user_id,data,id){
    try{
       const transaction= await this.transactionRepository.getTransactionById(id);
       if (!transaction){
        throw new Error("transação não encontrada");
       }

       transaction.amount=data.amount || transaction.amount;
       transaction.name=data.name || transaction.name;
       transaction.data=data.data || transaction.data;
       transaction.type=data.type || transaction.type;
       await this.transactionRepository.updateTransaction(user_id,transaction,id);
        return transaction;
       }
       catch(error){
        throw new Error(error.message);
       }    
   } 
   getAllTransactions(userId){
    try{
        const transactions= this.transactionRepository.getAllTransactions(userId);
        return transactions;
       }
       catch(error){
        throw new Error(error.message);
       }    
   }  
   
   async getTransactionsByType(id,type){

    try{
        const transactions= await this.transactionRepository.getTransactionsByType(id,type);
        return transactions;
       }
       catch(error){
        throw new Error(error.message);
       }    
   }   
   async getTransactionsTotals(user_id){

    try{
        const transactions= await this.transactionRepository.getTransactionsTotal(user_id);
        return transactions;
       }
       catch(error){
        throw new Error(error.message);
       }    
    }

}
