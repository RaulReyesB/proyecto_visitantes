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
  rechargeUser,
  historyInterns,
} from "../controllers/index.js";
import { requireAuth, requireSuperUser } from "../middlewares/auth.js";
import {
  adminUser,
  editUser,
  toggleStatus,
  updateUser,
} from "../controllers/userControlls.js";

const router = Router();

// Middleware para parsear datos codificados en URL
router.use(express.urlencoded({ extended: true }));

// Rutas protegidas que requieren autenticación (requireAuth)
router.post("/inicio", authenticateUser, requireAuth, index);
router.get("/inicio", requireAuth, index);
router.get("/registroVisitas", requireAuth, register);
router.post("/registroVisitas", requireAuth, insertVisit);
router.get("/historial", requireAuth, requireSuperUser, history);
router.get("/historialInternos", requireAuth, requireSuperUser, historyInterns);

router.get("/registrosPendientes", requireAuth, pendingRecords);
router.get(
  "/registroUsuario",
  requireAuth,
  requireSuperUser,
  renderRegisterPage
);
router.post("/registroUsuario", requireAuth, requireSuperUser, registerUser);
router.get("/registroInternos", requireAuth, interns);
router.post("/registroInternos", requireAuth, insertIntern);
router.get("/hr-visits", requireAuth, showHRVisits);

// Rutas públicas (sin autenticación)
router.get("/iniciarSesion", login);
router.post("/iniciarSesion", authenticateUser);

// Rutas para administrar los usuarios de la plataforma
router.get("/upd", rechargeUser);
router.get("/AdmistrarUsuario", requireAuth, requireSuperUser, adminUser);
router.post(
  "/toggleStatus/:userId",
  requireAuth,
  requireSuperUser,
  toggleStatus
);
router.get(
  "/AdmistrarUsuario/:userId",
  requireAuth,
  requireSuperUser,
  editUser
);
router.post(
  "/AdmistrarUsuario/:userId",
  requireAuth,
  requireSuperUser,
  updateUser
);

export default router;
