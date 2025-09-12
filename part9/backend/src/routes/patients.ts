import express from 'express'
import patientsService from '../services/patientsService'

import { toNewPatientEntry } from '../utils'

const route = express.Router()

route.get('/patients', (_req, res) => {
  res.status(200).json(patientsService.getAllPatients())
})

route.get('/patients/:id', (req, res) => {
  const { id } = req.params
  const patient = patientsService.getPatient(id)
  if (patient) {
    res.status(200).json(patient)
  } else {
    res.status(404).send(`Patient with id ${req.params.id} not found.`)
  }
})

route.post('/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body)
    const addedPatient = patientsService.addPatient(newPatientEntry)
    res.status(201).json(addedPatient)
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default route