import { Router } from "express";
import express from "express";

import {
  index,
  register,
  history,
  insertVisit,
  login,
  authenticateUser,
  pendingRecords,
  renderRegisterPage,
  registerUser
} from "../controllers/index.js";
import {requireAuth,requireSuperUser} from "../middlewares/auth.js";

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

// Rutas públicas (sin autenticación)
router.get("/iniciarSesion", login);
router.post("/iniciarSesion", authenticateUser);

export default router;
