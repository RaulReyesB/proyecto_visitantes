const registros = [
  {
    nombre: "jacinta",
    telefono: "1234567890",
    correo: "jacinta@gmail.com",
    curp: "123456789012345678",
    identificacion: "INE",
    departamento: "Comunicacion",
    procedenciaa: "Hidalgo",
    ninos: "0",
    gafete: "772",
  },
];

const index = (req, res) => {
  res.render("index", {
    nombrePagina: "Inicio",
    descripcion: "Bienvenido a Radio y Television Hidalgo",
  });
};
const register = (req, res) => {
  res.render("register", {
    nombrePagina: "Registro de visitas",
    descripcion: "Registrate en Radio y Television Hidalgo",
  });
};

const history = (req, res) => {
  res.render("history", {
    nombrePagina: "Historial de visitas",
    descripcion: "Historial de visitantes de Radio y Television Hidalgo",
    registros: registros,
  });
};

const savedRegister = async (req, res) => {
  console.log("Validar y guardar datos en la base de datos");

  const {
    name,
    phone,
    email,
    CURP,
    identification,
    department,
    origin,
    children,
    badge,
    entrance,
    exit,
  } = req.body

  try {
    console.log("Datos del registro:", {
      name,
      phone,
      email,
      CURP,
      identification,
      department,
      origin,
      children,
      badge,
      entrance,
      exit,
    });

    const savedRegister = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const newRegister = {
          name,
          phone,
          email,
          CURP,
          identification,
          department,
          origin,
          children,
          badge,
          entrance,
          exit,
        };
        resolve(newRegister);
      }, 2000);
    });

    console.log("Registro guardado:", savedRegister);

    res
      .status(201)
      .json({
        mensaje: "Registro guardado correctamente",
        registro: savedRegister,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ mensaje: "Error al guardar el registro", error: error.message });
  }
};

const updateRegister = async (req, res) => {
  console.log("Validar y actualizar datos en la base de datos");
  const {
    name,
    phone,
    email,
    CURP,
    identification,
    department,
    origin,
    children,
    badge,
    entrance,
    exit,
  } = req.body;

  try {
    console.log("Datos de actualización del registro:", {
      name,
      phone,
      email,
      CURP,
      identification,
      department,
      origin,
      children,
      badge,
      entrance,
      exit,
    });

    const updatedRegister = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const updatedData = {
          name,
          phone,
          email,
          CURP,
          identification,
          department,
          origin,
          children,
          badge,
          entrance,
          exit,
        };
        resolve(updatedData);
      }, 2000);
    });

    console.log("Registro actualizado:", updatedRegister);

    res
      .status(200)
      .json({
        mensaje: "Registro actualizado correctamente",
        registro: updatedRegister,
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        mensaje: "Error al actualizar el registro",
        error: error.message,
      });
  }
};

const findAllRegister = async (req, res) => {
  console.log("Buscar y devolver todos los registros de la base de datos");

  try {
    const allRegisters = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const registros = [
          { id: 1, name: "Registro 1" },
          { id: 2, name: "Registro 2" },
          { id: 3, name: "Registro 3" },
        ];
        resolve(registros);
      }, 2000);
    });

    console.log("Registros encontrados:", allRegisters);

    res.status(200).json({ registros: allRegisters });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        mensaje: "Error al encontrar los registros",
        error: error.message,
      });
  }
};

export { findAllRegister, history, index, register, savedRegister, updateRegister };

