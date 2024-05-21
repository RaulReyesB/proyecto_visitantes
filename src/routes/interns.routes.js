import { Router } from "express";
import {
  requireAuth,
  requireRH,
  requireSuperUserOrRH,
  requireUserOrRH,
} from "../middlewares/auth.js";
import {
  controllInterns,
  registrarEntrada,
  registrarSalida,
  getInternDetails,
} from "../controllers/interns.js";
import Intern from "../models/Intern.js";

const routesInterns = Router();

routesInterns.get(
  "/controlPasantes",
  requireAuth,
  requireUserOrRH,
  controllInterns
);
routesInterns.post(
  "/interns/entrada/:id",
  requireAuth,
  requireUserOrRH,
  registrarEntrada
);
routesInterns.post(
  "/interns/salida/:id",
  requireAuth,
  requireUserOrRH,
  registrarSalida
);
routesInterns.get(
  "/Pasante/info/:id",
  requireAuth,
  requireSuperUserOrRH,
  getInternDetails
);

export default routesInterns;
