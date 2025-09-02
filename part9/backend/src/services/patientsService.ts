import data from '../data/patients';
import { NoSensitivePatientsEntry } from '../../types/patients';

const getAllPatients = (): NoSensitivePatientsEntry[] => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return data.map(({ ssn, ...rest }) => rest);
};

export default {
  getAllPatients,
};
