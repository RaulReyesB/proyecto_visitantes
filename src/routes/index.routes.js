import { Router } from "express";
import express from 'express';

import { index, register, history, insertVisit, login, authenticateUser} from "../controllers/index.js";

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/inicio", index);
router.get("/registroVisitas", register);
router.post("/registroVisitas", insertVisit);
router.get("/gistorial", history);
router.get("/iniciarSesion", login)
router.post("/iniciarSesion", authenticateUser)

export default router;
