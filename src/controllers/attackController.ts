import { Router } from "express";
import { shutMissile } from "../routes/attackRouter";


const router = Router()

router.post("/", shutMissile)

export default router