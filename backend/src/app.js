import express from "express";

import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import routesAuth from "./routes/auth.routes.js";
import routesIndex from "./routes/index.routes.js";
import routesUsers from "./routes/users.routes.js";
import routesTasks from "./routes/tasks.routes.js";
import routesSites from "./routes/sites.routes.js";
import routesAvatar from "./routes/avatar.routes.js";

const app = express();
dotenv.config();
/* Middleware */
app.use(express.json());
app.use(cookieParser());

/* Agregar los dominios */
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
