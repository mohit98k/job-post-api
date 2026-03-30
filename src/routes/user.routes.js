import express from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import {getUser,getMe} from "../controllers/user.controller.js";
const router=express.Router();

router.get("/getUser/:id",verifyJWT,getUser);
router.get("/getMe",verifyJWT,getMe);

export default router;