import { Router } from "express";
import { index } from "../controllers/index.js";
const router = Router();
router.get("/", index);
router.get("/registroVisitas");
router.get("/registro");

export default router;
