import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from "./routes/user.routes.js"
import companyRoutes from "./routes/company.routes.js"
import cookieParser from 'cookie-parser'
import errorHandler from './middlewares/errorHandler.middleware.js';
import jobRoutes from "./routes/job.routes.js"
import adminRoutes from "./routes/admin.routes.js"

const app=express();

app.use(express.json()); // to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // to parse form-data if needed
app.use(cookieParser())
app.set("trust proxy", true);//for real ip detection when deployed 

//authroutes
app.use("/api/v1/auth",authRoutes);
//userRoutes
app.use("/api/v1/user",userRoutes);
//companyRoutes
app.use("/api/v1/company",companyRoutes);
//jobRoutes
app.use("/api/v1/job",jobRoutes);
//AdminRoutes
app.use("/api/v1/admin",adminRoutes);
//global error handler 
app.use(errorHandler);




export default app;