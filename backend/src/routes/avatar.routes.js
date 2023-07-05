import { Router } from "express";
import { authSession } from "../middleware/auth.middleware.js";
import { pool } from "../db.js";

const routesAvatar = Router();

routesAvatar.get("/gravatar", authSession, async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM default_url_gravatar");

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
});

export default routesAvatar;
