import express from 'express';
import { calculateImc } from '../calculateImc';

const router = express.Router();

router.get('/imc', (req, res) => {
  const { weight, height } = req.query;

  if (!weight || !height) {
    return res.status(400).send('Weight and height are required');
  }

  const weightParsed = Number(weight);
  const heightParsed = Number(height);

  if (isNaN(weightParsed) || isNaN(heightParsed)) {
    return res.status(400).send('malformatted parameters');
  }

  const imcCategory = calculateImc(heightParsed, weightParsed);
  return res.status(200).json({
    weightParsed,
    heightParsed,
    imc: imcCategory
  })
});

export default router;