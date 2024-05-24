import { exit } from "node:process"; // Importa la función exit para terminar el proceso
import users from "./users.js"; // Importa el conjunto de datos de usuarios
import user from "../../models/user.js"; // Importa el modelo de usuario
import conecction from "../../conecction.js"; // Importa la conexión a la base de datos
import { QueryTypes } from "sequelize"; // Importa tipos de consultas de Sequelize

// Función asincrónica para importar datos de usuarios
const importData = async () => {
    try {
        // Autenticar y sincronizar la conexión a la base de datos
        await conecction.authenticate();
        await conecction.sync();

        // Insertar múltiples registros de usuarios
        await Promise.all([
            user.bulkCreate(users)
        ]);

        console.log("Datos importados correctamente");
        exit(1); // Salir del proceso con código de salida 1
    } catch (error) {
        console.log(error);
        process.exit(1); // Salir del proceso con código de salida 1 en caso de error
    }
}

// Función asincrónica para eliminar datos de usuarios
const deleteData = async () => {
    try {
        // Eliminar todos los registros de la tabla de usuarios y reiniciar el contador de autoincremento
        await Promise.all([
            user.destroy({
                where: {}, // Elimina todos los registros
                truncate: false // No trunca la tabla, solo elimina los datos
            }),
            conecction.query("ALTER TABLE tb_users AUTO_INCREMENT=1", { type: QueryTypes.RAW }) // Reinicia el contador de autoincremento
        ]);

        console.log("Datos eliminados correctamente");
        exit(1); // Salir del proceso con código de salida 1
    } catch (error) {
        console.log(error);
        process.exit(1); // Salir del proceso con código de salida 1 en caso de error
    }
}

// Ejecuta importData o deleteData dependiendo del argumento pasado al script
if (process.argv[2] === "-i") {
    importData();
}
if (process.argv[2] === "-d") {
    deleteData();
}
