import { Router } from "express";
import { finishRegistration } from "../controllers/pendingRecords.controllers.js";
const pdR = Router();

pdR.get("/finalizarRegistro/:id",finishRegistration);

export default pdR