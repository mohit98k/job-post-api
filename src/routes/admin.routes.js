import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
const router=express.Router();
import isAdmin from "../middlewares/isAdmin.middleware.js";
import { createTag,createSkill } from "../controllers/admin.controller.js";

router.post("/createTag",verifyJWT,isAdmin,createTag);
router.post("/createSkill",verifyJWT,isAdmin,createSkill);

export default router;