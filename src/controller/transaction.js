import { TransactionService } from "../services/transactionService.js";



export class Transaction{

    constructor(){
this.transactionService=new TransactionService();
    }

async execute(req,res,next){
    try{
        const token=req.headers.authorization;
        if (!token){
            throw new Error("precisa estar logado para acessar fazer transação");
        }
        const user=await this.transactionService.execute(req.body);
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
        const user=await this.transactionService.getTransaction(req.params.id);
        res.status(200).json(user);     
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
    }
    async getTransactionById(req,res,next){
        try{
            const token=req.headers.authorization;  
            if (!token){
                throw new Error("precisa estar logado para acessar fazer transação");
            }
            const user=await this.transactionService.getTransactionById(req.params.id);
            res.status(200).json(user);     
        }
            catch(error){
                res.status(401).json({message:error.message});
            }
        }   
        async deleteTransaction(req,res,next){
            try{
                const token=req.headers.authorization;
                if (!token){
                    throw new Error("precisa estar logado para acessar fazer transação");
                    }
                const user=await this.transactionService.deleteTransaction(req.params.id);
                res.status(200).json(user);     
            }
                catch(error){
                    res.status(401).json({message:error.message});
                }
            }
            async updateTransaction(req,res,next){
                try{
                    const token=req.headers.authorization;
                    if (!token){
                        throw new Error("precisa estar logado para acessar fazer transação");
                        }
                    const user=await this.transactionService.updateTransaction(req.params.id,req.body);
                    res.status(200).json(user);     
                }

                    catch(error){
                        res.status(401).json({message:error.message});
                    }

                }


           async getAllTransactions(req,res,next){
    try{
        const token=req.headers.authorization;
        
        if (!token){
            throw new Error("precisa estar logado para acessar fazer transação");
            }
       const idUser=req.params.id;
        const user=await this.transactionService.getAllTransactions(idUser);
        res.status(200).json(user);  
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
    }
    

async getTransactionsByType(req,res,next){
    try{
        const token=req.headers.authorization;
        if (!token){
            throw new Error("precisa estar logado para acessar fazer transação");
            }
            if (!req.params.id){
                throw new Error("id do usuário é necessário para acessar as transações por tipo");
            }
            const  verifyUser=await this.transactionService.getAllTransactions(req.params.id);
            if (!verifyUser){
                throw new Error("usuário não encontrado");
            }
        const user=await this.transactionService.getTransactionsByType(req.params.id);
        res.status(200).json(user);  
    }
        catch(error){
            res.status(401).json({message:error.message});
        }
     }



}
