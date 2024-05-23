import Intern from "../models/Intern.js";
import HistoryIntern from "../models/history_I.js";
import moment from "moment/moment.js";

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

    intern.entrance = new Date();
    intern.exit = null;  // Restablece la salida
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar entrada:", error);
    res.status(500).send("Error interno del servidor");
  }
};

const calcularHorasTotales = async (fileNumber) => {
  const historyEntries = await HistoryIntern.findAll({
    where: {
      fileNumber: fileNumber,
    },
  });

  let totalSeconds = 0;

  historyEntries.forEach(entry => {
    const entrance = moment(entry.entrance, "DD/MM/YYYY HH:mm:ss");
    const exit = moment(entry.exit, "DD/MM/YYYY HH:mm:ss");

    if (entrance.isValid() && exit.isValid()) {
      totalSeconds += exit.diff(entrance, 'seconds');
    }
  });

  return Math.floor(totalSeconds / 3600); // Total de horas completas
};

const registrarSalida = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    const historyEntry = await HistoryIntern.findOne({
      where: {
        fileNumber: intern.fileNumber,
        exit: null,
      },
      order: [['entrance', 'DESC']],
    });

    if (!historyEntry) {
      return res.status(404).send("Entrada no encontrada para registrar salida");
    }

    historyEntry.exit = new Date();
    await historyEntry.save();

    intern.exit = new Date();
    await intern.save();

    // Calcular las horas totales cumplidas y actualizar el campo hoursFulfilled
    const totalHours = await calcularHorasTotales(intern.fileNumber);
    intern.hoursFulfilled = totalHours;
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar salida:", error);
    res.status(500).send("Error interno del servidor");
  }
};


const getInternDetails = async (req, res) => {
  try {
    const intern = await Intern.findByPk(req.params.id);
    if (intern) {
      res.render("infoInterns", {
        namePage: "Informacion del pasante",
        intern,
        user: req.session.user,
      });
    } else {
      res.status(404).send("Pasante no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener pasante:", error);
    res.status(500).send("Error al obtener pasante");
  }
};

export { controllInterns, registrarEntrada, registrarSalida, getInternDetails };
