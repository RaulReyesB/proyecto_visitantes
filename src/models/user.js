import { DataTypes } from "sequelize";
import bcrypt from "bcrypt"
import db from "../conecction.js";

const User = db.define("tb_users", {
  name: {
    type: DataTypes.STRING,
    allownull: false,
  },
  password: {
    type: DataTypes.STRING(15),
    allownull: false,
  },
});

  //TODO Crear columna para que haya usuarios con diferentes roles como administrador, superUsuario y usuario


User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
