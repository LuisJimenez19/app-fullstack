import express from "express";
import { authSession } from "../middleware/auth.middleware.js";

import { createSite, deleteSite, getSite, getSites, updateSite } from "../controllers/sites.controller.js";
const routesSites = express.Router();

routesSites.get("/sites/", authSession, getSites);

routesSites.get("/site/:site_id", authSession, getSite);

routesSites.post("/sites/", authSession, createSite);

routesSites.patch("/site/:site_id", authSession, updateSite);

routesSites.delete("/site/:site_id", authSession, deleteSite);

export default routesSites;

/* poner todo en su controlador a la brga y estandarizar el código y ya solo queda el front */
