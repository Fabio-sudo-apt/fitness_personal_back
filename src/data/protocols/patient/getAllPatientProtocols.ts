import { Patient } from "@prisma/client";

export interface IGetAllParams {
    doctorId: number;
    limit: number | undefined;
    skip: number | undefined;
}

export interface IGetAllPatientResult {
    patients?: Patient[];
}

export interface IGetAllPatientProtocols {
    getAll(data: IGetAllParams): Promise<IGetAllPatientResult>
}