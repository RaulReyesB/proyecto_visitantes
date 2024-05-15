import Visit from "../models/visit.js";

const finishRegistration = async (req, res) => {
    const id = req.params.id;

    try {
        // Busca la visita por su ID
        const visit = await Visit.findOne({ where: { id } });

        if (!visit) {
            return res.status(404).send("Visita no encontrada");
        }

        // Actualiza la fecha de salida con la fecha actual
        visit.exit = new Date();

        // Guarda los cambios en la base de datos
        await visit.save();

        // Redirige al usuario
        res.redirect(`/inicio`);
    } catch (error) {
        console.error("Error al finalizar el registro:", error);
        res.status(500).send("Error interno del servidor");
    }
}

export { finishRegistration };
