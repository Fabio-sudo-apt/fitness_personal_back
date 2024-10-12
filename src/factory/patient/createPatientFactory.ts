import { CreatePatientController } from "../../controller/patient/createPatientController";
import { CreatePatientUseCase } from "../../data/usecase/patient/createPatientUseCase";
import { PatientRepository } from "../../repositorys/PatientRepository";

const createPatientFactory = () => {
    const patientRepository = new PatientRepository();
    const createPatientUseCase = new CreatePatientUseCase(patientRepository);
    return new CreatePatientController(createPatientUseCase);
    
};


export default createPatientFactory();