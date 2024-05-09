import dotenv from "dotenv";
import express from "express";
import router from "./routes/index.routes.js";
import { config } from "dotenv";
import modelo from "./models/visit.js"
//setings
dotenv.config({ path: ".env" });

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.listen(process.env.PORT, () => {
  console.log("Server on port: " + process.env.PORT);
});

app.use("/", router);

modelo
  .sync()
  .then(() => console.log("Tablas creadas con éxito"))
  .catch((error) => console.error("Error al crear las tablas:", error));
