import { pool } from "../clientPostgres.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();    

const executeMigrations = async () => {
    const path = "./src/db/postgres/migrations/01-init.sql";
    const script=  fs.readFileSync(path, "utf-8");
    const client = await pool.connect();
    try {
        await client.query(script.toString());
        console.log("Migrations executed successfully");
    } catch (err) {
        console.error("Error executing migrations", err);
    } finally {
        client.release();
    }
};

export default executeMigrations;