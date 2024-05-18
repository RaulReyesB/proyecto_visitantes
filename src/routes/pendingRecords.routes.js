import { Router } from "express";
import { requireAuth, requireSuperUser, requireRH } from "../middlewares/auth.js";
import { finishRegistration } from "../controllers/pendingRecords.controllers.js";
const pdR = Router();

pdR.get("/finalizarRegistro/:id", requireAuth, finishRegistration);

export default pdR