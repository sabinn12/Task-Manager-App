//src/middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';


//  an interface to extend the Request type
interface AuthenticatedRequest extends Request {
    user?: {
        id: string;
        email: string;
    };
}


export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
         res.status(401).json({ success: false, message: 'No token provided' });
         return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload; 

        // Validate decoded token structure
        if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded) {
            req.user = { id: decoded.id as string, email: decoded.email as string }; 
            next();
        } else {
            res.status(403).json({ success: false, message: 'Invalid token structure' });
        }
    } catch (error) {
        res.status(403).json({ success: false, message: 'Invalid token' });
    }
};



