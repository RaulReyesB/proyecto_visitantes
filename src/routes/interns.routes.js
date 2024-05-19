import { Router } from "express";
import { requireAuth, requireRH } from "../middlewares/auth.js";
import {
  controllInterns,
  registrarEntrada,
  registrarSalida,
  getInternDetails,
} from "../controllers/interns.js";
import Intern from "../models/Intern.js";

const routesInterns = Router();

routesInterns.get("/controlPasantes", requireAuth, controllInterns);
routesInterns.post(
  "/interns/entrada/:id",
  requireAuth,
  requireRH,
  registrarEntrada
);
routesInterns.post(
  "/interns/salida/:id",
  requireAuth,
  requireRH,
  registrarSalida
);
routesInterns.get("/Pasante/info/:id", requireAuth,getInternDetails);

export default routesInterns;
