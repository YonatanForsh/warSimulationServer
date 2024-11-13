import { Request, Response } from "express"
import protectionServies from "../services/protectionServies"


export const intercept = async (req: Request, res: Response) => {
    try {
        protectionServies.intercept(req, res)
        res.status(200)
      } catch (err) {
        res.status(400).json((err as Error).message)
      }
}
