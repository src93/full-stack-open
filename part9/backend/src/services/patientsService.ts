import { v4 as uuid } from 'uuid'
import data from '../data/patients';
import { NoSensitivePatientsEntry, NewPatientEntry, PatientsEntry } from '../types/patients';

const getAllPatients = (): NoSensitivePatientsEntry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return data.map(({ ssn, ...rest }) => rest);
}

const addPatient = (patient: NewPatientEntry): NoSensitivePatientsEntry => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };
  data.push(newPatient);
  return newPatient;
}

const getPatient = (id: string): PatientsEntry | undefined => {
  return data.find(p => p.id === id);
}

export default {
  getAllPatients,
  addPatient,
  getPatient
};
