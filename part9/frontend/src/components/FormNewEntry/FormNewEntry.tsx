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
  const [dateDischarge, setDateDischarge] = useState('')
  const [criteria, setCriteria] = useState('')
  const [employerName, setEmployerName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const onSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry: NewEntry = newEntryForm()
    handleSubmit(newEntry)
    setDescription('')
    setDate('')
    setSpecialist('')
    setType('HealthCheck')
    setHealthCheckRating(0)
    setDiagnosisCodes([])
    setDateDischarge('')
    setCriteria('')
    setEmployerName('')
    setStartDate('')
    setEndDate('')
  }

  const newEntryForm = (): NewEntry => {
    switch (type) {
      case 'HealthCheck':
        return {
          description,
          date,
          specialist,
          type: 'HealthCheck',
          healthCheckRating,
          diagnosisCodes
        }
      case 'Hospital':
        return {
          description,
          date,
          specialist,
          type: 'Hospital',
          discharge: {
            date: dateDischarge,
            criteria
          },
          diagnosisCodes
        }
      case 'OccupationalHealthcare':
        return {
          description,
          date,
          specialist,
          type: 'OccupationalHealthcare',
          employerName,
          sickLeave: {
            startDate,
            endDate
          },
          diagnosisCodes
        }
      default:
        return assertNever(type)
    }
  }

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const healthCheckForm = () => (
    <>
      <input
        type='text'
        value={healthCheckRating}
        onChange={({ target }) => setHealthCheckRating(Number(target.value) as HealthCheckRating)}
        placeholder='healthCheck Rating'
      />
      <br />
    </>
  )

  const hospitalForm = () => (
    <>
      <input
        type='date'
        value={dateDischarge}
        onChange={({ target }) => setDateDischarge(target.value)}
        placeholder='date discharge'
      />
      <br />
      <input
        type='text'
        value={criteria}
        onChange={({ target }) => setCriteria(target.value)}
        placeholder='criteria'
      />
      <br />
    </>
  )

  const occupationalHealthcareForm = () => (
    <>
      <input
        type='text'
        value={employerName}
        onChange={({ target }) => setEmployerName(target.value)}
        placeholder='employer Name'
      />
      <br />
      <input
        type='date'
        value={startDate}
        onChange={({ target }) => setStartDate(target.value)}
        placeholder='start Date'
      />
      <br />
      <input
        type='date'
        value={endDate}
        onChange={({ target }) => setEndDate(target.value)}
        placeholder='end Date'
      />
      <br />
    </>
  )

  return (
    <>
      <form onSubmit={onSubmit}>
        <h3>New HealthCheck entry</h3>
        <select value={type} onChange={({ target }) => setType(target.value as TypePatient)}>
          <option value='HealthCheck'>HealthCheck</option>
          <option value='Hospital'>Hospital</option>
          <option value='OccupationalHealthcare'>OccupationalHealthcare</option>
        </select>
        <br />
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
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(','))}
          placeholder='diagnosis Codes'
        />
        <br />
        {type === 'HealthCheck' && healthCheckForm()}
        {type === 'Hospital' && hospitalForm()}
        {type === 'OccupationalHealthcare' && occupationalHealthcareForm()}
        <button type='submit'>Add</button>
      </form>
    </>
  )
}