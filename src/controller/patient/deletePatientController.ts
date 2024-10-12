import { Request, Response } from "express";
import { DeletePatientUseCase } from "../../data/usecase/patient/deletePatientUseCase";
import { processError } from "./error/processError";

export class DeletePatientController {
    constructor(private readonly deletePatientUseCase: DeletePatientUseCase) { }

    async handle(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await this.deletePatientUseCase.execute({ id: parseInt(id) });
            res.status(200).json({ deleted: "ok" });
        } catch (error) {
            processError(res, error);
        }
    }
}