import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";
import { pool } from "../db.js";

export async function createAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: "1d" }, (err, encode) => {
      if (err) reject(err);
      resolve(encode);
    });
  });
}
export async function validateToken(token) {
  try {
    const data = await new Promise((resolve, reject) => {
      jwt.verify(token, TOKEN_SECRET, (err, data) => {
        if (err) {
          return reject(err);
        } else return resolve(data);
      });
    });

    const [userExists] = await pool.query(
      "SELECT id,name,email FROM users where id = ?",
      [data.id]
    );
    if (!userExists) {
      throw new Error("user not found.");
    }

    return userExists[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

/* El jwt recibe el valor, la palabra secreta, opciones, y un callback para manejar la respuesta
creo esta función para que quede mas limpio el código cuando lo creo. */

// createAccessToken
/* Devuelve una promesa con el token o un error */
