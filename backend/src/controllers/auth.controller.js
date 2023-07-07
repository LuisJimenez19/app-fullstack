import { pool } from "../db.js";
import bycriptjs from "bcryptjs";
import { EMAILREGEX } from "../utils/regex.js";

import { createAccessToken, validateToken } from "../libs/jwt.js";

export const pongController = async (req, res) => {
  const { user } = req;

  res.json({ user });
};

/* Register */
export const registerController = async (req, res) => {
  const { token } = req.cookies;

  if (token) {
    res.status(300).json({
      message: "There is already a session.",
      currentUser: req.user,
    });
  } else {
    const { email, name, password } = req.body;

    if (!EMAILREGEX.test(email) || !name || !password) {
      // campos vacios
      return res.status(400).json({
        message: "Invalid credentials.",
      });
    } else {
      const [resultEmail] = await pool.query(
        // el email es invalido
        "SELECT * FROM users WHERE email = (?)",
        [email]
      );
      if (resultEmail.length !== 0) {
        return res.status(400).json({
          message: "Email already has an account.",
          email,
        });
      } else {
        try {
          const pass = await bycriptjs.hash(password, 12);
          const [result] = await pool.query(
            "INSERT INTO users (name, email, password) VALUES (?,?,?)",
            [name, email, pass]
          );
          /* Añado a la sesión antes era con express-session*/

          const token = await createAccessToken({ id: result.insertId });

          res.cookie("token", token, {
            sameSite: "lax",
            httpOnly: true,
          });
          console.log("token register", token);
          console.log({ "res.cookie register": res.cookie });
          return res.status(200).json({
            message: "Successfully registered user.",
            currentUser: {
              id: result.insertId,
              name,
              email,
              default_url: "monsterid", // Tendría que mandar el usuario que devielve de la base de datos, con sus datos
              // pero esto solo es en el primer registro
            },
          });
        } catch (error) {
          console.log(error);
          return res.status(500).json({
            message: "Internal Server Error.",
            error,
          });
        }
      }
    }
  }
};

/* Login */
export const loginController = async (req, res) => {
  const { token } = req.cookies;
  console.log("token login req", token);
  const { email, password } = req.body;
  /* Los campos estan vacios */
  if (!email || !password) {
    return res.status(400).json({
      message: "Invalid credentials.",
    });
  }
  /* Verifica si la credenciales coinciden. */
  try {
    const [result] = await pool.query(
      "SELECT u.id, u.name, u.email, password,created_at, du.default_url " +
        "FROM users u " +
        "JOIN default_url_gravatar du ON u.default_url_id = du.id " +
        "WHERE u.email = ?",
      [email]
    );

    if (result.length === 0) {
      return res.status(400).json({
        message: "No account found with that email.",
        email,
      });
    }
    const passHash = result[0].password;
    const { name, id, default_url } = result[0];

    const verifyPass = await bycriptjs.compare(password, passHash);

    if (!verifyPass) {
      return res.status(400).json({
        message: "Incorrect password.",
      });
    }
    /* Valida si ya esta en sesión, si no lo esta crea un nuevo token en caso de que haya expirado o sea la primera vez */
    try {
      const data = await validateToken(token);
      if (data) {
        return res.status(300).json({
          message: "There is already a session.",
          currentUser: result[0],
        });
      }
    } catch (error) {
      // -> que no haya token o que ya haya expirado.

      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        res.cookie("token", "", {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
        });
        const newToken = await createAccessToken({
          id,
          /*  email, */
        });

        res.cookie("token", newToken, {
          sameSite: "lax",
          httpOnly: true,
        });
        console.log("res login", newToken);
        return res.status(200).json({
          message: "successful start.",
          currentUser: {
            id,
            name,
            email,
            default_url,
          },
        });
      }
      res.status(500).json({
        error: error.name,
        message: "Internal Server Error.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error,
      message: "Internal Server Error.",
    });
  }
};

/**Logout*/
export const logoutController = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0),
  });
  return res.sendStatus(204);
};
