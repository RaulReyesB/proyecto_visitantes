import { Router } from "express";
import {
    logout,
    registerUser
} from "../controllers/user.controller.js";
import {
    requireAuth,
    requireSuperUser
} from "../middlewares/auth.js";
import {
    adminUser,
    editUser,
    toggleStatus,
    updateUser
} from "../controllers/user.controller.js";
import { rechargeUser } from "../controllers/index.controller.js";

const user = Router();

/**
 * Ruta para registrar un nuevo usuario.
 * Protegida con requireAuth y requireSuperUser.
 * 
 * @route POST /registroUsuario
 */
user.post(
  "/registroUsuario",
  requireAuth,
  requireSuperUser,
  registerUser);

/**
 * Ruta para cerrar sesión del usuario.
 * 
 * @route GET /logout
 */
user.get(
  "/logout",
  logout);

/**
 * Ruta para recargar los datos del usuario.
 * 
 * @route GET /upd
 */
user.get(
  "/upd",
  rechargeUser);

/**
 * Ruta para administrar los usuarios.
 * Protegida con requireAuth y requireSuperUser.
 * 
 * @route GET /AdmistrarUsuario
 */
user.get(
  "/AdmistrarUsuario",
  requireAuth,
  requireSuperUser,
  adminUser);

/**
 * Ruta para cambiar el estado (activo/inactivo) de un usuario específico.
 * Protegida con requireAuth y requireSuperUser.
 * 
 * @route POST /toggleStatus/:userId
 * @param {string} userId - ID del usuario cuyo estado se va a cambiar.
 */
user.post(
  "/toggleStatus/:userId",
  requireAuth,
  requireSuperUser,
  toggleStatus);

/**
 * Ruta para editar la información de un usuario específico.
 * Protegida con requireAuth y requireSuperUser.
 * 
 * @route GET /AdmistrarUsuario/:userId
 * @param {string} userId - ID del usuario a editar.
 */
user.get(
  "/AdmistrarUsuario/:userId",
  requireAuth,
  requireSuperUser,
  editUser);

/**
 * Ruta para actualizar la información de un usuario específico.
 * Protegida con requireAuth y requireSuperUser.
 * 
 * @route POST /AdmistrarUsuario/:userId
 * @param {string} userId - ID del usuario a actualizar.
 */
user.post(
  "/AdmistrarUsuario/:userId",
  requireAuth,
  requireSuperUser,
  updateUser);

export default user;
