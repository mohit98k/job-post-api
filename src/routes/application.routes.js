import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
import checkBanStatus from "../middlewares/checkBanStatus.middleware.js";
import isUser from "../middlewares/isUser.middleware.js"
import isCompany from "../middlewares/isCompany.middleware.js"
import { applyToJob,getMyApplications,updateApplicationStatus,applicantsResume } from "../controllers/application.controller.js";
const router=express.Router();

router.post("/apply/:id",verifyJWT,checkBanStatus,isUser,applyToJob);
router.get("/mine", verifyJWT,checkBanStatus ,isUser, getMyApplications);
router.patch("/updateStatus",verifyJWT,checkBanStatus,isCompany,updateApplicationStatus);
router.get("/:id/resume",verifyJWT,isCompany,checkBanStatus,applicantsResume)

export default router;