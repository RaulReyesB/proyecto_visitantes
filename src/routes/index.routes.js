import { Router } from "express";
import { index, register, history } from "../controllers/index.js";
const router = Router();
router.get("/", index);
router.get("/registroVisitas", register);
router.get("/registro");
router.get("/history", history);

export default router;
