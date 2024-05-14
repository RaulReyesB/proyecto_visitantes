import User from "../models/user.js";

const adminUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.render("adminUser", {
      namePage: "Administrar usuarios",
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

    // Cambiar el estado del usuario
    currentUser.status = !currentUser.status; // Cambiar el estado

    await currentUser.save(); // Guardar el usuario actualizado

    res.status(200).send("Estado del usuario actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar el estado del usuario:", error);
    res.status(500).send("Error interno del servidor");
  }
};

export { adminUser, toggleStatus };
