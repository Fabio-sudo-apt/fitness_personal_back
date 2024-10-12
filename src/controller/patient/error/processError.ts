import { ValidationError } from "yup";
import { Response } from 'express';
import { getError } from "../../../utils/getError";
import NotFoundException from "../../../errors/notFoundException";


export function processError(res: Response, error: unknown): void {
    if (error instanceof ValidationError) {
        res.status(400).json({
            errors: error.errors,
        });

    } else if (error instanceof NotFoundException) {
        res.status(404).json({
            message: error.message,
        });
        
    } else {
        res.status(500).json({
            message: getError(error),
        });
    }
}