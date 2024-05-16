import Intern from "../models/intern.js";

const controllInterns = async(req, res) => {
  const internt = await Intern.findAll()
  res.render("controllInterns", {
    namePage: "Control de Pasantes",
    description: "Bienvenido a el control de Pasantes",
    internt :internt 
  });
};

export {controllInterns}
