import "dotenv/config";
import express from "express";
import { pool } from "./src/db/postgres/clientPostgres.js";
import executeMigrations from "./src/db/postgres/migrations/exec.js";


const app = express();
app.use(express.json());

app.get("/",async (req, res) => {
   try{
  
    // Usar pool.query diretamente gerencia automaticamente o checkout e release da conexão
    const result = await pool.query("SELECT * FROM users");
    return res.json(result.rows);
   }catch(error){
    console.error("Database error:", error);
    return res.status(500).json({ error: "Internal Server Error" });    
   }
});

app.listen(process.env.PORT, async () => {
  console.log("Example app listening on port 8080!");
  try {
  
    const res = await pool.query("SELECT NOW()");
    console.log("Database connection established successfully at:", res.rows[0].now);

  } catch (error) {
    console.error("Failed to connect to the database on startup:", error.message);
  }
});

export default app;     