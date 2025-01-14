import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import prisma from './config/db';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';
import boardRoutes from './routes/boardRoutes';
import { initializeSocket } from './config/socket';
import http from 'http';
import swaggerdocs from './docs/swagger';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger documentation
app.use('/api-docs', swaggerdocs);

// users routes
app.use('/api/users', userRoutes);

// task routes
app.use('/api/tasks',  taskRoutes);

// board routes
app.use('/api/boards', boardRoutes);

// Create HTTP server and attach Socket.IO
const server = http.createServer(app);
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API documentation available at http://localhost:${PORT}/api-docs`);
});

prisma
  .$connect()
  .then(() => console.log('Connected to the database successfully'))
  .catch((error) => console.error('Database connection failed', error));