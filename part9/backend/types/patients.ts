export type Gender = 'male' | 'female' | 'other';

export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NoSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;

export type NewPatientEntry = Omit<PatientsEntry, 'id'>;
