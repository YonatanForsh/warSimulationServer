import { Router } from "express";
import { login, register } from "../routes/userRouter";
import { verifyUser } from "../middleWares/userMW";

const router = Router()
console.log("enter to controller");

router.post("/login", login)
router.post("/register", register)

export default router