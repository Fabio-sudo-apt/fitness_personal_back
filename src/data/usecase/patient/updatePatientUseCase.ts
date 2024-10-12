import { validate } from "../../../utils/validate";
import * as Yup from "yup";
import { Gender, ProfileRole } from "@prisma/client";
import { IUpdatePatientParams, IUpdatePatientProtocols, IUpdatePatientResult } from "../../protocols/patient/updatePatientProtocols";


export class UpdateParticipantUseCase {
    constructor(private readonly participantRepository: IUpdatePatientProtocols) { }

    async execute(data: IUpdatePatientParams): Promise<IUpdatePatientResult> {
        await validate(data, this.validateSchema());
        return await this.participantRepository.update(data);
    }

    validateSchema(): Yup.ObjectSchema<IUpdatePatientParams> {
        return Yup.object({
            id: Yup.number().required("ID é obrigatório"),
            name: Yup.string().nullable().optional(), // Permite null e undefined
            email: Yup.string().email("Email inválido").nullable().optional(), // Permite null e undefined
            age: Yup.number().integer("Idade deve ser um número inteiro").optional(),
            height: Yup.number().positive("Altura deve ser um número positivo").optional(),
            weight: Yup.number().positive("Peso deve ser um número positivo").optional(),
            gender: Yup.mixed<Gender>().optional(),
            profileRole: Yup.mixed<ProfileRole>().optional(),
            levelActivity: Yup.boolean().optional(),
        });
    }
    
    
}