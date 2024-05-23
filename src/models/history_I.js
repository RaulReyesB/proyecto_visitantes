// Importación de DataTypes desde Sequelize para definir los tipos de datos de los campos
import { DataTypes } from "sequelize";
// Importación de Moment.js para el formateo de fechas
import moment from "moment/moment.js";
// Importación de la conexión a la base de datos
import db from "../conecction.js";

// Definición del modelo tb_historyInterns
const History_I = db.define("tb_historyInterns", {
    // Definición de la columna fileNumber
    fileNumber: {
        // Tipo de dato: Cadena de caracteres
        type: DataTypes.STRING,
        // No permite valores nulos
        allowNull: false,
    },
    // Definición de la columna entrance
    entrance: {
        // Tipo de dato: Fecha
        type: DataTypes.DATE,
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
        allowNull: true,
        // Valor por defecto: null
        defaultValue: null,
        // Getter para formatear el valor de la fecha usando Moment.js
        get() {
            const value = this.getDataValue("exit");
            // Si hay un valor, lo formatea a 'DD/MM/YYYY HH:mm:ss', de lo contrario, devuelve null
            return value ? moment(value).format("DD/MM/YYYY HH:mm:ss") : null;
        },
    }
});

// Exportación del modelo para su uso en otras partes de la aplicación
export default History_I;
