import { validate } from "../../../utils/validate";
import { IGetAllParams, IGetAllPatientProtocols, IGetAllPatientResult } from "../../protocols/patient/getAllPatientProtocols";
import * as Yup from "yup";

export class GetAllPatientUseCase {
  constructor(private readonly patientRepository: IGetAllPatientProtocols) { }

  async execute(data: IGetAllParams): Promise<IGetAllPatientResult> {
    await validate(data, this.validateSchema());
    return await this.patientRepository.getAll(data);
  }

  validateSchema(): Yup.ObjectSchema<IGetAllParams> {
    return Yup.object().shape({
      doctorId: Yup.number().required('doctorId é obrigatório'),
      limit: Yup.number().optional(),
      skip: Yup.number().optional(),
    });
  }
}