import { GenderEnum, Gender, NewPatientEntry, Entry, TypePatient } from './types/patients';

export const toNewPatientEntry = (object: unknown) => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!hasRequiredPatientFields(object)) {
    throw new Error('Incorrect data: some fields are missing');
  }
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: parseEntries(object.entries)
  };
  return newEntry;
}

export const toNewEntry = (object: unknown): Entry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (!isEntry(object)) {
    throw new Error('Incorrect data: some fields are missing or invalid');
  }

  return object;
}

const hasRequiredPatientFields = (object: object): object is {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
} => {
  return 'name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object && 'entries' in object;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
}

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
}

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
}

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
}

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
}

const parseEntries = (entries: unknown): Entry[] => {
  if (!entries || !Array.isArray(entries) || !entries.every(e => isEntry(e))) {
    throw new Error('Incorrect or missing entries');
  }

  return entries;
}

const isEntry = (entry: unknown): entry is Entry => {
  if (!isHealthCheckEntry(entry) && !isHospitalEntry(entry) && !isOccupationalHealthcareEntry(entry)) {
    throw new Error('Incorrect or missing entries');
  }

  return true;
}

const isEntryBase = (entry: unknown): entry is { id: unknown; date: unknown; specialist: unknown; description: unknown; diagnosisCodes?: unknown } => {
  return typeof entry === 'object' && entry !== null &&
    'date' in entry && 'specialist' in entry && 'description' in entry &&
    ( !('diagnosisCodes' in entry) || Array.isArray(entry.diagnosisCodes) );
}

const isHealthCheckEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && 'type' in entry && entry.type === TypePatient.HealthCheck &&
    'healthCheckRating' in entry && typeof entry.healthCheckRating === 'number';
}

const isHospitalEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && 'type' in entry && entry.type === TypePatient.Hospital &&
    'discharge' in entry && typeof entry.discharge === 'object' &&
    entry.discharge !== null && 'date' in entry.discharge && 'criteria' in entry.discharge &&
    typeof entry.discharge.date === 'string' && typeof entry.discharge.criteria === 'string';
}

const isOccupationalHealthcareEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && 'type' in entry &&
    entry.type === TypePatient.OccupationalHealthcare && 'employerName' in entry &&
      typeof entry.employerName === 'string' &&
      ( !('sickLeave' in entry) || ( typeof entry.sickLeave === 'object' && entry.sickLeave !== null && 'startDate' in entry.sickLeave && 'endDate' in entry.sickLeave && typeof entry.sickLeave.startDate === 'string' && typeof entry.sickLeave.endDate === 'string' ) );
}

const isGender = (gender: string): gender is Gender => {
  return Object.values(GenderEnum).map(g => g.toString()).includes(gender);
}

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
}

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}