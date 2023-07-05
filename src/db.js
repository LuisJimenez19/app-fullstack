import { createPool } from "mysql2/promise";
import { NAME_DB, HOST_DB, PASSWORD_DB, PORT_DB, USER_DB } from "./config.js";

export const pool = createPool({
  host: HOST_DB,
  user: USER_DB,
  password: PASSWORD_DB,
  port: PORT_DB,
  database: NAME_DB,
});
