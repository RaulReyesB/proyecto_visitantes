const registros = [{
  nombre : "jacinta",
  telefono : "1234567890",
  correo : "jacinta@gmail.com",
  curp : "123456789012345678",
  identificacion : "INE",
  departamento : "Comunicacion",
  procedenciaa : "Hidalgo",
  ninos: "0",
  gafete: "772",
}]

const index = (req, res) => {
  res.render("history", {
    nombrePagina: "Inicio",
    descripcion: "Bienvenido a Radio y Television Hidalgo",
    registros: registros
  })
}
const registro2 = (req, res) => {
  res.render("registro", {
    nombrePagina: "Registro",
    descripcion: "Registrate en Radio y Television Hidalgo"
  })
}

const history = (req,res) => {
  const registros = [{
    nombre : "jacinta",
    telefono : "1234567890",
    correo : "jacinta@gmail.com",
    curp : "123456789012345678",
    identificacion : "INE",
    departamento : "Comunicacion",
    procedencia : "Hidalgo",
    ninos: "0",
    gafete: "772",
  }]
}


export{
  index
}