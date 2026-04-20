import "dotenv/config";
import express from "express";
import { pool } from "./src/db/postgres/clientPostgres.js";
import { userRouter } from "./src/routers/routerUser.js";


export const app = express();
app.use(express.json());

app.use(userRouter);

// Middleware Global de Erro
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({ 
      message: "Erro de validação", 
      errors: err.errors 
    });
  }

  res.status(err.status || 500).json({ 
    error: err.message || 'Erro interno no servidor' 
  });
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