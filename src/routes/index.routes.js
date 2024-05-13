import { Router } from "express";
import { index, register, history, savedRegister } from "../controllers/index.js";
const router = Router();
router.get("/", index);
router.get("/registroVisitas", register);
router.get("/registro", savedRegister);
router.get("/history", history);

export default router;
