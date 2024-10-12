import { Request, Response } from "express";
import { processError } from "./error/processError";
import { UpdateParticipantUseCase } from "../../data/usecase/patient/updatePatientUseCase";

export class UpdatePatientController {
    constructor(private readonly updatePatientUseCase: UpdateParticipantUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const patientUpdate = req.body;
            const result = await this.updatePatientUseCase.execute(patientUpdate);
            res.status(200).json(result);
        } catch (error) {
            processError(res, error);
        }
    }
}