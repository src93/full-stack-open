import express from 'express';
import cors from 'cors';
import diagnosesRoute from './routes/diagnoses';

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cors());
app.use('/api', diagnosesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});