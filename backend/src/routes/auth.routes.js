import express from "express";
import bycriptjs from "bcryptjs";
import {
  loginController,
  logoutController,
  pongController,
  registerController,
} from "../controllers/auth.controller.js";

import { authSession } from "../middleware/auth.middleware.js";

const routesAuth = express.Router();


routesAuth.get("/verify-session", authSession, pongController);

routesAuth.post("/register", registerController);

routesAuth.post("/login", loginController);

routesAuth.post("/logout", logoutController)

export default routesAuth;
