import { pool } from "../clientPostgres.js";
import fs from "fs";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import path from "path";

dotenv.config();    

const executeMigrations = async () => {
    const currentDir = path.dirname(fileURLToPath(import.meta.url));
    const migrationPath = path.join(currentDir, "01-init.sql");
    const script = fs.readFileSync(migrationPath, "utf-8");
    const client = await pool.connect();
    try {
        await client.query(script.toString());
        console.log("Migrations executed successfully");
    } catch (err) {
        console.error("Error executing migrations", err);
        throw err;
    } finally {
        client.release();
    }
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    executeMigrations()
        .then(() => process.exit(0))
        .catch(() => process.exit(1));
}

export default executeMigrations;
