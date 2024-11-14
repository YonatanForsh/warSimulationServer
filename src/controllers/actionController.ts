import { Router } from "express";
import { shutMissile } from "../routes/attackRouter";
import { getActions } from "../routes/actionRouter";

const router = Router()

router.get("/", getActions)

export default router