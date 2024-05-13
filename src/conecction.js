import dotenv from "dotenv";
import Sequelize from "sequelize";
dotenv.config({path:".env"})

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
  host: process.env.BD_HOST,
  port: "3309",
  dialect: "mysql",
  timezone: '-06:00', // Configura la zona horaria aquí  define: { timestamp: true },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle:10000,
    operatorAliases:false,
  },
  logging: false
})

export default db