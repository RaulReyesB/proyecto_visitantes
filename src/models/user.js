import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import db from "../conecction.js";

const User = db.define(
  "tb_users",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM("usuario", "superUsuario", "administrador", "rh"),
      defaultValue: "usuario",
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
      allowNull: false
    }
  },
  {
    timestamps: true,
  }
);

User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
