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
      <h2>{patient.name}</h2>
      <p>occupation: {patient.occupation}</p>
      <p>gender: {patient.gender}</p>
      <p>date of birth: {patient.dateOfBirth}</p>
      <Link to={'/'}>Home</Link>
    </div>
  );
}