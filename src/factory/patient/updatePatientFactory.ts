import { PatientRepository } from "../../repositorys/PatientRepository";
import { UpdateParticipantUseCase } from "../../data/usecase/patient/updatePatientUseCase";
import { UpdatePatientController } from "../../controller/patient/updatePatientController";

const updatePatientFactory = () => {
    const patientRepository = new PatientRepository();
    const updatePatientUseCase = new UpdateParticipantUseCase(patientRepository);
    return new UpdatePatientController(updatePatientUseCase)
};

export default updatePatientFactory();