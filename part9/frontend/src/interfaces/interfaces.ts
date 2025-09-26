export type Gender = 'male' | 'female' | 'other';

export type TypePatient = 'HealthCheck' | 'Hospital' | 'OccupationalHealthcare';

export type HealthCheckRating = 0 | 1 | 2 | 3;

export interface Discharge {
  date: string;
  criteria: string;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface PatientEntry {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  description: string;
  diagnosisCodes?: string[];
}

interface HealthCheckEntry extends BaseEntry {
  type: TypePatient;
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: TypePatient;
  discharge: Discharge;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: TypePatient;
  employerName: string;
  sickLeave?: SickLeave;
}

export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}