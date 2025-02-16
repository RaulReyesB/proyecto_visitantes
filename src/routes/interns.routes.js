import { Router } from "express";
import multerConfig from "../middlewares/multerConfig.js";
import {
  requireAuth,
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

const routesInterns = Router();


// Rutas protegidas relacionadas con la gestión de pasantes
/**
 * Ruta para controlar a los pasantes.
 * Protegida con requireAuth y requireUserOrRH.
 */
routesInterns.get(
  "/controlPasantes",
  requireAuth,
  requireUserOrRH,
  controllInterns
);

/**
 * Ruta para registrar la entrada de un pasante.
 * Protegida con requireAuth y requireUserOrRH.
 */
routesInterns.post(
  "/interns/entrada/:id",
  requireAuth,
  requireUserOrRH,
  registrarEntrada
);

/**
 * Ruta para registrar la salida de un pasante.
 * Protegida con requireAuth y requireUserOrRH.
 */
routesInterns.post(
  "/interns/salida/:id",
  requireAuth,
  requireUserOrRH,
  registrarSalida
);

/**
 * Ruta para obtener los detalles de un pasante específico.
 * Protegida con requireAuth y requireSuperUserOrRH.
 */
routesInterns.get(
  "/Pasante/info/:id",
  requireAuth,
  requireSuperUserOrRH,
  getInternDetails
);

/**
 * Ruta para registrar un nuevo pasante.
 * Protegida con requireAuth y requireSuperUserOrRH.
 * Utiliza multerConfig para manejar la subida de archivos (imagen).
 */
routesInterns.post(
  "/registroInternos",
  requireAuth,
  requireSuperUserOrRH,
  multerConfig.single("img"),
  insertIntern
);

// Exporta el routesInterns para que pueda ser utilizado en otras partes de la aplicación
export default routesInterns;
