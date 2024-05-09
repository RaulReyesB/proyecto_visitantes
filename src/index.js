<<<<<<< HEAD
import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.routes.js";
import { config } from "dotenv";
import modelo from "./models/visit.js"
=======
import dotenv from 'dotenv';
import express from 'express';
import db from './conecction.js';
import router from './routes/index.routes.js';
import Visit from './models/visit.js';
>>>>>>> ac4b21203fd584bcd30c387775ccffafeeb94c64
//setings
dotenv.config({ path: ".env" });

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.listen(process.env.PORT, () => {
  console.log("Server on port: " + process.env.PORT);
});

<<<<<<< HEAD
app.use("/", router);
=======
try {
  await db.authenticate();
  console.log("La conexion a la base de datos ha sido exitosa");
  db.sync();
  console.log("Se ha sincronizado las tablas existentes en la base de datos");
} catch {
  console.log("Ocurrio un error al intentar conectarse a la base de datos :c ");
}
>>>>>>> ac4b21203fd584bcd30c387775ccffafeeb94c64

modelo
  .sync()
  .then(() => console.log("Tablas creadas con éxito"))
  .catch((error) => console.error("Error al crear las tablas:", error));
