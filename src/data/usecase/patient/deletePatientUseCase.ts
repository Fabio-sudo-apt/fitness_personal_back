import { validate } from "../../../utils/validate";
import { IDeletePatientParams, IDeletePatientProtocols } from "../../protocols/patient/deletePatientProtocols";
import * as Yup from "yup";

export class DeletePatientUseCase {
    constructor(private readonly patientRepository: IDeletePatientProtocols) { }

    async execute(data: { id: number }): Promise<void> {
        await validate(data, this.validateSchema());
        await this.patientRepository.delete(data);
    }

    validateSchema(): Yup.ObjectSchema<IDeletePatientParams> {
        return Yup.object({
            id: Yup.number()
                .required("ID é obrigatório")
                .positive("ID deve ser um número positivo")
                .integer("ID deve ser um número inteiro"),
        });
    }
}