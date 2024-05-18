import moment from "moment/moment.js";
import { DataTypes } from "sequelize";
import db from "../conecction.js";

const Intern = db.define("tb_interns", {
  fileNumber: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: false
  },
  school: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Mat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  career: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asignementDirec: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adviser: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numberHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  days:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  shedule: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hoursxDay: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startService: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endService:{
    type: DataTypes.STRING,
    allowNull:false
  },
  totHours: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hoursFulfilled:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  Program: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Observations: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  service: {
    type: DataTypes.ENUM("dual", "estadia", "estancia", "practicas", "residencia", "servicio social"),
    allowNull: false
  },
  entrance: {
    type: DataTypes.DATE,
    allowNull: true,
    get() {
      const value = this.getDataValue("entrance");
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
  exit: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
    get() {
      const value = this.getDataValue("exit");
      return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
    },
  },
  serviceCompleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  timestamps: true,
});

export default Intern;
