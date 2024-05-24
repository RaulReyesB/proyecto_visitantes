import { Router } from "express";
import express from "express";

import {
  index,
  register,
  history,
  login,
  interns,
  pendingRecords,
  renderRegisterPage,
  historyInterns,
} from "../controllers/index.controller.js";
import {
  requireAuth,
  requireSuperUser,
  requireSuperUserOrRH,
} from "../middlewares/auth.js";
import { authenticateUser } from "../controllers/user.controller.js";

const router = Router();

// Middleware para parsear datos codificados en URL
router.use(express.urlencoded({ extended: true }));

// Rutas protegidas que requieren autenticación (requireAuth)

/**
 * Ruta para el inicio, autenticada con requireAuth y authenticateUser.
 * @route POST /inicio
 */
router.post(
  "/inicio",
  authenticateUser,
  requireAuth,
  index);

/**
 * Ruta para el inicio, autenticada con requireAuth.
 * @route GET /inicio
 */
router.get(
  "/inicio",
  requireAuth,
  index);

/**
 * Ruta para el registro de visitas, autenticada con requireAuth.
 * @route GET /registroVisitas
 */
router.get(
  "/registroVisitas",
  requireAuth,
  register);

/**
 * Ruta para el historial, autenticada con requireAuth y requireSuperUser.
 * @route GET /historial
 */
router.get(
  "/historial",
  requireAuth,
  requireSuperUser,
  history);

/**
 * Ruta para el historial de internos, autenticada con requireAuth y requireSuperUserOrRH.
 * @route GET /historialInternos
 */
router.get(
  "/historialInternos",
  requireAuth,
  requireSuperUserOrRH,
  historyInterns);

/**
 * Ruta para registros pendientes, autenticada con requireAuth.
 * @route GET /registrosPendientes
 */
router.get(
  "/registrosPendientes",
  requireAuth,
  pendingRecords);

/**
 * Ruta para la página de registro de usuario, autenticada con requireAuth y requireSuperUser.
 * @route GET /registroUsuario
 */
router.get(
  "/registroUsuario",
  requireAuth,
  requireSuperUser,
  renderRegisterPage);

/**
 * Ruta para el registro de internos, autenticada con requireAuth y requireSuperUserOrRH.
 * @route GET /registroInternos
 */
router.get(
  "/registroInternos",
  requireAuth,
  requireSuperUserOrRH,
  interns);

// Rutas públicas (sin autenticación)

/**
 * Ruta para la página de inicio de sesión.
 * @route GET /iniciarSesion
 */
router.get(
  "/iniciarSesion",
  login);

/**
 * Ruta para autenticar al usuario.
 * @route POST /iniciarSesion
 */
router.post(
  "/iniciarSesion",
  authenticateUser);

// Exporta el router para que pueda ser utilizado en otras partes de la aplicación
export default router;
