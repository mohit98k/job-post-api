import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
import isUser from "../middlewares/isUser.middleware.js"
import isCompany from "../middlewares/isCompany.middleware.js"
import { applyToJob,getMyApplications,updateApplicationStatus } from "../controllers/application.controller.js";
const router=express.Router();

router.post("/apply/:id",verifyJWT,isUser,applyToJob);
router.get("/mine", verifyJWT, isUser, getMyApplications);
router.patch("/updateStatus",verifyJWT,isCompany,updateApplicationStatus);

export default router;