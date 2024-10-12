import { Patient, Gender } from "@prisma/client";

export interface ICreatePatientParams {
    name: string,
    email?: string | null | undefined,
    age: number,
    height: number,
    weight: number,
    gender: Gender | "NOT_SPECIFIED",
    doctorId: number,
}

export interface ICreatePatientResult {
    patient: Patient
}


export interface ICreatePatientProtocols {
    create: (params: ICreatePatientParams) => Promise<ICreatePatientResult>
}