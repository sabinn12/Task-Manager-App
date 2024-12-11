import { NextFunction, Request, Response } from 'express';

// Validate request middleware
export const validateRequest = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err: any) => err.message);
       res.status(400).json({ success: false, errors });
       return;
    }
    next();
  };
};
