import dotenv from "dotenv";
import express from "express";
import session from 'express-session';
import db from "./conecction.js";
import router from "./routes/index.routes.js";
import modelo from "./models/visit.js";
import User from "./models/user.js";
//setings
dotenv.config({ path: ".env" });

const app = express();

// Configuración de express-session
app.use(session({
  secret: 'rthinformatica', 
  resave: false,
  saveUninitialized: false,
}));

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("./src/public"));

app.listen(process.env.PORT, () => {
  console.log("Server on port: http://localhost:" + process.env.PORT);
});


app.use("/", router);
try {
  await db.authenticate();
  console.log("La conexion a la base de datos ha sido exitosa");
  db.sync();
  console.log("Se ha sincronizado las tablas existentes en la base de datos");
} catch {
  console.log("Ocurrio un error al intentar conectarse a la base de datos :c ");
}

modelo
  .sync()
  .then(() => console.log("Tablas creadas con éxito"))
  .catch((error) => console.error("Error al crear las tablas:", error));
