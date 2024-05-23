import Visit from "../models/visit.js";
import { Op } from 'sequelize';

// Función para obtener todas las credenciales ocupadas
const badgeOcuppied = async (req, res) => {
    try {
        // Busca todas las visitas donde el campo 'badge' no es nulo
        const occupiedBadges = await Visit.findAll({
            where: {
                badge: {
                    [Op.not]: null
                }
            },
            attributes: ['badge'] // Solo selecciona el campo 'badge'
        });
        // Extrae las credenciales ocupadas en un array
        const badges = occupiedBadges.map(b => b.badge);
        // Envía la respuesta en formato JSON con las credenciales ocupadas
        res.json(badges);
    } catch (error) {
        console.error("Error al obtener badges ocupados:", error);
        // En caso de error, envía un mensaje de error del servidor
        res.status(500).send("Error al obtener badges ocupados");
    }
}
// Función para finalizar el registro de una visita
const finishRegistration = async (req, res) => {
    const id = req.params.id; // Obtiene el ID de la visita desde los parámetros de la solicitud
    try {
        // Busca la visita por su ID
        const visit = await Visit.findOne({ where: { id } });
        if (!visit) {
            // Si la visita no se encuentra, envía un mensaje de error 404
            return res.status(404).send("Visita no encontrada");
        }
        // Actualiza la fecha de salida con la fecha y hora actuales
        visit.exit = new Date();
        // Guarda la credencial a liberar
        const badgeToRelease = visit.badge;
        // Libera la credencial
        visit.badge = null;
        // Guarda los cambios en la base de datos
        await visit.save();

        // Renderiza la página de inicio con un mensaje de éxito
        res.render("index", {
            namePage: "Inicio",
            description: "Bienvenido a Radio y Television Hidalgo",
            user: req.session.user,
            msg: "Registro finalizado correctamente",
            errors: []
        });
        // Opcionalmente, envía la credencial liberada en formato JSON
        res.json({ badge: badgeToRelease });
    } catch (error) {
        console.error("Error al finalizar el registro:", error);
        // En caso de error, renderiza la página de inicio con un mensaje de error
        res.render("index", {
            namePage: "Inicio",
            description: "Bienvenido a Radio y Television Hidalgo",
            user: req.session.user,
            errors: [{ msg: "No se pudo completar la operación" }],
            msg: ""
        });
    }
}

export { finishRegistration, badgeOcuppied };
