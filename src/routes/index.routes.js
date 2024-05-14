import { Router } from "express";
import express from 'express';

import { index, register, history, insertVisit, login, authenticateUser, interns} from "../controllers/index.js";

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.post("/inicio", authenticateUser);
router.get("/registroVisitas", register);
router.post("/registroVisitas", insertVisit);
router.get("/historial", history);
router.get("/iniciarSesion", login)
router.get("/internos", interns)

export default router;
