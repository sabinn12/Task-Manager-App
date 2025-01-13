import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';

export const validateRequest = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error, value } = schema.validate(req.body, { 
            abortEarly: false,
            allowUnknown: true // This allows fields not in the schema
        });

        if (error) {
            const errors = error.details.map((err) => err.message);
            res.status(400).json({ success: false, errors });
            return;
        }

        // Replace req.body with validated value
        req.body = value;
        next();
    };
};