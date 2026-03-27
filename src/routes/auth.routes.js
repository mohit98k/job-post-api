import express from "express";
const router=express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import { register,login, logout } from "../controllers/auth.controller.js";

router.post("/register",register);
router.post("/login",login);

router.post("/logout",verifyJWT,logout);

export default router;