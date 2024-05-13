import Visit from "../models/visit.js";

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
  }

const interns = async (req, res) => {
  res.render("interns",{
    nombrePagina: "Practicantes",
    descripcion: "registra a los practicantes",
  });
  }


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

export { history, index, register, interns, insertVisit };
