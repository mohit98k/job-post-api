import express from "express";
const router=express.Router();
import verifyJWT from "../middlewares/auth.middleware.js";
import { register,login, logout, refreshMyToken } from "../controllers/auth.controller.js";
import { rateLimitLogin,rateLimitSingUp } from '../middlewares/rateLimit.middleware.js';

router.post("/register",rateLimitSingUp,register);
router.post("/login",rateLimitLogin,login);

router.post("/logout",verifyJWT,logout);
router.post("/refresh-my-token",refreshMyToken);

export default router;