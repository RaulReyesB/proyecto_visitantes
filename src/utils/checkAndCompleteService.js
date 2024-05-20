// src/utils/checkAndCompleteService.js
import { Op } from "sequelize";
import moment from "moment";
import Intern from "../models/Intern.js";

const checkAndCompleteService = async () => {
  const today = moment().format("YYYY-MM-DD");

  try {
    const interns = await Intern.findAll({
      where: {
        endService: {
          [Op.lte]: today,
        },
        serviceCompleted: false,
      },
    });

    for (const intern of interns) {
      intern.serviceCompleted = true;
      intern.fileNumber = null; // Eliminar el número de folio
      await intern.save();
      console.log(`Intern ${intern.name} has completed their service.`);
    }

    console.log(
      `Checked and updated ${interns.length} interns for service completion`
    );
  } catch (error) {
    console.error("Error updating intern service completion status:", error);
  }
};

export default checkAndCompleteService;
