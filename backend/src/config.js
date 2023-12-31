/* Se importan las variables de entorno */
import dotenv from "dotenv";
dotenv.config();
export const TOKEN_SECRET = process.env.TOKEN_SECRET || "gambare";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_PASSWORD = process.env.DB_PASSWORD || "";
export const DB_NAME = process.env.DB_NAME || "taskifyDB";
