import { GetPatientUseCase } from "../../data/usecase/patient/getPatientUseCase";
import { GetPatientController } from "../../controller/patient/getPatientController";
import { PatientRepository } from "../../repositorys/PatientRepository";

const getPatientFactory = () => {
    const patientRepository = new PatientRepository();
    const getPatientUseCase = new GetPatientUseCase(patientRepository);
    return new GetPatientController(getPatientUseCase);
};

export default getPatientFactory();