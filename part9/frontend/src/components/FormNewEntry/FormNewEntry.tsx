import { useState } from 'react'
import type { NewEntry, HealthCheckRating, TypePatient } from '../../interfaces/interfaces'

interface Props {
  handleSubmit: (newEntry: NewEntry) => void
}

export const FormNewEntry = ({ handleSubmit }: Props) => {
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [type, setType] = useState<TypePatient>('HealthCheck')
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([])

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
      const newEntry: NewEntry = {
        description,
        date,
        specialist,
        type: 'HealthCheck',
        healthCheckRating,
        diagnosisCodes
      }
      handleSubmit(newEntry)
      setDescription('')
      setDate('')
      setSpecialist('')
      setType('HealthCheck')
      setHealthCheckRating(0)
      setDiagnosisCodes([])
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>New HealthCheck entry</h3>
        <input
          type='text'
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          placeholder='description'
        />
        <br />
        <input
          type='date'
          value={date}
          onChange={({ target }) => setDate(target.value)}
          placeholder='date'
        />
        <br />
        <input
          type='text'
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          placeholder='specialist'
        />
        <br />
        <input
          type='text'
          value={healthCheckRating}
          onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
          placeholder='healthCheck Rating'
        />
        <br />
        <input
          type='text'
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
          placeholder='diagnosis Codes'
        />
        <br />
        <button type='submit'>Add</button>
      </form>
    </>
  )
}