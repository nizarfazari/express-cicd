import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../errors/error-response";
import Joi from "joi";

export const errorMiddleware = async (error: Error, req: Request, res: Response, next: NextFunction ) => {
    console.log(error, "middleware")
    if (error instanceof Joi.ValidationError) {
        res.status(400).json({
          errors: error.details.map(detail => detail.message)
        });
      } 
    else if(error instanceof ErrorResponse) {
        res.status(error.status).json({
            errors: error.message
        });
    }else{
        res.status(500).json({
            errors: error.message
        });
    }
}