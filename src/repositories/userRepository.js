import clientPostgres from "../db/postgres/clientPostgres.js";
export class UserRepository {
   async execute(user) {
    
     const results = await clientPostgres.query(
        "INSERT INTO users (id, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
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
 async getUserByEmail(email) {
    const results = await clientPostgres.query(
        "SELECT * FROM users WHERE LOWER(email) = LOWER($1)",
        [email]
      );
      return results.rows[0];
 }
async getUserById(id) {
    const results = await clientPostgres.query(
        "SELECT * FROM users WHERE id = $1",
        [id]
      );
      return results.rows[0]; 

}
async getUser() {
 const results =
    await clientPostgres.query(
      `
      SELECT *
      FROM users
      `
    );

  return results.rows;
}
   
 async updateUser(id, updateUserParams) {
    const results = await clientPostgres.query(
        "UPDATE users SET first_name = $1, last_name = $2, email = $3, password = $4 WHERE id = $5 RETURNING *",
        [
         updateUserParams.first_name,
         updateUserParams.last_name,
         updateUserParams.email,
         updateUserParams.password,
         id
        ]
      );
      return results.rows[0];
 }
 async deleteUser(id) {
    await clientPostgres.query(
        "DELETE FROM users WHERE id = $1",
        [id]
      );
 }  
}
