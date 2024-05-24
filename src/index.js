// Importa los módulos necesarios
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import db from "./conecction.js";
import router from "./routes/index.routes.js";
import pdR from "./routes/pendingRecords.routes.js";
import modelo from "./models/visit.js";
import User from "./models/user.js";
import checkAndCompleteService from "./utils/checkAndCompleteService.js";
import user from "./routes/users.routes.js";
import cron from "node-cron";
import routesInterns from "./routes/interns.routes.js";
import { fileURLToPath } from "url";
import path from "path";
import { Intern, HistoryIntern } from "./models/relationShips.js";
import visit from "./routes/visits.routes.js";

// Define __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configura dotenv para cargar variables de entorno desde un archivo .env
dotenv.config({ path: "var.env" });

// Crea una nueva aplicación Express
const app = express();

// Configura express-session para manejar las sesiones
app.use(
  session({
    secret: "rthinformatica",
    resave: false,
    saveUninitialized: false,
  })
);

// Configura el motor de plantillas utilizado en este caso es el EJS
app.set("view engine", "ejs");
app.set("views", "src/views");

// Configura el middleware para servir archivos estáticos desde la carpeta public
app.use(express.static(path.join(__dirname, "public")));

// Inicia el servidor en el puerto que esta en las variables de entorno
app.listen(process.env.PORT, () => {
  console.log(
    "Server on port: http://localhost:" + process.env.PORT + "/iniciarSesion"
  );
});

// Configura las rutas de la aplicación
app.use("/", router);
app.use("/", pdR);
app.use("/", user);
app.use("/", routesInterns);
app.use("/", visit)

// Se autentica a la base de datos y sincroniza los modelos
try {
  await db.authenticate();
  console.log("La conexion a la base de datos ha sido exitosa");
  db.sync();
  console.log("Se ha sincronizado las tablas existentes en la base de datos");
} catch (error) {
  console.log("Ocurrio un error al intentar conectarse a la base de datos :c ");
}

// ISincroniza el modelo con la base de datos
modelo
  .sync()
  .then(() => console.log("Tablas creadas con éxito"))
  .catch((error) => console.error("Error al crear las tablas:", error));

// Programa una tarea para ejecutarse todos los días a medianoche
cron.schedule("0 0 * * *", () => {
  console.log("Running the service completion check");
  checkAndCompleteService();
});