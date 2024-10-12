import { Request, Response } from "express";
import { processError } from "./error/processError";
import { GetPatientUseCase } from "../../data/usecase/patient/getPatientUseCase";

export class GetPatientController {
    constructor(private readonly getPatientUseCase: GetPatientUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const result = await this.getPatientUseCase.execute({ id: parseInt(id) });
            res.status(200).json(result);
        } catch (error) {
            processError(res, error);
        }
    }
}