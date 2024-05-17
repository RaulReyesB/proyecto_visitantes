import Intern from "../models/Intern.js";

const controllInterns = async(req, res) => {
  const internt = await Intern.findAll()  
  res.render("controllInterns", {
    namePage: "Control de Pasantes",
    description: "Bienvenido a el control de Pasantes",
    internt :internt,
    user: req.session.user, // Asegúrate de pasar req.session.user si lo estás almacenando en la sesión
  });
};

// Controlador para registrar la entrada de un pasante
const registrarEntrada = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    intern.entrance = new Date();
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar entrada:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Controlador para registrar la salida de un pasante
const registrarSalida = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    intern.exit = new Date();
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar salida:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export {
  controllInterns,
  registrarEntrada,
  registrarSalida
}
