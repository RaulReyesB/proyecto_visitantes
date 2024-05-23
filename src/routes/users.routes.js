import { Router } from "express";
import { logout, registerUser, } from "../controllers/user.controller.js";
import { requireAuth, requireSuperUser } from "../middlewares/auth.js";
import { adminUser, editUser, toggleStatus, updateUser } from "../controllers/user.controller.js";
import { rechargeUser } from "../controllers/index.controller.js";
const user = Router();

user.post("/registroUsuario", requireAuth, requireSuperUser, registerUser);
user.get("/logout", logout);
user.get("/upd", rechargeUser);
user.get("/AdmistrarUsuario", requireAuth, requireSuperUser, adminUser);
user.post("/toggleStatus/:userId", requireAuth, requireSuperUser, toggleStatus);
user.get("/AdmistrarUsuario/:userId", requireAuth, requireSuperUser, editUser);
user.post("/AdmistrarUsuario/:userId", requireAuth, requireSuperUser, updateUser);
export default user