// Importación de Moment.js para el formateo de fechas
import moment from "moment/moment.js";
// Importación de DataTypes desde Sequelize para definir los tipos de datos de los campos
import { DataTypes } from "sequelize";
// Importación de la conexión a la base de datos
import db from "../conecction.js";

// Definición del modelo tb_visits
const Visit = db.define("tb_visits", {
  // Nombre del visitante
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Número de teléfono del visitante
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false,
  },
  // Correo electrónico del visitante
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // CURP (Clave Única de Registro de Población) del visitante (opcional)
  CURP: {
    type: DataTypes.STRING(18),
    allowNull: true,
  },
  // Identificación del visitante (por ejemplo, INE, pasaporte, etc.)
  identification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Departamento al que visita el visitante
  department: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Subdepartamento al que visita el visitante
  subDepartment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Origen del visitante (por ejemplo, visitante externo, empleado, etc.)
  origin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Número de niños acompañando al visitante (valor predeterminado: 0)
  children: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  // Identificador único de la tarjeta o pase del visitante (opcional)
  badge: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null,
    unique: true
  },
  // Fecha y hora de entrada del visitante (valor predeterminado: fecha y hora actual)
  entrance: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    get() {
      // Formatea la fecha y hora de entrada en formato "DD/MM/YYYY HH:mm:ss"
      const value = this.getDataValue("entrance");
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
  // Fecha y hora de salida del visitante (opcional)
  exit: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    get() {
      // Formatea la fecha y hora de salida en formato "DD/MM/YYYY HH:mm:ss"
      const value = this.getDataValue("exit");
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
});

// Exporta el modelo Visit
export default Visit;
