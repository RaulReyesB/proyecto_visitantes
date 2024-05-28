import Intern from "../models/Intern.js";

const historySC = async (req, res) => {
    try {
        // Obtener todos los registros donde el servicio esté completado
        const allRegistros = await Intern.findAll({
            where: {
                serviceCompleted: true,
            },
        });

        // Actualizar el campo fileNumber y registrar el mes y el año
        for (const registro of allRegistros) {
            // Obtener el mes y el año actual
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Sumar 1 porque los meses se indexan desde 0
            const currentYear = currentDate.getFullYear();

            // Actualizar el campo fileNumber con el mes y el año actual
            const updatedRegistro = await registro.update({
                fileNumber: `${registro.fileNumber}-${currentMonth}-${currentYear}`,
            });

            console.log(`Registro actualizado: ${updatedRegistro.id}`);
        }

        const user = req.session.user;
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

export { historySC };
