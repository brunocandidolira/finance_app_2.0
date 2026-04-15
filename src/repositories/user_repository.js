import clientPostgres from "../db/postgres/clientPostgres";
import { UserSchema } from "../db/schemas/user_schema";
export class CreateUsersRepository {
   async execute(userSchema) {
     const results= await  clientPostgres.query("INSERT INTO users (ID,first_name,last_name, email, password) VALUES ($1, $2, $3,$4, $5) *",
        [ userSchema.id,
         userSchema.first_name, 
         userSchema.last_name, 
         userSchema.email,
         userSchema.password
        ]
        );
        return results.rows[0];
    }

    }