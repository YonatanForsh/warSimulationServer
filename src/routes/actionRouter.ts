import { Request, Response } from "express"
import actionServies from "../services/actionServies"

export const getActions = async (req: Request, res: Response) => {
    try {      
        const resolt = await actionServies.getActions()
        console.log(resolt);
        res.status(200).send(resolt)
      } catch (err) {
        res.status(400).json((err as Error).message)
      }
}
