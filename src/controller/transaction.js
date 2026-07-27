import { TransactionService } from "../services/transactionService.js";

import{middleware} from "../middleware/middleware.js";

export class Transaction{

    constructor(){
this.transactionService=new TransactionService();
    }

async execute(req,res,next){
    try{
       
        const user_id=req.id;
        console.log("chegou aqui", user_id)
        if (!user_id){
            throw new Error("precisa estar logado para acessar fazer transação");
        }
        
        const transactionData={
            ...req.body,
            user_id
        }
        console.log("transactionData",transactionData)
        const user=await this.transactionService.execute(transactionData);
        res.status(200).json(user);


    }
        catch(error){
            res.status(401).json({message:error.message});
        }
    

    }

async getTransaction(req,res,next){
    try{
        const token=req.headers.authorization;
        if (!token){
            throw new Error("precisa estar logado para acessar fazer transação");
        }
        const id=req.id
        const user=await this.transactionService.getTransaction(id);
        res.status(200).json(user);     
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
    }
    async getTransactionById(req,res,next){
        try{

          const user_id=req.id;
          if (!user_id){
              throw new Error("precisa estar logado para acessar fazer transação");
          }
            const user=await this.transactionService.getTransactionById(user_id,req.params.id);
            res.status(200).json(user);     
        }
            catch(error){
                res.status(401).json({message:error.message});
            }
        }   
        async deleteTransaction(req,res,next){
            try{
                const user_id=req.userId;
                if (!user_id){
                    throw new Error("precisa estar logado para acessar fazer transação");
                }
                const user=await this.transactionService.deleteTransaction(user_id);
                res.status(200).json(user);     
            }
                catch(error){
                    res.status(401).json({message:error.message});
                }
            }
            async updateTransaction(req,res,next){
                try{
                    const user_id=req.userId;
                    if (!user_id){
                        throw new Error("precisa estar logado para  acessar fazer transação");
                    }
            
                    const user=await this.transactionService.updateTransaction(user_id,req.params.body,req.params.id);
                    res.status(200).json(user);     
                }

                    catch(error){
                        res.status(401).json({message:error.message});
                    }

                }


           async getAllTransactions(req,res,next){
    try{
       const user_id=req.id;
       if (!user_id){
        throw new Error("precisa estar logado para acessar fazer transação");
        }

        const user=await this.transactionService.getAllTransactions(user_id);
        res.status(200).json(user);  
        console.log(user)
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
    }
    

async getTransactionsByType(req,res,next){
    try{
       const user_id=req.id;

            const  verifyUser=await this.transactionService.getAllTransactions(user_id);
            if (!verifyUser){
                throw new Error("usuário não encontrado");
            }
           
        const user=await this.transactionService.getTransactionsByType(user_id,req.params.type);
        res.status(200).json(user);  
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
     }

async getTansactionsTotals(req,res,next){
    try{
       
            const user_id= req.id;
            if(!user_id){
                throw new Error("o usuario precisa logar!!");   
            
            }
            console.log("passou aqui")
            const  result=await this.transactionService.getTransactionsTotals(user_id);
            if (!result){
                throw new Error("usuário não encontrado");

            }
        res.status(200).json(result);  
        console.log(result)
    }
        catch(error){
            res.status(401).json({message:error.message});
        }     

}
}
