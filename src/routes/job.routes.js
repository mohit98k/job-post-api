import express from 'express'
const router=express.Router();
import isCompany from '../middlewares/isCompany.middleware.js';
import { createJob,getJob,getJobs,getRecommendedJob,getApplications } from '../controllers/job.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import isUser from '../middlewares/isUser.middleware.js';


router.post("/createJob",verifyJWT,isCompany,createJob);
router.get("/getJob/:id",verifyJWT,getJob);
router.get("/getJobs",verifyJWT,getJobs);
router.get("/getRecommendedJobs",verifyJWT,isUser,getRecommendedJob);
router.get("/:id/applications",verifyJWT,isCompany,getApplications);


export default router;