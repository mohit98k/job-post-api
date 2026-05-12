import express from "express"
import verifyJWT from "../middlewares/auth.middleware.js";
const router=express.Router();
import isAdmin from "../middlewares/isAdmin.middleware.js";
import { createTag,createSkill,banUser,unbanUser } from "../controllers/admin.controller.js";

router.post("/createTag",verifyJWT,isAdmin,createTag);
router.post("/createSkill",verifyJWT,isAdmin,createSkill);
router.patch("/banUser",verifyJWT,isAdmin,banUser);
router.patch("/unbanUser",verifyJWT,isAdmin,unbanUser);

export default router;