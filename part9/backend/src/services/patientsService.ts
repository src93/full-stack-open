import { v4 as uuid } from 'uuid'
import data from '../data/patients';
import { NoSensitivePatientsEntry, NewPatientEntry, PatientsEntry, EntryWithoutId } from '../types/patients';

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

const addNewEntry = (id: string, entry: EntryWithoutId): EntryWithoutId | undefined => {
  const patient = getPatient(id);
  if (!patient) {
    return undefined;
  }

  const newEntry = {
    id: uuid(),
    ...entry
  };

  patient.entries.push(newEntry);
  return newEntry;
}

export default {
  getAllPatients,
  addPatient,
  getPatient,
  addNewEntry
};
