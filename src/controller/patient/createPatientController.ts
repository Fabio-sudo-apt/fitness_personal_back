import { Request, Response } from "express";
import { CreatePatientUseCase } from "../../data/usecase/patient/createPatientUseCase";
import { processError } from "./error/processError";

export class CreatePatientController {
    constructor(private createPatientUseCase: CreatePatientUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, age, height, weight, gender, doctorId } = req.body;
            const result = await this.createPatientUseCase.execute({ name, email, age, height, weight, gender, doctorId });
            res.status(201).json(result);
        } catch (error) {
            processError(res, error);
        }
    }
}