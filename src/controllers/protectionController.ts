import { Router } from "express";
import { intercept } from "../routes/protectionRouter";

const router = Router()

router.post("/", intercept)

export default router