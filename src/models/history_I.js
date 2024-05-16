import { DataTypes } from "sequelize";
import moment from "moment/moment.js";
import db from "../conecction.js";
const History_I = db.define("tb_historyInterns", {
    fileNumber: {
        type: DataTypes.STRING,
        allowNull: false,
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
    }
});
export default History_I;
