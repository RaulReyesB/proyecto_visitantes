import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import db from "./conecction.js";
import router from "./routes/index.routes.js";
import pdR from "./routes/pendingRecords.routes.js";
import modelo from "./models/visit.js";
import User from "./models/user.js";
import Intern from "./models/Intern.js";
import checkAndCompleteService from "./utils/checkAndCompleteService.js";
import history_I from "./models/history_I.js";
import user from "./routes/users.routes.js";
import { interns } from "./controllers/index.js";
import cron from "node-cron";
import routesInterns from "./routes/interns.routes.js";
import "./scheduledTasks.js"; // Importa el archivo de tareas programadas
import multer from "multer";
import { fileURLToPath } from "url";
import path from "path";

// Definir __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de dotenv
dotenv.config({ path: ".env" });

const app = express();

// Configuración de express-session
app.use(
  session({
    secret: "rthinformatica",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.set("views", "src/views");
app.use(express.static("./src/public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(process.env.PORT, () => {
  console.log(
    "Server on port: http://localhost:" + process.env.PORT + "/iniciarSesion"
  );
});

app.use("/", router);
app.use("/", pdR);
app.use("/", user);
app.use("/", routesInterns);

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

// Programar la tarea para ejecutarse todos los días a medianoche
cron.schedule("0 0 * * *", () => {
  console.log("Running the service completion check");
  checkAndCompleteService();
});

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

// Inicializar multer con la configuración de almacenamiento
const upload = multer({ storage: storage });
