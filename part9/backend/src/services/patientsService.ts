import { v4 as uuid } from 'uuid'
import data from '../data/patients';
import { NoSensitivePatientsEntry, NewPatientEntry } from '../../types/patients';

const getAllPatients = (): NoSensitivePatientsEntry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return data.map(({ ssn, ...rest }) => rest);
};

const addPatient = (patient: NewPatientEntry): NoSensitivePatientsEntry => {
  const id = uuid();
  const newPatient = {
    id,
    ...patient
  };
  data.push(newPatient);
  return newPatient;
}

export default {
  getAllPatients,
  addPatient,
};
