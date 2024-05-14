import { Router } from "express";
import express from 'express';

import { index, register, history, insertVisit, login, authenticateUser } from "../controllers/index.js";
import requireAuth from "../middlewares/auth.js";

const router = Router();

// Middleware para parsear datos codificados en URL
router.use(express.urlencoded({ extended: true }));


// Rutas protegidas que requieren autenticación (requireAuth)
router.get("/", requireAuth, index);
router.get("/registroVisitas", requireAuth, register);
router.post("/registroVisitas", requireAuth, insertVisit);
router.get("/historial", requireAuth, history);

// Rutas públicas (sin autenticación)
router.get("/iniciarSesion", login);
router.post("/iniciarSesion", authenticateUser);

>>>>>>> 520d3822204c04812a832ad2f272797fda61f5b8

export default router;


