import { Router } from "express";
import { index } from "../controllers";
const router = Router();
router.get("/", index);
router.get("/registroVisitas");

export default router;
