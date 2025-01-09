import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Extend the Request type to include user details
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Middleware to authenticate user and extract token details
export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
     res.status(401).json({ success: false, message: 'No token provided' });
     return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === 'object' && 'id' in decoded && 'email' in decoded && 'role' in decoded) {
      req.user = {
        id: decoded.id as string,
        email: decoded.email as string,
        role: decoded.role as string,
      };
      next();
    } else {
       res.status(403).json({ success: false, message: 'Invalid token structure' });
       return;
    }
  } catch (error) {
     res.status(403).json({ success: false, message: 'Invalid token' });
     return;
  }
};

// Middleware to verify admin secret key
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

// Middleware to verify user role
export const checkUserRole = (requiredRole: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
       res.status(401).json({ success: false, message: 'Unauthorized access' });
        return;
    }
    

    if (req.user.role !== requiredRole) {
       res.status(403).json({
        success: false,
        message: `Access denied. ${requiredRole} role is required.`,

      });
      return;
    }

    next();
  };
};
