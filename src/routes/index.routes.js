// routes/index.routes.js
import { Router } from "express";
import express from "express";
import multerConfig from "../middlewares/multerConfig.js"; // Asegúrate de actualizar el path

import {
  index,
  register,
  history,
  login,
  interns,
  pendingRecords,
  renderRegisterPage,
  rechargeUser,
  historyInterns,
} from "../controllers/index.controller.js";
import {
  requireAuth,
  requireSuperUser,
  requireRH,
  requireSuperUserOrRH,
} from "../middlewares/auth.js";
import {
  adminUser,
  editUser,
  toggleStatus,
  updateUser,
  authenticateUser,
} from "../controllers/user.controller.js";

const router = Router();

// Middleware para parsear datos codificados en URL
router.use(express.urlencoded({ extended: true }));

// Rutas protegidas que requieren autenticación (requireAuth)
router.post("/inicio", authenticateUser, requireAuth, index);
router.get("/inicio", requireAuth, index);
router.get("/registroVisitas", requireAuth, register);
router.get("/historial", requireAuth, requireSuperUser, history);
router.get("/historialInternos", requireAuth, requireSuperUserOrRH, historyInterns);

router.get("/registrosPendientes", requireAuth, pendingRecords);
router.get("/registroUsuario", requireAuth, requireSuperUser, renderRegisterPage);
router.get("/registroInternos", requireAuth, requireSuperUserOrRH, interns);

// Rutas públicas (sin autenticación)
router.get("/iniciarSesion", login);
router.post("/iniciarSesion", authenticateUser);

// Rutas para administrar los usuarios de la plataforma

export default router;
