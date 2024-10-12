export interface IDeletePatientParams {
    id: number
}

export interface IDeletePatientProtocols {
    delete: (data: IDeletePatientParams) => Promise<void>
}