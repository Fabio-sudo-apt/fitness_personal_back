import { ICreatePatientProtocols, ICreatePatientParams, ICreatePatientResult } from "../../protocols/patient/createPatientProtocols";
import { validate } from "../../../utils/validate";
import * as Yup from "yup";
import { Gender } from "@prisma/client";

export class CreatePatientUseCase {
    constructor(private readonly patientRepository: ICreatePatientProtocols) { }

    async execute(data: ICreatePatientParams): Promise<ICreatePatientResult> {
        await validate(data, this.validateSchema());
        return await this.patientRepository.create(data);
    }

    validateSchema(): Yup.ObjectSchema<ICreatePatientParams> {
        return Yup.object({
            name: Yup.string().required("Nome é obrigatório"),
            email: Yup.string().email("Email inválido").nullable().notRequired(),
            age: Yup.number()
                .required("Idade é obrigatória")
                .positive("Idade deve ser um número positivo")
                .integer("Idade deve ser um número inteiro"),
            height: Yup.number()
                .required("Altura é obrigatória")
                .positive("Altura deve ser um número positivo"),
            weight: Yup.number()
                .required("Peso é obrigatório")
                .positive("Peso deve ser um número positivo"),
            gender: Yup.mixed<Gender | "NOT_SPECIFIED">()
                .oneOf([...Object.values(Gender), "NOT_SPECIFIED"], "Gênero inválido")
                .default("NOT_SPECIFIED"),
            doctorId: Yup.number()
                .required("ID do médico é obrigatório")
                .positive("ID do médico deve ser um número positivo")
                .integer("ID do médico deve ser um número inteiro"),
        });
    }
}