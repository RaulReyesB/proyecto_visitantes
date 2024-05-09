const index = (req, res) => {
  res.render("Inicio", {
    nombrePagina: "Inicio",
    descripcion: "Bienvenido a Radio y Television Hidalgo"
  })
}
const registro = (req, res) => {
  res.render("registro", {
    nombrePagina: "Registro",
    descripcion: "Registrate en Radio y Television Hidalgo"
  })
}

export{
  index
}