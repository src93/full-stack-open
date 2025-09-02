import express from 'express';
import patientsService from '../services/patientsService';

const route = express.Router();

route.get('/patients', (_req, res) => {
  res.status(200).json(patientsService.getAllPatients());
})

export default route;