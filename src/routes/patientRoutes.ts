import { Router } from "express";
import getAllPatientFactory from "../factory/patient/getAllPatientFactory";
import createPatientFactory from "../factory/patient/createPatientFactory";
import deletePatientFactory from "../factory/patient/deletePatientFactory";
import getPatientFactory from "../factory/patient/getPatientFactory";
import updatePatientFactory from "../factory/patient/updatePatientFactory";

const patient = Router();

patient.get("/patients", async (req, res) => await getAllPatientFactory.handle(req, res));

patient.get("/patient/:id", async (req, res) => await getPatientFactory.handle(req, res));

patient.post("/patient", async (req, res) => await createPatientFactory.handle(req, res));

patient.put("/patient", async (req, res) => await updatePatientFactory.handle(req, res));

patient.delete("/patient/:id", async (req, res) => await deletePatientFactory.handle(req, res));

export default patient;