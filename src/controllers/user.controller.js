import User from "../models/user.js";
import bcrypt from 'bcryptjs';
import { validationResult, check } from "express-validator";

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
  try {
    // Validar los datos del formulario utilizando express-validator
    await check("name")
      .notEmpty()
      .withMessage("El nombre de usuario es requerido")
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 8, max: 20 })
      .withMessage("La contraseña debe tener entre 8 y 20 caracteres")
      .run(req);
    await check("type")
      .notEmpty()
      .withMessage("El tipo de usuario es requerido")
      .isIn(["usuario", "superUsuario", "administrador", "rh"])
      .withMessage("Tipo de usuario inválido")
      .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("createusers", {
        namePage: "Registro de Usuario",
        description: "Regístrate en Radio y Television Hidalgo",
        errors: errors.array(),
      });
    }

    const { name, password, type } = req.body;

    // Verificar si el nombre de usuario ya existe en la base de datos
    const existingUser = await User.findOne({ where: { name } });
    if (existingUser) {
      return res.render("createusers", {
        namePage: "Registro de Usuario",
        description: "Regístrate en Radio y Television Hidalgo",
        errors: [{ msg: "El nombre de usuario ya está en uso" }],
      });
    }

    // Hashear la contraseña antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10); // El segundo argumento es el costo de hashing

    // Crear un nuevo usuario en la base de datos con la contraseña hasheada
    const newUser = await User.create({
      name,
      password: hashedPassword,
      type,
    });

    console.log("Usuario Guardado");
    res.render("index", {
      namePage: "Inicio",
      description: "Bienvenido a Radio y Television Hidalgo",
      user: req.session.user,
      msg: "Usuario creado correctamente",
      errors: []
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      namePage: "Inicio",
      description: "Bienvenido a Radio y Television Hidalgo",
      user: req.session.user,
      errors: [{msg: "No se pudo completar la operación"}],
      msg: ""
    });
  }
};

// Función para autenticar a un usuario
const authenticateUser = async (req, res) => {
  try {
    // Validar los datos del formulario utilizando express-validator
    await check("name")
      .notEmpty()
      .withMessage("El nombre de usuario es requerido")
      .run(req);
    await check("password")
      .notEmpty()
      .withMessage("La contraseña es requerida")
      .isLength({ min: 8, max: 20 })
      .withMessage("La contraseña debe tener entre 8 y 20 caracteres")
      .run(req);

    const errors = validationResult(req);

    const { name, password } = req.body;
    const user = await User.findOne({ where: { name } });

    if (!errors.isEmpty()) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: errors.array(),
        user: null,
        formData: {name: name}
      });
    }

    if (!user) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Usuario no encontrado en el sistema" }],
        user: null,
        formData: {name: name}
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Contraseña incorrecta" }],
        user: null,
        formData: {name: name}
      });
    }

    if (!user.status) {
      return res.render("login", {
        namePage: "Iniciar Sesión en Radio y Television Hidalgo",
        errors: [{ msg: "Tu cuenta está inactiva. Por favor, ponte en contacto con el administrador." }],
        user: null,
        formData: {name: name}
      });
    }

    // Si las credenciales son válidas y el usuario está activo, almacenar el usuario en la sesión
    req.session.user = user;

    res.render("index", {
      namePage: "Bienvenido a Radio y Television",
      description: "Página de inicio",
      user: req.session.user,
      errors: [],
      msg: ""
    });
  } catch (error) {
    console.error(error);
    res.render("index", {
      namePage: "Bienvenido a Radio y Television",
      description: "Página de inicio",
      user: req.session.user,
      errors: [{msg: "No se pudo completar la operación"}],
      msg: ""
    });
    
  }
};

// Función para administrar los usuarios de la aplicación
const adminUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("adminUser", {
      namePage: "Administrar usuarios",
      description: "Administra los usuarios de la aplicación",
      user: users,
    });
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para alternar el estado activo/inactivo de un usuario
const toggleStatus = async (req, res) => {
  try {
    const userId = req.params.userId;
    const currentUser = await User.findByPk(userId);

    if (!currentUser) {
      return res.status(404).send("Usuario no encontrado");
    }

    currentUser.status = !currentUser.status;

    await currentUser.save();

    res.status(200).send("Estado del usuario actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para renderizar el formulario de edición de un usuario
const editUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Renderizar el formulario de edición y pasar los datos del usuario
    res.render("editUser", {
      namePage: "Editar Usuario",
      description: "Edita los datos del usuario",
      user: user,
    });
  } catch (error) {
    console.error("Error al buscar el usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

// Función para actualizar la información de un usuario
const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { name, password, type } = req.body;

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    // Actualizar los datos del usuario
    user.name = name;
    user.type = type;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    await user.save();

    console.log("Usuario actualizado correctamente");
    res.render("index", {
      namePage: "Inicio",
      description: "Bienvenido a Radio y Television Hidalgo",
      user: req.session.user,
      msg: "Usuario actualizado correctamente",
      errors: []
    });
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    res.render("index", {
      namePage: "Inicio",
      description: "Bienvenido a Radio y Television Hidalgo",
      user: req.session.user,
      errors: [{msg: "No se pudo completar la operación"}],
      msg: ""
    });
  }
};

// Función para cerrar la sesión del usuario
const logout = (req, res) => {
  try {
    // Destruir la sesión del usuario
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
        return res.status(500).send("Error interno del servidor");
      }
      // Redirigir al usuario a la página de inicio de sesión
      res.redirect("/iniciarSesion");
    });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export { adminUser, toggleStatus, editUser, updateUser, logout, registerUser, authenticateUser };
