import { DataTypes } from "sequelize";
import db from "../conecction.js";

const User = db.define("tb_users",{
    name:{
        type: DataTypes.STRING,
        allownull: false
    },
    password:{
        type: DataTypes.STRING,
        allownull: false
    },
});

export default User