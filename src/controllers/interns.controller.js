import Intern from "../models/Intern.js";
import HistoryIntern from "../models/history_I.js";
import moment from "moment/moment.js";

// Función para insertar un nuevo pasante en la base de datos
const insertIntern = async (req, res) => {
  const {
    fileNumber,
    name,
    school,
    Mat,
    career,
    asignementDirec,
    adviser,
    numberHours,
    days,
    shedule,
    hoursxDay,
    startService,
    endService,
    totHours,
    Program,
    Observations,
    service,
  } = req.body;

  // Guarda la URL relativa del archivo de imagen si existe
  const img = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Inserta el nuevo pasante en la base de datos
    await Intern.create({
      fileNumber,
      name,
      img,
      school,
      Mat,
      career,
      asignementDirec,
      adviser,
      numberHours,
      days,
      shedule,
      hoursxDay,
      startService,
      endService,
      totHours,
      hoursFulfilled: 0, // Valor por defecto
      Program,
      Observations,
      service,
    });
    // Redirige a la página de control de pasantes
    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al insertar pasante:", error);
    res.render("index", {
      namePage: "Inicio",
      description: "Bienvenido a Radio y Television Hidalgo",
      user: req.session.user,
      errors: [{msg: "No se pudo completar la operación"}],
      msg: ""
    });
  }
};

// Función para obtener y mostrar todos los pasantes que no han completado su servicio
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

// Función para registrar la entrada de un pasante
const registrarEntrada = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    // Crea un nuevo registro de entrada en el historial
    await HistoryIntern.create({
      fileNumber: intern.fileNumber,
      entrance: new Date(),
    });

    // Actualiza la entrada y restablece la salida del pasante
    intern.entrance = new Date();
    intern.exit = null;
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar entrada:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para calcular el total de horas cumplidas por un pasante
const calcularHorasTotales = async (fileNumber) => {
  // Obtiene todos los registros del historial para el número de archivo proporcionado
  const historyEntries = await HistoryIntern.findAll({
    where: {
      fileNumber: fileNumber,
    },
  });
  // Inicializa el contador de segundos totales
  let totalSeconds = 0;
  // Itera sobre cada registro del historial
  historyEntries.forEach(entry => {
    // Convierte las horas de entrada y salida a objetos moment
    const entrance = moment(entry.entrance, "DD/MM/YYYY HH:mm:ss");
    const exit = moment(entry.exit, "DD/MM/YYYY HH:mm:ss");
    // Verifica si ambas horas (entrada y salida) son válidas
    if (entrance.isValid() && exit.isValid()) {
      // Calcula la diferencia en segundos y la suma al total de segundos
      totalSeconds += exit.diff(entrance, 'seconds');
    }
  });
  // Convierte el total de segundos a horas completas y retorna el resultado
  return Math.floor(totalSeconds / 3600); // Total de horas completas
};


// Función para registrar la salida de un pasante
const registrarSalida = async (req, res) => {
  const internId = req.params.id;

  try {
    const intern = await Intern.findByPk(internId);
    if (!intern) {
      return res.status(404).send("Pasante no encontrado");
    }

    // Busca la última entrada sin salida registrada
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

    // Registra la salida en el historial
    historyEntry.exit = new Date();
    await historyEntry.save();

    // Actualiza la salida del pasante
    intern.exit = new Date();
    await intern.save();

    // Calcula las horas totales cumplidas y actualiza el campo hoursFulfilled
    const totalHours = await calcularHorasTotales(intern.fileNumber);
    intern.hoursFulfilled = totalHours;
    await intern.save();

    res.redirect("/controlPasantes");
  } catch (error) {
    console.error("Error al registrar salida:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para obtener y mostrar los detalles de un pasante específico
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

export { controllInterns, registrarEntrada, registrarSalida, getInternDetails, insertIntern };
