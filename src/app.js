import express from 'express';
import authroutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser'
const app=express();

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse form-data if needed
app.use(cookieParser())

//authroutes
app.use("/api/v1/auth",authroutes)

export default app;