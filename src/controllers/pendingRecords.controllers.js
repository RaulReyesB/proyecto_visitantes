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
        visit.badge = null;
        // Guarda los cambios en la base de datos
        await visit.save();

        // Redirige al usuario
        res.render("index", {
            namePage: "Inicio",
            description: "Bienvenido a Radio y Television Hidalgo",
            user: req.session.user,
            msg: "Registro finalizado correctamente",
            errors: []
        });
    } catch (error) {
        console.error("Error al finalizar el registro:", error);
        res.render("index", {
            namePage: "Inicio",
            description: "Bienvenido a Radio y Television Hidalgo",
            user: req.session.user,
            errors: [{msg: "No se pudo completar la operacion"}],
            msg: ""
        });
    }
}

export { finishRegistration };
