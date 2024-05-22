import { Router } from "express";
import { requireAuth } from "../middlewares/auth.js"; // Corrige las importaciones según sea necesario
import { finishRegistration, badgeOcuppied } from "../controllers/pendingRecords.controllers.js";

const pdR = Router();

pdR.get("/finalizarRegistro/:id", requireAuth, finishRegistration);
pdR.get("/badges/occupied", badgeOcuppied);

export default pdR;
