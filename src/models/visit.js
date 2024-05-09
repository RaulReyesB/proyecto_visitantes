import { DataTypes } from "sequelize";
import db from "../conecction.js";


const Visit = db.define("tb_visits",{
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CURP: {
            type: DataTypes.STRING(18),
            allowNull: false
        },
        identification: {
            type: DataTypes.STRING,
            allowNull: false
        },
        department: {
            type: DataTypes.STRING,
            allowNull: false
        },
        origin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        children: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        badge: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        entrance: {
            type: DataTypes.DATE,
            allowNull: false
        },
        exit: {
            type: DataTypes.DATE,
            allowNull: false
        }
})

export default Visit;