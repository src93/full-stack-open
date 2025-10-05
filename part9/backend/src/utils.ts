import { GenderEnum, Gender, NewPatientEntry, Entry, TypePatient, HealthCheckRating } from './types/patients';

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

  if (!parseEntry(object)) {
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
  if (!entries || !Array.isArray(entries) || !entries.every(e => parseEntry(e))) {
    throw new Error('Incorrect or missing entries');
  }

  return entries;
}

const parseEntry = (entry: unknown): entry is Entry => {
  if (!parseHealthCheckEntry(entry) && !parseHospitalEntry(entry) && !parseOccupationalHealthcareEntry(entry)) {
    throw new Error('Incorrect or missing entries');
  }

  return true;
}

const isEntryBase = (entry: unknown): entry is { id: unknown; date: unknown; specialist: unknown; description: unknown; diagnosisCodes?: unknown } => {
  return typeof entry === 'object' && entry !== null &&
    isDateEntry(entry) && isSpecialist(entry) && isDescription(entry) &&
    isDiagnosisCodes(entry);
}

const isDateEntry = (entry: object): boolean => {
  return 'date' in entry && isString(entry.date) && isDate(entry.date);
}

const isSpecialist = (entry: object): boolean => {
  return 'specialist' in entry && isString(entry.specialist) && entry.specialist !== '';
}

const isDescription = (entry: object): boolean => {
  return 'description' in entry && isString(entry.description) && entry.description !== '';
}

const isDiagnosisCodes = (entry: object): boolean => {
  return 'diagnosisCodes' in entry && Array.isArray(entry.diagnosisCodes);
}

const parseHealthCheckEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && isHealCheckType(entry) && ishealthCheckRating(entry);
}

const isHealCheckType = (entry: object): boolean => {
  return 'type' in entry && entry.type === TypePatient.HealthCheck;
}

const ishealthCheckRating = (entry: object): boolean => {
  return 'healthCheckRating' in entry && typeof entry.healthCheckRating === 'number' && Object.values(HealthCheckRating).map(t => t as number).includes(entry.healthCheckRating);
}

const parseHospitalEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && isHospitalType(entry) &&
    'discharge' in entry && typeof entry.discharge === 'object' && isDischarge(entry);
}

const isHospitalType = (entry: object): boolean => {
  return 'type' in entry && entry.type === TypePatient.Hospital;
}

const isDischarge = (entry: object): boolean => {
  return 'discharge' in entry && typeof entry.discharge === 'object' &&
    entry.discharge !== null && isDateEntry(entry.discharge) && isCriteria(entry.discharge);
}

const isCriteria = (discharge: object): boolean => {
  return 'criteria' in discharge && isString(discharge.criteria) && discharge.criteria !== '';
}

const parseOccupationalHealthcareEntry = (entry: unknown): entry is Entry => {
  return isEntryBase(entry) && isOccupationalHealthcareType(entry) && isEmployerName(entry) &&
      isSickLeave(entry);
}

const isOccupationalHealthcareType = (entry: object): boolean => {
  return 'type' in entry && entry.type === TypePatient.OccupationalHealthcare;
}

const isEmployerName = (entry: object): boolean => {
  return 'employerName' in entry && isString(entry.employerName) && entry.employerName !== '';
}

const isSickLeave = (entry: object): boolean => {
  return 'sickLeave' in entry && typeof entry.sickLeave === 'object' &&
    entry.sickLeave !== null && 'startDate' in entry.sickLeave && 'endDate' in entry.sickLeave &&
    isString(entry.sickLeave.startDate) && isString(entry.sickLeave.endDate) &&
    isDate(entry.sickLeave.startDate) && isDate(entry.sickLeave.endDate);
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