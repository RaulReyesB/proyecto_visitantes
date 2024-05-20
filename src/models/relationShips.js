import Intern from "./Intern.js";
import HistoryIntern from "./history_I.js";

// Definir Relaciones
Intern.hasMany(HistoryIntern, {
  foreignKey: "fileNumber",
  sourceKey: "fileNumber",
  as: "history",
});

HistoryIntern.belongsTo(Intern, {
  foreignKey: "fileNumber",
  targetKey: "fileNumber",
  as: "intern",
});

export { Intern, HistoryIntern };
