import { Router } from "express";
import multerConfig from "../middlewares/multerConfig.js"; // Asegúrate de actualizar el path
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
  insertIntern,
} from "../controllers/interns.controller.js";
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
routesInterns.post(
  "/registroInternos",
  requireAuth,
  requireSuperUserOrRH,
  multerConfig.single("img"),
  insertIntern);

export default routesInterns;
