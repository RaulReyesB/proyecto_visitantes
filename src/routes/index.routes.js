import { Router } from "express";
import express from 'express';

import { index, register, history, insertVisit, login, authenticateUser} from "../controllers/index.js";

const router = Router();

router.use(express.urlencoded({ extended: true }));

import requireAuth from "../middlewares/auth.js";

router.get("/inicio", requireAuth, index);
router.get("/registroVisitas", requireAuth, register);
router.post("/registroVisitas", requireAuth, insertVisit);
router.get("/historial", requireAuth, history);
router.get("/iniciarSesion", login)
router.post("/iniciarSesion", authenticateUser)

export default router;
