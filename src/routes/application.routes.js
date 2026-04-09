import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
import isUser from "../middlewares/isUser.middleware.js"
import { applyToJob,getMyApplications } from "../controllers/application.controller.js";
const router=express.Router();

router.post("/apply/:id",verifyJWT,isUser,applyToJob);
router.get("/mine", verifyJWT, isUser, getMyApplications);

export default router;