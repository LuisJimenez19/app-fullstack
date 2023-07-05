import { loginController } from "../controllers/auth.controller.js";
import { pool } from "../db.js";
import { validateToken } from "../libs/jwt.js";

export const authSession = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token)
      return res
        .status(401)
        .json({ message: "No token, authorization denied no hay token" });

    try {
      const result = await validateToken(token);

      /*  const [row] = await pool.query(
        "SELECT id,name,email,default_url_id FROM users WHERE id = ?",
        [result.id]
      ); */
      const [row] = await pool.query(
        "SELECT u.id, u.name, u.email, created_at, du.default_url " +
          "FROM users u " +
          "JOIN default_url_gravatar du ON u.default_url_id = du.id " +
          "WHERE u.id = ?",
        [result.id]
      );

      req.user = row[0];

      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        res.cookie("token", "", {
          httpOnly: true,
          secure: true,
          expires: new Date(0),
        });
        return res.status(401).json({
          error: error.name,
          message: "Token expired, please log in again",
        });
      }
      console.log(error);
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
/* Primer verifica que haya un token en cookies 
Después si existe o no.
lo valida, la función manda un error si ya expiro.*/
