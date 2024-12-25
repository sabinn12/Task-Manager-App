import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';

let io: Server | null = null;

export const initializeSocket = (server: HTTPServer) => {
    io = new Server(server, {
        cors: {
            origin: '*', // Adjust to your frontend's URL in production
        },
    });

    io.on('connection', (socket) => {
        console.log('A user connected:', socket.id);

        socket.on('disconnect', () => {
            console.log('A user disconnected:', socket.id);
        });
    });
};

export const getSocketInstance = () => {
    if (!io) {
        throw new Error('Socket.io has not been initialized.');
    }
    return io;
};
