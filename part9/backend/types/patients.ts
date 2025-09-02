type Gender = 'male' | 'female' | 'other';

export interface PatientsEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NoSensitivePatientsEntry = Omit<PatientsEntry, 'ssn'>;
