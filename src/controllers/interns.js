import Intern from "../models/Intern.js";

const controllInterns = async(req, res) => {
  const internt = await Intern.findAll()  
  res.render("controllInterns", {
    namePage: "Control de Pasantes",
    description: "Bienvenido a el control de Pasantes",
    internt :internt,
    user: req.session.user, // Asegúrate de pasar req.session.user si lo estás almacenando en la sesión
  });
};

export {controllInterns}
