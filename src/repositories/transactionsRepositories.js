import clientPostgres from "../db/postgres/clientPostgres.js";

export class TransactionRepository {

  async createTransaction(transaction) {
    const result = await clientPostgres.query(
      `INSERT INTO transactions
      (id, user_id, amount, name, date, type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *`,
      [
        transaction.id,
        transaction.user_id,
        transaction.amount,
        transaction.name,
        transaction.date,
        transaction.type,
      ]
    );

    return result.rows[0];
  }

  async getTransactionById(id) {
    const result = await clientPostgres.query(
      "SELECT * FROM transactions WHERE id = $1",
      [id]
    );

    return result.rows[0];
  }

  async getTransactionsByUserId(userId, id) {
    const result = await clientPostgres.query(
      "SELECT * FROM transactions WHERE user_id = $1 AND id = $2",
      [userId, id]
    );

    return result.rows;
  }

  async updateTransaction(id, userId, transaction) {
    const result = await clientPostgres.query(
      `UPDATE transactions
       SET amount = $1,
           name = $2,
           date = $3,
           type = $4
       WHERE id = $5
         AND user_id = $6
       RETURNING *`,
      [
        transaction.amount,
        transaction.name,
        transaction.date,
        transaction.type,
        id,
        userId,
      ]
    );

    return result.rows[0];
  }

  async deleteTransaction(id) {
    const result = await clientPostgres.query(
      "DELETE FROM transactions WHERE id = $1 RETURNING *",
      [id]
    );

    return result.rows[0];
  }

  async getAllTransactions(userId) {
    const result = await clientPostgres.query(
      "SELECT * FROM transactions WHERE user_id = $1 ORDER BY date DESC",
      [userId]
    );

    return result.rows;
  }

  async getTransactionsTotal(user_id) {
    const result = await clientPostgres.query(
      `
      SELECT
        COALESCE(SUM(CASE WHEN type = 'earning' THEN amount ELSE 0 END), 0) AS earning,
        COALESCE(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS expense,
        COALESCE(SUM(CASE WHEN type = 'investment' THEN amount ELSE 0 END), 0) AS investment,
        COALESCE(
          SUM(CASE WHEN type = 'earning' THEN amount ELSE 0 END)
          - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)
          - SUM(CASE WHEN type = 'investment' THEN amount ELSE 0 END),
          0
        ) AS balance
      FROM transactions
      WHERE user_id = $1
      `,
      [user_id]
    );

    return result.rows[0];
  }

  async getTransactionsByType(userId, type) {
    const result = await clientPostgres.query(
      "SELECT * FROM transactions WHERE user_id = $1 AND type = $2 ORDER BY date DESC",
      [userId, type]
    );

    return result.rows;
  }
}