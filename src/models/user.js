// Importación de DataTypes desde Sequelize para definir los tipos de datos de los campos
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
// Importación de la conexión a la base de datos
import db from "../conecction.js";


// Definición del modelo tb_users
const User = db.define("tb_users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,  // El campo no puede ser nulo
  },
  password: {
    type: DataTypes.STRING(255),  // Longitud máxima de 255 caracteres
    allowNull: false,  
  },
  type: {
    type: DataTypes.ENUM("usuario", "superUsuario", "administrador", "rh"),  // Valores posibles para el campo
    defaultValue: "usuario",  // Valor por defecto
    allowNull: false,  // El campo no puede ser nulo
  },
  status: {
    type: DataTypes.BOOLEAN,  // Tipo de dato booleano
    defaultValue: 1,  // Valor por defecto es 1 (true)
    allowNull: false, 
  }
}, {
  timestamps: true,  // Agrega automáticamente los campos createdAt y updatedAt
});

// Método para verificar la contraseña del usuario
User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);  // Compara la contraseña ingresada con la almacenada usando bcrypt
};

export default User;
