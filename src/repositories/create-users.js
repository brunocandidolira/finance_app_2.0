import clientPostgres from "../db/postgres/clientPostgres";

export class CreateUsersRepository {
   async execute(createUserDto ) {
     const results= await  clientPostgres.query("INSERT INTO users (ID,first_name,last_name, email, password) VALUES ($1, $2, $3,$4, $5) *",
        [ createUserDto.id,
         createUserDto.first_name, 
         createUserDto.last_name, 
         createUserDto.email,
          createUserDto.password
        ]
        );
        return results.rows[0];
    }

    }