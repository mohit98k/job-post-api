import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {getUser,getMe,addSkill} from "../controllers/user.controller.js";
import isUser from "../middlewares/isUser.middleware.js"
const router=express.Router();

router.get("/getUser/:id",verifyJWT,getUser);
router.get("/getMe",verifyJWT,getMe);
router.post("/addSkill",verifyJWT,isUser,addSkill);

export default router;