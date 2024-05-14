import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import db from "../conecction.js";

const User = db.define(
  "tb_users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(15),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("usuario", "superUsuario", "administrador"),
      defaultValue: "usuario",
      allowNull: false,
    },
  },
  {
    timestamps: true, 
  }
);

User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
