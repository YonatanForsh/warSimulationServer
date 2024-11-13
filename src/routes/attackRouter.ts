import { Request, Response } from "express"
import { createUser, userLogin } from "../services/userServies"
import attackServies from "../services/attackServies"


export const shutMissile = async (req: Request, res: Response) => {
    try {
        attackServies.shutMissile(req, res)
      } catch (err) {
        res.status(400).json((err as Error).message)
      }
}
