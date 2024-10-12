import { Request, Response } from "express";
import { GetAllPatientUseCase } from "../../data/usecase/patient/getAllpatientUseCase";
import { processError } from "./error/processError";

export class GetAllPatientController {
    constructor(private getAllPatientUseCase: GetAllPatientUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const {doctorId, limit, skip} = req.body;
            const result = await this.getAllPatientUseCase.execute({doctorId, limit, skip});
            res.status(200).json(result);

        } catch (error) { 
            processError(res, error);
        }
    }
}