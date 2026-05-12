import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {getUser,getMe,addSkill} from "../controllers/user.controller.js";
import isUser from "../middlewares/isUser.middleware.js"
import checkBanStatus from "../middlewares/isBanned.middleware.js";
const router=express.Router();

router.get("/getUser/:id",verifyJWT,checkBanStatus,getUser);
router.get("/getMe",verifyJWT,getMe);
router.post("/addSkill",verifyJWT,checkBanStatus,isUser,addSkill);

export default router;