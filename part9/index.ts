import { app } from './server'
import helloWorldRouter from './controller/helloWorld'
const PORT = 3003

app.use('/', helloWorldRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
