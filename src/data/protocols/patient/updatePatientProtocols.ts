import { Patient, Gender, ProfileRole } from "@prisma/client";

export interface IUpdatePatientParams {
    id: number;
    name?: string | null; // Permite undefined ou null
    email?: string | null; // Permite undefined ou null
    age?: number; // Permite undefined
    height?: number; // Permite undefined
    weight?: number; // Permite undefined
    gender?: Gender; // Permite undefined
    profileRole?: ProfileRole; // Permite undefined
    levelActivity?: boolean; // Permite undefined
}

export interface IUpdatePatientResult {
    patient: Patient
}

export interface IUpdatePatientProtocols {
    update(data: IUpdatePatientParams): Promise<IUpdatePatientResult>
}