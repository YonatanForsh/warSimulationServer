import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, verify } from "jsonwebtoken";


export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers["authorization"]
        if (!token) { res.status(403).json({ err: "Token must be provided" }); return}
        const payload = jwt.verify(token, process.env.JWT_SECRET!);
        (req as any).user = payload
        next()
    } catch (error) {
        res.status(401).json(error as JsonWebTokenError)
    }
}
