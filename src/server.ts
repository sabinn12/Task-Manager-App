import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

prisma
  .$connect()
  .then(() => console.log('Connected to the database successfully'))
  .catch((error) => console.error('Database connection failed', error));
