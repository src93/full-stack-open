import express from 'express';
import { getAllDiagnoses } from '../services/diagnosesService';
const route = express.Router();

route.get('/diagnoses', (_req, res) => {
  res.status(200).json(getAllDiagnoses());
})

export default route;