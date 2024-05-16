import { Router } from "express";
import { controllInterns } from "../controllers/interns.js";

const routesInterns = Router();

routesInterns.get("/controlPasantes", controllInterns );

export default routesInterns;
