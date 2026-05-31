import express from 'express';
import cors from 'cors';
import { getSessions, createSession } from './controllers/studyController';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/sessions', getSessions);
app.post('/api/sessions', createSession);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Serwer działa na porcie http://localhost:${PORT}`);
  });
}

export default app;