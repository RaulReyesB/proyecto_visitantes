import { Router } from "express";
import { requireAuth, requireSuperUser, requireRH } from "../middlewares/auth.js";
import { historySC } from "../controllers/hsc.controller.js";

const hsc =Router();

hsc.get("/serviciosCompletos", historySC)

export default hsc