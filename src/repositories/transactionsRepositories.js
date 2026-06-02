
import clientPostgres from "../db/postgres/clientPostgres.js";


export class TransactionRepository{


    async createTransaction(transaction){
        // Lógica para criar uma transação no banco de dados

        const results = await clientPostgres.query(
            "INSERT INTO transactions (user_id, amount, name,data,transiction_type) VALUES ($1, $2, $3,$4,$5  ) RETURNING *",
            [
            transaction.userId,
             transaction.amount,
            transaction.name,
             transaction.data , 
             transaction.type]
          );
          return results.rows[0];
    }

    async getTransactionById(id){
        // Lógica para obter uma transação específica do banco de dados
        const results = await clientPostgres.query(
            "SELECT * FROM transactions WHERE id = $1",
            [id]
          );
          return results.rows[0];   
        
        
    }

    async getTransactionsByUserId(userId){
        // Lógica para obter as transações de um usuário específico do banco de dados
       const results = await clientPostgres.query(  
        "SELECT * FROM transactions WHERE user_id = $1",
        [userId]
      );
      return results.rows;

       
    }
async updateTransaction(id, transaction){
        // Lógica para atualizar uma transação existente no banco de dados
    const results = await clientPostgres.query(
        "UPDATE transactions SET amount = $1, name = $2, data = $3, transiction_type = $4 WHERE id = $5 RETURNING *",
        [
            transaction.amount,
            transaction.name,
            transaction.data,
            transaction.type,
            id
        ]
      );
      return results.rows[0];
    
    
    }

    async deleteTransaction(id){
        // Lógica para excluir uma transação do banco de dados
       const results = await clientPostgres.query(
        "DELETE FROM transactions WHERE id = $1 RETURNING *",
        [id]
      );
      return results.rows[0];
    }   
async getAllTransactions(userId){
       
        const results = await clientPostgres.query(
            "SELECT * FROM transactions WHERE user_id = $1",
            [userId]
          );
          return results.rows;  
    }

    async getTransactionstotal(userId){
        const balance = await clientPostgres.query(
        `SELECT
        SUM (CASE WHEN transiction_type = 'EARNING' THEN amount ELSE 0 END) AS _earning,
        SUM (CASE WHEN transiction_type = 'EXPENSE' THEN amount ELSE 0 END) AS_expense,
        SUM (CASE WHEN transiction_type = 'INVESTMENT' THEN amount ELSE 0 END) AS   _investment,
        ( SUM (CASE WHEN transiction_type = 'EARNING' THEN amount ELSE 0 END) 
        - SUM (CASE WHEN transiction_type = 'EXPENSE' THEN amount ELSE 0 END) 
        - SUM (CASE WHEN transiction_type = 'INVESTMENT' THEN amount ELSE 0 END)) AS balance
        FROM transactions
        WHERE user_id = $1;`
        ,[userId]

    
    
    
    );
          return {
          
          userId,
         ...balance[0], 
          };
    }
   
}       
