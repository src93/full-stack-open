import { app } from './server';
import helloWorldRouter from './controller/helloWorld';
import calculateImcRouter from './controller/calculateImc';
const PORT = 3003;

app.use('/', helloWorldRouter);
app.use('/', calculateImcRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
