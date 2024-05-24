// Importa el operador de comparación de Sequelize y la librería Moment.js
import { Op } from "sequelize";
import moment from "moment";

// Importa el modelo Intern desde el archivo "../models/Intern.js"
import Intern from "../models/Intern.js";

// Define una función asincrónica llamada checkAndCompleteService
const checkAndCompleteService = async () => {
  // Obtiene la fecha actual en formato YYYY-MM-DD utilizando Moment.js
  const today = moment().format("YYYY-MM-DD");

  try {
    // Busca en la base de datos todos los registros de interns que cumplan con las siguientes condiciones:
    // 1. La fecha de finalización del servicio es menor o igual a la fecha actual.
    // 2. El servicio no ha sido marcado como completado.
    const interns = await Intern.findAll({
      where: {
        endService: {
          [Op.lte]: today,
        },
        serviceCompleted: false,
      },
    });

    // Itera sobre cada intern encontrado en la consulta anterior
    for (const intern of interns) {
      // Marca el servicio del intern como completado
      intern.serviceCompleted = true;
      // Elimina el número de folio del intern
      intern.fileNumber = null;
      // Guarda los cambios en la base de datos
      await intern.save();
      // Imprime un mensaje indicando que el intern ha completado su servicio
      console.log(`Intern ${intern.name} has completed their service.`);
    }

    // Imprime un mensaje indicando cuántos interns se han actualizado
    console.log(
      `Checked and updated ${interns.length} interns for service completion`
    );
  } catch (error) {
    // Si ocurre un error durante el proceso, imprime un mensaje de error
    console.error("Error updating intern service completion status:", error);
  }
};

// Exporta la función checkAndCompleteService para que pueda ser utilizada por otros módulos
export default checkAndCompleteService;
