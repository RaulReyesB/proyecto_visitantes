import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.routes.js';
import { config } from "dotenv";

//inicializando express y dandole los atributos a app
const app=express();

//setings
dotenv.config({ path: ".env" });

//habilitando env para poder ocupar variables de entorno 
dotenv.config({path: "src/.env"})

//Definimos la carpeta para los recursos Public
app.use(express.static("./src/public"));

app.set('view engine', 'pug')
app.set('views', 'src/views')

//agregando el puerto para poder levantar el servidor 
app.listen(process.env.PORT, () => {
  console.log("Server on port: " + process.env.PORT);
});

//creadno ruta madre para las rutas
app.use("/", router);