import data from '../data/diagnoses';
import { DiagnosesEntry } from '../types/diagnoses';

const getAllDiagnoses = (): DiagnosesEntry[] => {
  return data;
};

export {
  getAllDiagnoses
};
