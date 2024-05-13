import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.routes.js';
import { config } from "dotenv";

//setings
dotenv.config({ path: ".env" });

const app=express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')

app.listen(process.env.PORT, () => {
  console.log("Server on port: " + process.env.PORT);
});


app.use("/", router);