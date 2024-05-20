import User from "../models/user.js";
import bcrypt from 'bcryptjs';

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
      errors: [{msg: "No se pudo completar la operacion"}],
      msg: ""
    });
  }
};

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


export { adminUser, toggleStatus, editUser, updateUser,logout };
