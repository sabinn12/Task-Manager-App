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

// Middleware for verifying admin secret key
export const checkAdminSecret = (req: Request, res: Response, next: NextFunction) => {
    const { role, secretKey } = req.body;
  
    if (role === 'ADMIN') {
      if (!secretKey || secretKey !== process.env.ADMIN_SECRET) {
         res.status(403).json({
          success: false,
          message: 'Invalid or missing secret key for admin creation',
        });
        return;
      }
    }
  
    next();
  };

  // middleware to verify user role
  export const checkUserRole = (req: Request, res: Response, next: NextFunction) => {
    const { role } = req.body;
  
    if (role !== 'ADMIN') {
      res.status(403).json({
        success: false,
        message: 'Invalid or missing role for admin creation',
      });
      return;
    }
  
    next();
  };

