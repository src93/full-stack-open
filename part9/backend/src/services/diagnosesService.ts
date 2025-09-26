import data from '../data/diagnoses';
import { DiagnosesEntry } from '../types/diagnoses';

const getAllDiagnoses = (): DiagnosesEntry[] => {
  return data;
};

const addDiagnosis = (newDiagnosis: DiagnosesEntry): DiagnosesEntry => {
  data.push(newDiagnosis);
  return newDiagnosis;
}

export {
  getAllDiagnoses,
  addDiagnosis
};
