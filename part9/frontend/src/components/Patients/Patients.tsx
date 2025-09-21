import { useState, useEffect } from 'react'
import { getAllPatients } from '../../services/patients'
import type { PatientEntry } from '../../interfaces/interfaces'

import { ItemPatient } from '../ItemPatient/ItemPatient'

export const Patients = () => {
  const [patients, setPatients] = useState<PatientEntry[]>([])

  useEffect(() => {
    getAllPatients()
      .then((data) => setPatients(data))
      .catch((e) => console.error(e))
  }, [])

  return (
    <div>
      <h2>Patients</h2>
      {patients.map((p) => (
        <ItemPatient key={p.id} name={p.name} occupation={p.occupation} id={p.id} />
      ))}
    </div>
  )
}