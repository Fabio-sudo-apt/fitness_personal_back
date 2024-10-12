import { GetAllPatientController } from "../../controller/patient/getAllPatientController";
import { GetAllPatientUseCase } from "../../data/usecase/patient/getAllpatientUseCase"
import { PatientRepository } from "../../repositorys/PatientRepository";

const getAllPatientFactory = () => {
    const getAllPatientRepository = new PatientRepository();
    const getAllPatientUseCase = new GetAllPatientUseCase(getAllPatientRepository);
    return new GetAllPatientController(getAllPatientUseCase);

};

export default getAllPatientFactory();