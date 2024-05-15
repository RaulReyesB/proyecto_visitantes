import Visit from "../models/visit.js";
import User from "../models/user.js";
import Intern from "../models/intern.js";
import { validationResult, check } from "express-validator";
import db from "../conecction.js";
import Op from "sequelize";
// Función para renderizar la página de inicio
const index = (req, res) => {
  res.render("index", {
    namePage: "Inicio",
    description: "Bienvenido a Radio y Television Hidalgo",
    user: req.session.user, // Asegúrate de pasar req.session.user si lo estás almacenando en la sesión
  });
};

// Función para renderizar la página de registro de visitas
const register = (req, res) => {
  res.render("register", {
    namePage: "Registro de visitas",
    description: "Registrate en Radio y Television Hidalgo",
    ninos:0,
  });
};

//funcion para renderizar la pagina de registro de internos
const interns = (req, res) => {
  res.render("interns", {
    namePage: "Registro de Internos",
    description: "Regístra los internos de radio y television hidalgo",
  })
};
// Función asincrónica para obtener y renderizar el historial de visitas
const history = async (req, res) => {
  try {
    // Todos los registros de la tabla
    const allRegistros = await Visit.findAll();

    // Filtrar los registros donde la salida no es nula
    const registros = allRegistros.filter((registro) => registro.exit !== null);

    // Parsear las fechas antes de pasarlas a la plantilla
    registros.forEach(registro => {
      registro.createdAt = formatDate(registro.createdAt);
      // Si es necesario, también puedes parsear la fecha de salida aquí
    });

    res.render("history", {
      namePage: "Historial de visitas",
      descripcion: "Historial de visitantes de Radio y Television Hidalgo",
      registros: registros,
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  
  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}


// Función para renderizar la página de registro de usuarios
const renderRegisterPage = (req, res) => {
  res.render("createusers", {
    namePage: "Registro de Usuario",
    description: "Regístrate en Radio y Television Hidalgo",
  });
};

// Función asincrónica para obtener y renderizar el historial de visitas
const pendingRecords = async (req, res) => {
  try {
    // todos los registros de la tabla
    const allpendingRecords = await Visit.findAll();

    // Filtrar los registros donde la salida no es nula
    const registros = allpendingRecords.filter(
      (registro) => registro.exit === null
    );

    res.render("pendingRecords", {
      namePage: "Historial de visitas",
      descripcion:
        "Historial de visitas incompletas de Radio y Television Hidalgo",
      registros: registros,
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función asincrónica para mostrar visitas dirigidas a Recursos Humanos
const showHRVisits = async (req, res) => {
  try {
    // Buscar todas las visitas donde el departamento sea Recursos Humanos
    const hrVisits = await Visit.findAll({
      where: {
        department: 'RH'
      }
    });

    res.render("hrVisits", {
      namePage: "Visitas a Recursos Humanos",
      description: "Lista de visitas dirigidas al departamento de Recursos Humanos",
      visits: hrVisits
    });
  } catch (error) {
    console.error("Error al obtener las visitas a Recursos Humanos:", error);
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

//funcion para registrar internos
const insertIntern = async (req, res) => {
  try {
    const newIntern = await Intern.create({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      CURP: req.body.CURP,
      identification: req.body.identification,
      department: req.body.department,
      origin: req.body.origin,
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

    // Comparar contraseñas en texto plano
    if (user.password !== password) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Contraseña incorrecta" }],
      });
    }

    // Verificar si el usuario está inactivo
    if (user.status === false ) {
      console.log(user.status)
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Tu cuenta está inactiva. Por favor, ponte en contacto con el administrador." }],
      });
    }
    // Si el usuario está activo, continuar con el proceso de inicio de sesión
    req.session.user = user;

    res.render("index", {
      namePage: "Bienvenido a Radio y Television",
      description: "Página de inicio",
      user: req.session.user,
    });
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

// Función asincrónica para procesar el registro de un nuevo usuario
const registerUser = async (req, res) => {
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
    await check("type")
      .notEmpty()
      .withMessage("El tipo de usuario es requerido")
      .isIn(["usuario", "superUsuario", "administrador"])
      .withMessage("Tipo de usuario inválido")
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("createusers", {
        namePage: "Registro de Usuario",
        description: "Regístrate en Radio y Television Hidalgo",
        errors: errors.array(),
      });
    }

    const { name, password, type } = req.body;

    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.render("createusers", {
        namePage: "Registro de Usuario",
        description: "Regístrate en Radio y Television Hidalgo",
        errors: [{ msg: "El nombre de usuario ya está en uso" }],
      });
    }

    // Crear un nuevo usuario en la base de datos
    const newUser = await User.create({
      name,
      password,
      type,
    });

    res.render("createusers", {
      namePage: "Registro de Usuario",
      description: "Regístrate en Radio y Television Hidalgo",
      successMsg: "Usuario registrado exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error interno del servidor");
  }
};

export {
  history,
  index,
  register,
  insertVisit,
  authenticateUser,
  login,
  pendingRecords,
  registerUser,
  renderRegisterPage,
  interns,
  insertIntern,
  showHRVisits,
};
