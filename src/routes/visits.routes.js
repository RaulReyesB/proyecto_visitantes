import { Router } from "express";
import express from "express";
const visit = Router();
import { insertVisit } from "../controllers/visit.controller.js";
import { requireAuth } from "../middlewares/auth.js";
// Middleware para parsear datos codificados en URL
visit.use(express.urlencoded({ extended: true }));

visit.post("/registroVisitas", requireAuth, insertVisit);

export default visit;