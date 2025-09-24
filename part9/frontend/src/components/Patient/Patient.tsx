import type { PatientEntry } from '../../interfaces/interfaces'
import { Link, useMatch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPatientById } from '../../services/patients'

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
  const [patient, setPatient] = useState<PatientEntry>(emptyPatient)
  const id = match?.params.id

  useEffect(() => {
    if (id) {
      getPatientById(id)
        .then((data) => setPatient(data))
        .catch((e) => console.error(e))
    }
  }, [id])

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
      <h3>entries</h3>
      {!patient.entries.length ? (
        <p>No entries</p>
      ) : (
        patient.entries.map((entry) => (
          <div key={entry.id} style={{ border: '1px solid black', marginBottom: '10px', padding: '5px' }}>
            <p>{entry.date}</p>
            <p>{entry.description}</p>
            <p>diagnosis codes: {entry.diagnosisCodes ? entry.diagnosisCodes.join(', ') : 'N/A'}</p>
          </div>
        )
      ))}
    </div>
  );
}