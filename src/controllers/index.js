import Visit from "../models/visit.js";
import User from "../models/user.js";
import { validationResult, check } from "express-validator";

const index = (req, res) => {
  res.render("index", {
    namePage: "Inicio",
    description: "Bienvenido a Radio y Television Hidalgo",
  });
};

const register = (req, res) => {
  res.render("register", {
    namePage: "Registro de visitas",
    description: "Registrate en Radio y Television Hidalgo",
    ninos:0,
  });
};

const history = async (req, res) => {
  const registros = await Visit.findAll();
  res.render("history", {
    namePage: "Historial de visitas",
    description: "Historial de visitantes de Radio y Television Hidalgo",
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

const authenticateUser = async (req, res) => {
  console.log(`El usuario está intentando autenticarse`);

  // Validar los datos del formulario
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

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render("login", {
      namePage: "Iniciar Sesion en Radio y Television Hidalgo",
      errors: errors.array(),
    });
  }

  const { name, password } = req.body;
  console.log(`El usuario: ${name} está intentando ingresar a la plataforma`);

  const user = await User.findOne({ where: { name } });

  if (!user) {
    return res.render("login", {
      namePage: "Iniciar Sesion en Radio y Television Hidalgo",
      errors: [{ msg: "Usuario no encontrado en el sistema" }],
    });
  }

  if (!user.verifyPassword(password)) {
    console.log("El usuario tiene la contrasena correcta");
    return res.render("index", {
      namePage: "Bienvenido a Radio y televion",
      description:"Pagina de inicio"
    });
  } else {
    console.log("AAAAAAAAAAAAAAAAAAA");
    return res.render("login", {
      namePage: "Iniciar Sesion en Radio y Television Hidalgo",
      errors: [{ msg: "Contraseña incorrecta" }],
    });
  }
};

const login = (req, res) => {
  res.render("login", {
    namePage: "Iniciar Sesion en Radio y Television Hidalgo",
    errors: [],
  });
};

export { history, index, register, insertVisit, authenticateUser, login };
