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

User.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export default User;
