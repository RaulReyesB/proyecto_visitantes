import Intern from "./Intern.js";
import HistoryIntern from "./history_I.js";


// Un Intern puede tener muchos registros de historial
Intern.hasMany(HistoryIntern, {
  foreignKey: "fileNumber",  // Clave foránea en HistoryIntern que se refiere a fileNumber en Intern
  sourceKey: "fileNumber",   // Clave primaria en Intern
  as: "history",             // Alias de la relación para acceder a los registros de historial desde un Intern
});

// Un registro de historial pertenece a un Intern
HistoryIntern.belongsTo(Intern, {
  foreignKey: "fileNumber",  // Clave foránea en HistoryIntern que se refiere a fileNumber en Intern
  targetKey: "fileNumber",   // Clave primaria en Intern
  as: "intern",              // Alias de la relación para acceder al Intern desde un registro de historial
});

export { Intern, HistoryIntern };
