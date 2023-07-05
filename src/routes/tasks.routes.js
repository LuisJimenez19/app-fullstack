import express from "express";
import { pool } from "../db.js";
import { createTask, deleteTask, getTask, getTasks, updateTask } from "../controllers/tasks.controller.js";
import { authSession } from "../middleware/auth.middleware.js";

const routesTasks = express.Router();
/* get all tasks of the user in the sesion */
routesTasks.get("/tasks",authSession, getTasks);

/* create one task */
routesTasks.post("/task",authSession, createTask);

/* get task */
routesTasks.get("/task/:task_id",authSession, getTask);

/* update task */

routesTasks.patch("/task/:task_id",authSession, updateTask);

/* delete task */

routesTasks.delete("/task/:task_id",authSession, deleteTask);

export default routesTasks;
