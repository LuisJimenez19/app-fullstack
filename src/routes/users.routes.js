import express from "express";
import { pool } from "../db.js";
import bycriptjs from "bcryptjs";
import { EMAILREGEX } from "../utils/regex.js";
import { authSession } from "../middleware/auth.middleware.js";
import { deleteUser, getUsers, updateUser } from "../controllers/users.controller.js";

const routesUsers = express.Router();

/* get all users */
routesUsers.get("/users",authSession, getUsers);

/* Update user */
routesUsers.patch("/user/:id",authSession, updateUser);

/* Delete user */
routesUsers.delete("/user/:id",authSession, deleteUser);

/* todo:
    organizar en los controladores y hacer el crud con los sitios favoritos. */
/* No trae un solo usuario, los datos se le dan al cliente al momento de logearse */
export default routesUsers;
