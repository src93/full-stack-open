import express from 'express';
import { calculateExercises } from '../calculateExercises';

const router = express.Router();

router.post('/exercises', (request, response) => {
  const { dailyExercises, target } = request.body;
  if (!dailyExercises || !target) {
    return response.status(400).json({ error: 'parameters missing' });
  }
  if (!Array.isArray(dailyExercises) || isNaN(Number(target)) || !dailyExercises.every(day => typeof day === 'number')) {
    return response.status(400).json({ error: 'malformatted parameters' });
  }
  return response.status(200).json(calculateExercises(dailyExercises, target));
})

export default router;
