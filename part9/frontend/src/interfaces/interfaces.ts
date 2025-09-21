export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Entry {}

export type Gender = 'male' | 'female' | 'other';