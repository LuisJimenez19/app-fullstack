import express from "express";
// import session from "express-session";
import cors from "cors";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";

// import MySQLStore from "express-mysql-session";
// const MySQLStore = require("express-mysql-session")(session);

import routesAuth from "./routes/auth.routes.js";
import routesIndex from "./routes/index.routes.js";
import routesUsers from "./routes/users.routes.js";
import routesTasks from "./routes/tasks.routes.js";
import routesSites from "./routes/sites.routes.js";
import routesAvatar from "./routes/avatar.routes.js";
import jwt from "jsonwebtoken";

const app = express();
dotenv.config();
/* Middleware */
app.use(express.json());
app.use(cookieParser());

/* Guarda la la gran hijueputa sesion en la base de datos pero no quiere servir esa gonorrea */
/* const sessionStore = new MySQLStore({
  host: "localhost",
  user: "root",
  password: "",
  port: 3306,
  database: "taskdb",
},pool); */

/* Sesión */ //-> Uso JWT para la sesión y la autenticación
/* app.use(
  session({
    key: "cookie_user",
    secret: "super_secret",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
); */

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://192.168.0.109:5173",
      "http://localhost:4173",
    ],
    credentials: true,
  })
);

/* Rutas */

app.use("/api/", routesAuth); //auth

app.use("/api/", routesIndex); // raiz
app.use("/api/", routesUsers); // users
app.use("/api/", routesTasks); // tasks
app.use("/api/", routesAvatar);
app.use("/api/", routesSites);

/* Rutas que no existen */
app.use("/api/", (req, res) => {
  res.status(404).json({
    message: `Since we know you won't read this except by clicking on some page that doesn't exist (and all our pages do exist), we can afford to write anything.
    for example: It was a goal by Yepes.`,
  });
});

export { app };
