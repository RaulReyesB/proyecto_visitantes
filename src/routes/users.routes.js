import { Router } from "express";
import { logout } from "../controllers/userControlls.js";
const user = Router();


user.get("/logout", logout);

export default user