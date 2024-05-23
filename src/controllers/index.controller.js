import Visit from "../models/visit.js";
import moment from "moment";
import User from "../models/user.js";
import Intern from "../models/Intern.js";
import { validationResult, check } from "express-validator";
import db from "../conecction.js";
import Op from "sequelize";
import bcrypt from "bcryptjs";

// Función para renderizar la página de inicio
const index = (req, res) => {
  res.render("index", {
    namePage: "Inicio",
    description: "Bienvenido a Radio y Television Hidalgo",
    user: req.session.user,
    errors: [],  // Asegurando que errors siempre está definido
    msg: ""      // Asegurando que msg siempre está definido
  });
};

// Función para renderizar la página de registro de visitas
const register = (req, res) => {
  const user = req.session.user
  res.render("register", {
    namePage: "Registro de visitas",
    description: "Registrate en Radio y Television Hidalgo",
    ninos: 0,
    user:user
  });
};

//funcion para renderizar la pagina de registro de internos
const interns = (req, res) => {
  var user = req.user || null;
  if (user) {
    user.type = user.Type || "default";
  }
  res.render("interns", {
    namePage: "Registro de Internos",
    description: "Regístra los internos de radio y television hidalgo",
    user: req.session.user,
  });
};

// Función asincrónica para obtener y renderizar el historial de visitas
const history = async (req, res) => {
  try {
    // Todos los registros de la tabla
    const user = req.session.user
    const allRegistros = await Visit.findAll();

    // Filtrar los registros donde la salida no es nula
    const registros = allRegistros.filter((registro) => registro.exit !== null);

    // Parsear las fechas antes de pasarlas a la plantilla
    registros.forEach((registro) => {
      registro.createdAt = formatDate(registro.createdAt);
      // Si es necesario, también puedes parsear la fecha de salida aquí
    });

    res.render("history", {
      namePage: "Historial de visitas",
      descripcion: "Historial de visitantes de Radio y Television Hidalgo",
      registros: registros,
      user:user
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función asincrónica para obtener y renderizar el historial de visitas
const historyInterns = async (req, res) => {
  try {
    const allRegistros = await Intern.findAll({
      where: {
        serviceCompleted: false,
      },
    });
    const user = req.session.user
    res.render("historyInterns", {
      namePage: "Historial de Pasantes",
      descripcion: "Historial de visitantes de Radio y Television Hidalgo",
      registros: allRegistros,
      user: user,
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Función para renderizar la página de registro de usuarios
const renderRegisterPage = (req, res) => {
  const user = req.session.user
  res.render("createusers", {
    namePage: "Registro de Usuario",
    description: "Regístrate en Radio y Television Hidalgo",
    user:user
  });
};

// Función asincrónica para obtener y renderizar el historial de pasantes
const pendingRecords = async (req, res) => {
  try {
    // todos los registros de la tabla
    const allpendingRecords = await Visit.findAll();

    // Filtrar los registros donde la salida no es nula
    const registros = allpendingRecords.filter(
      (registro) => registro.exit === null
    );

    res.render("pendingRecords", {
      namePage: "Historial de Pasantes",
      descripcion:
        "Historial de visitas incompletas de Radio y Television Hidalgo",
      registros: registros,
      user: req.session.user
    });
  } catch (error) {
    console.error("Error al obtener los registros:", error);
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

// Funcion de recarga de pagina para visualizar cambios automaticamente
const rechargeUser = async (req, res) => {
  res.redirect("/AdmistrarUsuario");
};

export {
  history,
  index,
  register,
  login,
  pendingRecords,
  renderRegisterPage,
  interns,
  rechargeUser,
  historyInterns,
};
