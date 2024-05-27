import Intern from "../models/Intern.js";

const historySC = async (req, res) => {
    try {

      const allRegistros = await Intern.findAll({
        where: {
          serviceCompleted: true,
        },
      });
      const user = req.session.user
      res.render("newvista", {
        namePage: "Servicios Completos",
        descripcion: "Historial de antiguos pasantes de Radio y Television Hidalgo",
        registros: allRegistros,
        user: user,
      });
    } catch (error) {
      console.error("Error al obtener los registros:", error);
      res.status(500).send("Error interno del servidor");
    }
  };
  
export {historySC}