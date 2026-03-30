import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
const router=express.Router();
import isCompany from "../middlewares/isCompany.middleware.js";
import {createCompany,getCompany} from "../controllers/company.controller.js";

router.post("/create",verifyJWT,isCompany,createCompany);
router.get("/getCompany/:id",verifyJWT,getCompany);

export default router;