import express from 'express';

const route = express.Router();

route.get('/', (_req, res) => {
  res.send('patients');
})

export default route;