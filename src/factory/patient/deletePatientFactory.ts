import {PatientRepository} from "../../repositorys/PatientRepository";
import {DeletePatientUseCase} from "../../data/usecase/patient/deletePatientUseCase";
import {DeletePatientController} from "../../controller/patient/deletePatientController";

const deletePatientFactory = () => {
    const patientRepository = new PatientRepository();
    const deletePatientUseCase = new DeletePatientUseCase(patientRepository);
    return new DeletePatientController(deletePatientUseCase);
}

export default deletePatientFactory();