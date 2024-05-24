import { Router } from "express";
import { requireAuth, requireSuperUser, requireRH } from "../middlewares/auth.js";
import { finishRegistration, badgeOcuppied } from "../controllers/pendingRecords.controllers.js";
const pdR = Router();

pdR.get("/finalizarRegistro/:id", requireAuth, finishRegistration);
pdR.get("/badges/occupied", badgeOcuppied);

export default pdR