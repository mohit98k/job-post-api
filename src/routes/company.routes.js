import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
const router=express.Router();
import isCompany from "../middlewares/isCompany.middleware.js";
import checkBanStatus from "../middlewares/isBanned.middleware.js";
import {createCompany,getCompany} from "../controllers/company.controller.js";

router.post("/create",verifyJWT,checkBanStatus,isCompany,createCompany);
router.get("/getCompany/:id",verifyJWT,checkBanStatus,getCompany);

export default router;