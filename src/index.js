import dotenv from 'dotenv';
import express from 'express';


dotenv.config({path: "src/.env"})
const app=express();

app.set('view engine', 'ejs')
app.set('views', 'src/views')
