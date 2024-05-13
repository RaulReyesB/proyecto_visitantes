import { DataTypes } from "sequelize";
import db from "../conecction.js";

const User = db.define("tb_users",{
    name:{
        type: DataTypes.STRING,
        allownull: false
    },
    pass:{
        type: DataTypes.STRING(15),
        allownull: false
    },
});

export default User