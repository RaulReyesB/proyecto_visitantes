import Visit from "../models/visit.js";
import { Op } from 'sequelize';

const badgeOcuppied = async (req, res)=>{
    try {
        const occupiedBadges = await Visit.findAll({
            where: {
                badge: {
                    [Op.not]: null
                }
            },
            attributes: ['badge']
        });

        const badges = occupiedBadges.map(b => b.badge);
        res.json(badges);
    } catch (error) {
        console.error("Error al obtener badges ocupados:", error);
        res.status(500).send("Error al obtener badges ocupados");
    }
}

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
        const badgeToRelease = visit.badge;
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

        // Enviar badgeToRelease para habilitar en el frontend (opcional)
        res.json({ badge: badgeToRelease });

    } catch (error) {
        console.error("Error al finalizar el registro:", error);
        res.render("index", {
            namePage: "Inicio",
            description: "Bienvenido a Radio y Television Hidalgo",
            user: req.session.user,
            errors: [{ msg: "No se pudo completar la operacion" }],
            msg: ""
        });
    }
}

export { finishRegistration, badgeOcuppied };
