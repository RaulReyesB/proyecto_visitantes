import cron from "node-cron";// Importa el paquete `node-cron` para programar tareas cron
import Intern from "./models/Intern.js";// Importa el modelo Intern desde el archivo "./models/Intern.js"
import moment from "moment";// Importa la librería Moment.js para el manejo de fechas

// Define una función asincrónica llamada checkAndUpdateServiceStatus
const checkAndUpdateServiceStatus = async () => {
  // Obtiene la fecha actual en formato "DD-MM-YYYY" utilizando Moment.js
  const today = moment().format("DD-MM-YYYY");

  try {
    // Busca en la base de datos todos los registros de interns
    const interns = await Intern.findAll();

    // Itera sobre cada intern encontrado en la consulta anterior
    for (const intern of interns) {
      // Comprueba si la fecha de finalización del servicio del intern es anterior a la fecha actual
      if (moment(intern.endService).isBefore(today)) {
        // Si la fecha de finalización del servicio es anterior a la fecha actual,
        // actualiza el estado del servicio del intern a completado y elimina el número de folio asociado
        await intern.update({ serviceCompleted: true, fileNumber: null });
        // Imprime un mensaje indicando que el intern ha completado su servicio
        console.log(`Intern ${intern.name} has completed their service.`);
      }
    }
    // Imprime un mensaje indicando que la verificación del estado del servicio ha finalizado
    console.log("Service completion check done.");
  } catch (error) {
    // Si ocurre un error durante el proceso, imprime un mensaje de error
    console.error("Error checking service completion:", error);
  }
};

// Programa la tarea para que se ejecute todos los días a la medianoche
cron.schedule("0 0 * * *", checkAndUpdateServiceStatus);
