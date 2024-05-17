import { Router } from "express";
import { controllInterns,registrarEntrada, registrarSalida } from "../controllers/interns.js";

const routesInterns = Router();

routesInterns.get("/controlPasantes", controllInterns );
routesInterns.post("/interns/entrada/:id", registrarEntrada);
routesInterns.post("/interns/salida/:id", registrarSalida);

export default routesInterns;
