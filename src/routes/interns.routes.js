import { Router } from "express";
import { requireAuth, requireSuperUser } from "../middlewares/auth.js";
import {
  controllInterns,
  registrarEntrada,
  registrarSalida,
  getInternDetails,
} from "../controllers/interns.js";

const routesInterns = Router();

routesInterns.get(
  "/controlPasantes",
  requireAuth,
  requireSuperUser,
  controllInterns
);
routesInterns.post("/interns/entrada/:id", registrarEntrada);
routesInterns.post("/interns/salida/:id", registrarSalida);
routesInterns.get("/Pasante/info/:id", getInternDetails);

export default routesInterns;
