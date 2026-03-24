import express from 'express';
const app=express();

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse form-data if needed

export default app;