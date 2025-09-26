import express from 'express';
import { getAllDiagnoses, addDiagnosis } from '../services/diagnosesService';
const route = express.Router();

route.get('/diagnoses', (_req, res) => {
  res.status(200).json(getAllDiagnoses());
})

route.post('/diagnoses', (req, res) => {
  try {
    const { body: newDiagnosis } = req;
    const addedDiagnosis = addDiagnosis(newDiagnosis);
    res.status(201).json(addedDiagnosis);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    res.status(400).send(errorMessage)
  }
})

export default route;