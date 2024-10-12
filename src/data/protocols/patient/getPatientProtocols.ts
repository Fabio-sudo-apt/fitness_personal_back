import { Patient } from "@prisma/client"

export interface IGetPatientParams {
    id: number,
}

export interface IGetPatientResult {
    patient?: Patient | null
}


export interface IGetPatientProtocols {
    get(data: IGetPatientParams): Promise<IGetPatientResult>
}