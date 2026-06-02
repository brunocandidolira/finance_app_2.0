import clientPostgres from "../db/postgres/clientPostgres.js";




export class AuthRepository {


async login(email ){

const results = await clientPostgres.query(
"SELECT * FROM users WHERE LOWER(email) = LOWER($1)"
,
[email]

);
return results.rows[0];
    
}






}