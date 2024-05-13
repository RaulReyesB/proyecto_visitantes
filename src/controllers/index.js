import Visit from "../models/visit.js";
import { validationResult, check } from "express-validator";

const index = (req, res) => {
  res.render("index", {
    nombrePagina: "Inicio",
    descripcion: "Bienvenido a Radio y Television Hidalgo",
  });
};
const register = (req, res) => {
  res.render("register", {
    nombrePagina: "Registro de visitas",
    descripcion: "Registrate en Radio y Television Hidalgo",
  });
};

const history = async (req, res) => {
  const registros = await Visit.findAll();
  res.render("history", {
    nombrePagina: "Historial de visitas",
    descripcion: "Historial de visitantes de Radio y Television Hidalgo",
    registros: registros,
  });
};

const insertVisit = async (req, res) => {
  try {
    // Crea un nuevo registro utilizando los datos del formulario
    const newVisit = await Visit.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      CURP: req.body.CURP,
      identification: req.body.identification,
      department: req.body.department,
      origin: req.body.origin,
      children: req.body.children,
      badge: req.body.badge, // Corregido el nombre del campo
    });
    res.send("Registro exitoso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

const authenticateUser = async (req, res, next) => {
  console.log(`El usuario está intentando autenticarse`);
  //Validar los datos del formulario
  await check("name")
    .notEmpty()
    .withMessage("El nombre del usuario es requerido")
    .run(req);
  await check("password")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 8, max: 20 })
    .withMessage("La contraseña debe tener entre 8 y 15 caracteres")
    .run(req);
  const { name, password } = req.body;

  let result = validationResult(req);

  if (result.isEmpty()) {
    //desestructurando
    console.log(`El usuario: ${name} está intentando ingresar a la plataforma`);

    const userExists = await User.findOne({ where: { name } });

    if (!userExists) {
      console.log(`${name}`);
      res.render("login", {
        text: "Usuario no encontrado en el sistema",
      });
    } else {
      if (!userExists.verifyPassword(password)) {
        res.render("login", {
          nombrePagina: "Iniciar Sesion en Radio y Television Hidalgo",
          text: "Contraseña incorrecta",
        });
      }
    }
  }
};

const login = (req, res) => {
  res.render("login", {
    nombrePagina: "Iniciar Sesion en Radio y Television Hidalgo",
  });
};
export { history, index, register, insertVisit, authenticateUser, login };
