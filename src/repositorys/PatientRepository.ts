import dbConnect from "../config/dbConnect";
import { ICreatePatientParams, ICreatePatientProtocols, ICreatePatientResult } from "../data/protocols/patient/createPatientProtocols";
import { IDeletePatientParams, IDeletePatientProtocols } from "../data/protocols/patient/deletePatientProtocols";
import { IGetAllParams, IGetAllPatientResult, IGetAllPatientProtocols } from "../data/protocols/patient/getAllPatientProtocols";
import { IGetPatientParams, IGetPatientProtocols, IGetPatientResult } from "../data/protocols/patient/getPatientProtocols";
import { IUpdatePatientParams, IUpdatePatientProtocols, IUpdatePatientResult } from "../data/protocols/patient/updatePatientProtocols";
import NotFoundException from "../errors/notFoundException";
import { createToken } from "../utils/createToken";

export class PatientRepository implements IGetAllPatientProtocols, ICreatePatientProtocols, IDeletePatientProtocols, IGetPatientProtocols, IUpdatePatientProtocols {
    private prisma: typeof dbConnect;

    constructor() {
        this.prisma = dbConnect;
    }
    
    async update(params: IUpdatePatientParams): Promise<IUpdatePatientResult>{
        const existingPatient = await this.get({ id: params.id });
        
        if (!existingPatient.patient) {
            throw new NotFoundException("Paciente não encontrado");
        }

        const updatedData = {
            name: params.name ?? existingPatient.patient.name,
            email: params.email ?? existingPatient.patient.email,
            age: params.age ?? existingPatient.patient.age,
            height: params.height ?? existingPatient.patient.height,
            weight: params.weight ?? existingPatient.patient.weight,
            gender: params.gender ?? existingPatient.patient.gender,
            profileRole: params.profileRole ?? existingPatient.patient.profileRole,
            levelActivity: params.levelActivity ?? existingPatient.patient.levelActivity,
            token: existingPatient.patient.token,
        };

        const patient = await this.prisma.getPrisma().patient.update({
            where: {
                id: params.id
            },
            data: updatedData
        });
   

        return { patient };
    };

    async get(params: IGetPatientParams): Promise<IGetPatientResult> {
        const patient = await this.prisma.getPrisma().patient.findUnique({
            where: {
                id: params.id
            }
        });
        if (!patient) {
            throw new NotFoundException("Paciente não encontrado");
        }
        return { patient };
    }

    async delete(params: IDeletePatientParams): Promise<void> {
        const existsPatient = await this.get({ id: params.id });
        if (!existsPatient.patient) {
            throw new NotFoundException("Paciente não encontrado");
        }
        await this.prisma.getPrisma().patient.delete({
            where: {
                id: params.id
            }
        });
    };

    async create(params: ICreatePatientParams): Promise<ICreatePatientResult> {
        const token = createToken(params.name);
        const patient = await this.prisma.getPrisma().patient.create({
            data: {
                name: params.name,
                email: params.email,
                age: params.age,
                height: params.height,
                weight: params.weight,
                gender: params.gender,
                token: token,
                doctorId: params.doctorId,
            }
        });
        return { patient };
    };

    async getAll(params: IGetAllParams): Promise<IGetAllPatientResult> {
        const doctor = await this.prisma.getPrisma().doctor.findUnique({
            where: {
                id: params.doctorId
            },
            include: {
                patients: {
                    take: params.limit,
                    skip: params.skip
                }
            }
        });

        if (!doctor?.patients) {
            throw new NotFoundException("Pacientes não encontrados");
        }

        return { patients: doctor.patients };
    }
}