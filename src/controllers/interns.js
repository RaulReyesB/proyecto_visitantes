import Intern from "../models/Intern.js";
import HistoryIntern from "../models/history_I.js"; // Cambié el nombre del modelo para que coincida con el archivo

const controllInterns = async (req, res) => {
  try {
    const interns = await Intern.findAll({
      where: {
        serviceCompleted: false,
      },
    });
    res.render("controllInterns", {
      namePage: "Control de Pasantes",
      description: "Bienvenido al control de Pasantes",
      interns: interns,
      user: req.session.user,
    });
  } catch (error) {
    console.error("Error al obtener los pasantes:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const registrarEntrada = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    await HistoryIntern.create({
      fileNumber: intern.fileNumber,
      entrance: new Date(),
    });

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar entrada:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const registrarSalida = async (req, res) => {
  const internId = req.params.id;

  try {
    const historyEntry = await HistoryIntern.findOne({
      where: {
        fileNumber: internId,
        exit: null,
      },
    });

    if (!historyEntry) {
      return res.status(404).send("Entrada no encontrada para registrar salida");
    }

    historyEntry.exit = new Date();
    await historyEntry.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar salida:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const getInternDetails = async (req, res) => {
  try {
    const internId = req.params.id;
    const intern = await Intern.findByPk(internId);

    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    res.render("infoInterns", {
      namePage: "Detalles del Pasante",
      descripcion: "Información detallada del pasante",
      intern: intern,
    });
  } catch (error) {
    console.error("Error al obtener los detalles del pasante:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export { controllInterns, registrarEntrada, registrarSalida, getInternDetails };
