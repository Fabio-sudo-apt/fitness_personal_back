import { validate } from "../../../utils/validate";
import { IGetPatientParams, IGetPatientProtocols } from "../../protocols/patient/getPatientProtocols";
import * as Yup from "yup";

export class GetPatientUseCase {
    constructor(private readonly patientRepository: IGetPatientProtocols) { }

    async execute(data: IGetPatientParams) {
        await validate(data, this.validateSchema());
        return await this.patientRepository.get(data);
    }

    validateSchema(): Yup.ObjectSchema<IGetPatientParams> {
        return Yup.object().shape({
            id: Yup.number().required('doctorId é obrigatório'),
        });
    }
} 