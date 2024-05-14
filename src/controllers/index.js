import Visit from "../models/visit.js";
import User from "../models/user.js";
import { validationResult, check } from "express-validator";

// Función para renderizar la página de inicio
const index = (req, res) => {
  res.render("index", {
    namePage: "Inicio",
    description: "Bienvenido a Radio y Television Hidalgo",
  });
};

// Función para renderizar la página de registro de visitas
const register = (req, res) => {
  res.render("register", {
    namePage: "Registro de visitas",
    description: "Regístrate en Radio y Television Hidalgo",
  });
};

// Función asincrónica para obtener y renderizar el historial de visitas
const history = async (req, res) => {
  try {
    const registros = await Visit.findAll();
    res.render("history", {
      namePage: "Historial de visitas",
      description: "Historial de visitantes de Radio y Television Hidalgo",
      registros: registros,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

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
      origin: req.body.origin,
      children: req.body.children,
      badge: req.body.badge,
    });
    res.send("Registro exitoso");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función asincrónica para autenticar al usuario al iniciar sesión
const authenticateUser = async (req, res) => {
  try {
    // Validar los datos del formulario utilizando express-validator
    await check("name")
      .notEmpty()
      .withMessage("El nombre de usuario es requerido")
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 8, max: 20 })
      .withMessage("La contraseña debe tener entre 8 y 20 caracteres")
      .run(req);

    const { name, password } = req.body;
    console.log(`El usuario: ${name} está intentando ingresar a la plataforma`);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: errors.array(),
      });
    }

    const user = await User.findOne({ where: { name } });

    if (!user) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Usuario no encontrado en el sistema" }],
      });
    }

    if (!user.verifyPassword(password)) {
      console.log("El usuario tiene la contraseña correcta");
      return res.render("index", {
        namePage: "Bienvenido a Radio y Televión",
        description: "Página de inicio",
      });
    } else {
      console.log("AAAAAAAAAAAAAAAAAAA");
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Contraseña incorrecta" }],
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para renderizar la página de inicio de sesión
const login = (req, res) => {
  res.render("login", {
    namePage: "Iniciar Sesión en Radio y Television Hidalgo",
    errors: [],
  });
};

export { history, index, register, insertVisit, authenticateUser, login };
