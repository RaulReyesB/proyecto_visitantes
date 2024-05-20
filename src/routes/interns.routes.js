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
routesInterns.get("/Pasante/info/:id", requireAuth, async (req, res) => {
  try {
    const intern = await Intern.findByPk(req.params.id);
    const name = await Intern.findByPk(req.params.name)
    if (intern) {
      res.render("infoInterns", {namePage:"Informacion del pasante", descripcion:`Informacion de el usuario ${name}`, intern });
    } else {
      res.status(404).send("Pasante no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener pasante:", error);
    res.status(500).send("Error al obtener pasante");
  }
});

export default routesInterns;
