import dotenv from "dotenv";
import Sequelize from "sequelize";

dotenv.config({path:"src/.env"})

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
  host: process.env.BD_HOST,
  port: process.env.BD_PORT,
  dialect: "mysql",
  timezone: '-06:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle:10000,
    operatorAliases:false
  },
})

export default db