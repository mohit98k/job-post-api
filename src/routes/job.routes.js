import express from 'express'
const router=express.Router();
import isCompany from '../middlewares/isCompany.middleware.js';
import { createJob,getJob,getJobs } from '../controllers/job.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

router.post("/createJob",verifyJWT,isCompany,createJob);
router.get("/getJob/:id",verifyJWT,getJob);
router.get("/getJobs",verifyJWT,getJobs);


export default router;