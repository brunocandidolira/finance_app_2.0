
import { TransactionRepository } from "../repositories/transactionsRepositories.js";



export  class TransactionService{
constructor(){
    this.transactionRepository=new TransactionRepository();

}



async execute(data){
   try{
    const transaction=await this.transactionRepository.createTransaction(data);
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
   async getTransactionById(id){
    try{
        const transaction=await this.transactionRepository.getTransactionById(id);
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
   async updateTransaction(id,data){
    try{
       const transaction= await this.transactionRepository.getTransactionById(id);
       if (!transaction){
        throw new Error("transação não encontrada");
       }
       transaction.amount=data.amount || transaction.amount;
       transaction.name=data.name || transaction.name;
       transaction.data=data.data || transaction.data;
       transaction.type=data.type || transaction.type;
       await this.transactionRepository.updateTransaction(id,transaction);
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
   
   async getTransactionsByType(userId){

    try{
        const transactions= await this.transactionRepository.getTransactionsByType(userId);
        return transactions;
       }
       catch(error){
        throw new Error(error.message);
       }    
   }    
}
