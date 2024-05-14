import { Router } from "express";
import express from "express";
import {
  index,
  register,
  history,
  insertVisit,
  login,
  interns,
  authenticateUser,
  pendingRecords,
  renderRegisterPage,
  registerUser,
  insertIntern,
  showHRVisits,
} from "../controllers/index.js";
import {requireAuth,requireSuperUser} from "../middlewares/auth.js";
import { adminUser } from "../controllers/userControlls.js";

const router = Router();

// Middleware para parsear datos codificados en URL
router.use(express.urlencoded({ extended: true }));

// Rutas protegidas que requieren autenticación (requireAuth)
router.get("/", requireAuth, index);
router.get("/registroVisitas", requireAuth, register);
router.post("/registroVisitas", requireAuth, insertVisit);
router.get("/historial", requireSuperUser, history);
router.get("/registrosPendientes", pendingRecords);
router.get("/registroUsuario", renderRegisterPage);
router.post("/registroUsuario", registerUser);
router.get("/registroInternos", interns);
router.post("/registroInternos", insertIntern);
router.get("/hr-visits", showHRVisits);

// Rutas públicas (sin autenticación)
router.get("/iniciarSesion", login);
router.post("/iniciarSesion", authenticateUser);

// Rutas para administrar los usuarios de la plataforma
router.get("/AdmistrarUsuario", adminUser);


//control de usuarios 
router.get("/controlUsuarios" )
export default router;
