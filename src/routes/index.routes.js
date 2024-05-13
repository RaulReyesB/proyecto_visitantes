import { Router } from "express";
import express from 'express';

import { index, register, history, interns, insertVisit} from "../controllers/index.js";

const router = Router();

router.use(express.urlencoded({ extended: true }));

router.get("/", index);
router.get("/registroVisitas", register);
router.post("/registroVisitas", insertVisit);
router.get("/history", history);
router.get("/interns", interns);

export default router;
