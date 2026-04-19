import clientPostgres from "../db/postgres/clientPostgres.js";
export class UserRepository {
   async execute(user) {
    
     const results = await clientPostgres.query(
        "INSERT INTO users (ID, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [
         user.id,
         user.first_name,
         user.last_name,
         user.email,
         user.password,
        ]
      );
      return results.rows[0];
    }

}
