const index = (req, res) => {
  res.render("Inicio", {
    nombrePagina: "Inicio",
    descripcion: "Bienvenido a Radio y Television Hidalgo"
  })
}


export{
  index
}