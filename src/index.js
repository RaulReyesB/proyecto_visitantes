import dotenv from 'dotenv';
import express from 'express';
import router from './routes/index.routes';

dotenv.config({path: "src/.env"})
const app=express();

app.set('view engine', 'pug')
app.set('views', 'src/views')

app.use("/", router);