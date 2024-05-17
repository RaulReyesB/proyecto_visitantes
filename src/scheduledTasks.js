import cron from "node-cron";
import Intern from "./models/Intern.js"; // Asegúrate de tener la ruta correcta a tu modelo de Intern
import moment from "moment";

// Función para verificar y actualizar el estado del servicio
const checkAndUpdateServiceStatus = async () => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const interns = await Intern.findAll();

    for (const intern of interns) {
      if (moment(intern.endService).isBefore(today)) {
        await intern.update({ serviceCompleted: true, fileNumber: null });
        console.log(`Intern ${intern.name} has completed their service.`);
      }
    }
    console.log("Service completion check done.");
  } catch (error) {
    console.error("Error checking service completion:", error);
  }
};

// Programar la tarea para que se ejecute todos los días a la medianoche
cron.schedule("0 0 * * *", checkAndUpdateServiceStatus);
