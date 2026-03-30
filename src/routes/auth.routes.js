import express from "express";
const router=express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import { register,login, logout, refreshMyToken } from "../controllers/auth.controller.js";

router.post("/register",register);
router.post("/login",login);

router.post("/logout",verifyJWT,logout);
router.post("/refresh-my-token",refreshMyToken);

export default router;