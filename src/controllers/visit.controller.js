import Visit from "../models/visit.js";
import { validationResult, check } from "express-validator";
import db from "../conecction.js";
import Op from "sequelize";
import bcrypt from "bcryptjs";

// Función asincrónica para procesar el registro de una nueva visita
const insertVisit = async (req, res) => {
    try {
      // Crear un nuevo registro de visita en la base de datos
      const newVisit = await Visit.create({
        name: req.body.name,               // Nombre de la visita
        phone: req.body.phone,             // Teléfono de contacto de la visita
        email: req.body.email,             // Email de contacto de la visita
        CURP: req.body.CURP,               // CURP de la visita
        identification: req.body.identification, // Identificación de la visita
        department: req.body.department,   // Departamento a visitar
        subDepartment: req.body.subDepartment, // Subdepartamento a visitar
        origin: req.body.origin,           // Origen de la visita
        children: req.body.children,       // Información de los hijos (si aplica)
        badge: req.body.badge,             // Gafete asignado a la visita
      });
      console.log("Registro exitoso");
      // Renderizar la página de inicio con un mensaje de éxito
      res.render("index", {
        namePage: "Inicio",
        description: "Bienvenido a Radio y Television Hidalgo",
        user: req.session.user, // Usuario actual de la sesión
        msg: "Registro exitoso",
        errors: []
      });
    } catch (error) {
      console.error(error);
      // Renderizar la página de inicio con un mensaje de error
      res.render("index", {
        namePage: "Inicio",
        description: "Bienvenido a Radio y Television Hidalgo",
        user: req.session.user, // Usuario actual de la sesión
        errors: [{msg: "No se pudo completar la operación"}],
        msg: ""
      });
    }
};

export { insertVisit }
