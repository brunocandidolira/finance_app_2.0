import PG from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = PG;

 export const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: Number(process.env.POSTGRES_PORT)|| Number(process.env.POSTGRES_PORT2),
});

export  const clientPostgres = {
query: async (text, params) => {

  const client = await pool.connect();
  try {
    const res = await client.query(text, params);
    return res;
  } catch (err) {
    console.error("Error executing query", err);
    throw err;
  } finally {
    client.release();
  }
}};
export default clientPostgres;
