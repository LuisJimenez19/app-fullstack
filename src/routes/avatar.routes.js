import { Router } from "express";
import { authSession } from "../middleware/auth.middleware.js";
import { pool } from "../db.js";

const routesAvatar = Router();

routesAvatar.get("/gravatar", authSession, async (req, res) => {
  /*  pool
    .query("SELECT * FROM default_url_gravatar")
    .then(([res]) => res)
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    });
  console.log("Usando una promesa"); */

  try {
    const [result] = await pool.query("SELECT * FROM default_url_gravatar");
    //   console.log("usando async await");
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

export default routesAvatar;
