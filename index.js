import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { pool } from "./src/db/postgres/clientPostgres.js";
import { userRouter } from "./src/routers/routerUser.js";
import {authRouter} from "./src/routers/routerAuth.js";
import { routerTransactions } from "./src/routers/routerTransactions.js";
import { openApiSpec } from "./src/docs/openapi.js";


export const app = express();
app.use(express.json());

app.get("/api-docs.json", (req, res) => {
  res.json(openApiSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

app.use(userRouter);
app.use(authRouter);
app.use(routerTransactions);



// Middleware Global de Erro
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === 'ZodError') {
    return res.status(400).json({ 
      message: "Erro de validação", 
      errors: err.errors 
   });
  }

  if(err.status === 500){ 
   return res.status(500).json({
    message: "Erro Interno do Servidor",
    error: err.body.error || "Ocorreu um erro inesperado"
   }); 
  }
  if(err.status==409  ){
  return res.status(409).json({
    message: "Conflito",
    error: err.body || "Ocorreu um conflito"
  });
  }

  if (err.status) {
    return res.status(err.status).json({
      error: err.body || "Ocorreu um erro"
    });
  }

  return res.status(500).json({
    message: "Erro Interno do Servidor",
    error: err.message || "Ocorreu um erro inesperado"
  });
});


if (process.env.NODE_ENV !== "test") {
  app.listen(process.env.PORT, async () => {
    console.log("Example app listening on port 8080!");
    try {
    
      const res = await pool.query("SELECT NOW()");
      console.log("Database connection established successfully at:", res.rows[0].now);

    } catch (error) {
      console.error("Failed to connect to the database on startup:", error.message);
    }
  });
}

export default app;     
