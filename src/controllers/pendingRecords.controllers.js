import Visit from "../models/visit.js";

const finishRegistration = async(req,res)=>{
    const id = req.params.id;

    const registerEnd = await Visit.findOne({ where: {id}})

    var dateNow = new Date();

    registerEnd.exit = await dateNow.toISOString().slice(0, 19).replace('T', ' ');

    registerEnd.save();

    res.render("index", {
        namePage: "Inicio",
        description: "Bienvenido a Radio y Television Hidalgo",
        user: req.session.user, // Asegúrate de pasar req.session.user si lo estás almacenando en la sesión
    });
}

export { finishRegistration };
