// Importa el módulo dotenv, que se utilizará para cargar las variables de entorno desde un archivo .env
import dotenv from "dotenv";

// Importa Sequelize
import Sequelize from "sequelize";

// Carga las variables de entorno desde el archivo var.env
dotenv.config({path:"var.env"})

// Crea una nueva instancia de Sequelize, que se utilizará para interactuar con la base de datos
// Los parámetros son el nombre de la base de datos, el usuario, la contraseña
const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
  // El host de la base de datos
  host: process.env.BD_HOST,
  
  // El puerto de la base de datos
  port: process.env.BD_PORT,
  
  // El dialecto de la base de datos, en este caso MySQL
  dialect: "mysql",
  
  // La zona horaria de la base de datos
  timezone: '-06:00',
  
  // Configuración del pool de conexiones de la base de datos
  pool: {
    // Número máximo de conexiones en el pool
    max: 5,
    
    // Número mínimo de conexiones en el pool
    min: 0,
    
    // Tiempo máximo, en milisegundos, que una conexión puede ser inactiva antes de ser liberada
    idle:10000,
    
    // Tiempo máximo, en milisegundos, que este pool intentará obtener la conexión antes de lanzar un error
    acquire: 30000,
  },
  
  // Desactiva los alias de operadores para prevenir problemas de seguridad
  operatorAliases:false,
  
  // Desactiva el logging de Sequelize
  logging: false
})

// Exporta la instancia de Sequelize
export default db