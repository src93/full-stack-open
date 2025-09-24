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
  return typeof entry === 'object' && entry !== null && 'type' in entry && isString(entry.type) && isEntryType(entry.type);
}

const isEntryType = (type: string): type is TypePatient => {
  return Object.values(TypePatient).map(t => t.toString()).includes(type);
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