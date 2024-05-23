// Importación de Moment.js para el formateo de fechas
import moment from "moment/moment.js";
// Importación de DataTypes desde Sequelize para definir los tipos de datos de los campos
import { DataTypes } from "sequelize";
// Importación de la conexión a la base de datos
import db from "../conecction.js";

// Definición del modelo tb_interns
const Intern = db.define("tb_interns", {
 
  // Definición de la columna fileNumber
  fileNumber: {
    // Tipo de dato: Cadena de caracteres
    type: DataTypes.STRING,
    // Permite valores nulos
    allowNull: true,
    // Valor único
    unique: true
  },
    // Definición de la columna name
  name: {
    //tipo de dato: cadena de caracteres
    type: DataTypes.STRING,
    // no permite valores nulos
    allowNull: false,
  },
      // Definición de la columna img
  img: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
      // Definición de la columna school
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
      // Definición de la columna mat
  Mat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
      // Definición de la columna career
  career: {
    type: DataTypes.STRING,
    allowNull: false,
  },
      // Definición de la columna asignementDirec
  asignementDirec: {
    type: DataTypes.STRING,
    allowNull: false,
  },
        // Definición de la columna adviser
  adviser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
        // Definición de la columna days
  days:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definición de la columna shedule
  shedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definición de la columna hoursxDay
  hoursxDay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Definición de la columna startService
  startService: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definición de la columna endService
  endService:{
    type: DataTypes.STRING,
    allowNull:false
  },
  // Definición de la columna totHours
  totHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Definición de la columna hoursFulfilled
  hoursFulfilled:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  // Definición de la columna program
  Program: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Definición de la columna observations
  Observations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   // Definición de la columna service
   service: {
    // Tipo de dato: Enumeración
    type: DataTypes.ENUM("dual", "estadia", "estancia", "practicas", "residencia", "servicio social"),
    // No permite valores nulos
    allowNull: false
  },
  // Definición de la columna entrance
  entrance: {
    // Tipo de dato: Fecha
    type: DataTypes.DATE,
    // Permite valores nulos
    allowNull: true,
    // Getter para formatear el valor de la fecha usando Moment.js
    get() {
      const value = this.getDataValue("entrance");
      // Si hay un valor, lo formatea a 'DD/MM/YYYY HH:mm:ss', de lo contrario, devuelve null
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
  // Definición de la columna exit
  exit: {
    // Tipo de dato: Fecha
    type: DataTypes.DATE,
    // Permite valores nulos
    allowNull: true,
    // Valor por defecto: null
    defaultValue: null,
    // Getter para formatear el valor de la fecha usando Moment.js
    get() {
      const value = this.getDataValue("exit");
      // Si hay un valor, lo formatea a 'DD/MM/YYYY HH:mm:ss', de lo contrario, devuelve null
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
  // Definición de la columna serviceCompleted
  serviceCompleted: {
    // Tipo de dato: Booleano
    type: DataTypes.BOOLEAN,
    // No permite valores nulos
    allowNull: false,
    // Valor por defecto: false
    defaultValue: false,
  },
}, {
  // Habilita timestamps (createdAt y updatedAt)
  timestamps: true,
});

// Exportación del modelo para su uso en otras partes de la aplicación
export default Intern;
