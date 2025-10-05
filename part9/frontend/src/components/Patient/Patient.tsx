import type { PatientEntry, DiagnosesEntry, Entry, NewEntry } from '../../interfaces/interfaces'
import { Link, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPatientById } from '../../services/patients'
import { getAllDiagnoses } from '../../services/diagnoses'

import { HealthCheck } from '../HealthCheck/HealthCheck'
import { Hospital } from '../Hospital/Hospital'
import { OcupationalHealthcare } from '../OccupationalHealthcare/OccupationalHealthcare'

import { FormNewEntry } from '../FormNewEntry/FormNewEntry'

import axios from 'axios'

import { addEntry } from '../../services/entries'

const emptyPatient: PatientEntry = {
  id: '',
  name: '',
  dateOfBirth: '',
  occupation: '',
  gender: 'other',
  ssn: '',
  entries: []
}

export const Patient = () => {
  const match = useMatch('/patient/:id')
  const [diagnoses, setDiagnoses] = useState<DiagnosesEntry[]>([])
  const [patient, setPatient] = useState<PatientEntry>(emptyPatient)
  const [error, setError] = useState<string>('')
  const id = match?.params.id
  const descriptionDiagnsis = (code: string): string => {
    const diagnosis = diagnoses.find(d => d.code === code)
    return diagnosis ? diagnosis.name : 'Unknown diagnosis'
  }
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const EntryDetails = (entry: Entry) => {
    switch (entry.type) {
      case 'HealthCheck':
        return <HealthCheck entry={entry} />
      case 'Hospital':
        return <Hospital entry={entry} />
      case 'OccupationalHealthcare':
        return <OcupationalHealthcare entry={entry} />
      default:
        return assertNever(entry)
    }
  }

  useEffect(() => {
    if (id) {
      getPatientById(id)
        .then((data) => setPatient(data))
        .catch((e) => console.error(e))
      getAllDiagnoses()
      .then((data) => setDiagnoses(data))
      .catch((e) => console.error(e))
    }
  }, [id])

  const handleSubmit = async (newEntry: NewEntry) => {
    try {
      const entryAdded: Entry = await addEntry(patient.id, newEntry)
      setPatient({...patient, entries: patient.entries.concat(entryAdded)})
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error?.response?.data && typeof error?.response?.data === 'string') {
          const message = error.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
          setTimeout(() => {
            setError('');
          }, 5000);
        } else {
          setError('Unrecognized axios error');
          setTimeout(() => {
            setError('');
          }, 5000);
        }
      } else {
        setError('Unknown error');
        setTimeout(() => {
          setError('');
        }, 5000);
      }
    }
  }

  if (patient.id === '') {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Patientor</h1>
      <Link to={'/'}>Home</Link>
      <h2>{patient.name}</h2>
      <p>occupation: {patient.occupation}</p>
      <p>gender: {patient.gender}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <FormNewEntry handleSubmit={handleSubmit} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <h3>entries</h3>
      {!patient.entries.length ? (
        <p>No entries</p>
      ) : (
        patient.entries.map((entry) => (
          <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '5px' }}>
            {EntryDetails(entry)}
            <ul>
              {entry.diagnosisCodes?.map(code => (
                <li key={code}>{code}: {descriptionDiagnsis(code)}</li>
              ))}
            </ul>
          </div>
        )
      ))}
    </div>
  );
}