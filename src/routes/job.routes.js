import express from 'express'
const router=express.Router();
import isCompany from '../middlewares/isCompany.middleware.js';
import { createJob,getJob,getJobs,getRecommendedJob,getApplications } from '../controllers/job.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';
import isUser from '../middlewares/isUser.middleware.js';
import checkBanStatus from '../middlewares/isBanned.middleware.js';

router.post("/createJob",verifyJWT,checkBanStatus,isCompany,createJob);
router.get("/getJob/:id",verifyJWT,checkBanStatus,getJob);
router.get("/getJobs",verifyJWT,checkBanStatus,getJobs);
router.get("/getRecommendedJobs",verifyJWT,checkBanStatus,isUser,getRecommendedJob);
router.get("/:id/applications",verifyJWT,checkBanStatus,isCompany,getApplications);


export default router;