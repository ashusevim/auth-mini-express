import { type Request, type Response, type NextFunction } from "express";
import jwt from "jsonwebtoken"

const jwt_secret = process.env.JWT_SECRET as string

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    // Expect: "Authentication: Bearer <token>"

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Missing authentication header" })
    }

    const token = authHeader.split(" ")[1]
    if (!token) {
        return res.status(400).json({
            message: "Token is required"
        })
    }

    try {
        const payload = jwt.verify(token, jwt_secret) as { id: number; email: string; iat?: number; exp?: number }

        req.user = { id: payload.id, email: payload.email }
        return next()
    } catch (error) {
        return res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}