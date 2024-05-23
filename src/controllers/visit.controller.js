import Visit from "../models/visit.js";
import { validationResult, check } from "express-validator";
import db from "../conecction.js";
import Op from "sequelize";
import bcrypt from "bcryptjs";

// Función asincrónica para procesar el registro de una nueva visita
const insertVisit = async (req, res) => {
    try {
      const newVisit = await Visit.create({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        CURP: req.body.CURP,
        identification: req.body.identification,
        department: req.body.department,
        subDepartment: req.body.subDepartment,
        origin: req.body.origin,
        children: req.body.children,
        badge: req.body.badge,
      });
      console.log("Registro exitoso");
      res.render("index", {
        namePage: "Inicio",
        description: "Bienvenido a Radio y Television Hidalgo",
        user: req.session.user,
        msg: "Registro exitoso",
        errors: []
      });
    } catch (error) {
      console.error(error);
      res.render("index", {
        namePage: "Inicio",
        description: "Bienvenido a Radio y Television Hidalgo",
        user: req.session.user,
        errors: [{msg: "No se pudo completar la operación"}],
        msg: ""
      });
    }
  };

export {insertVisit}