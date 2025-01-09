const { io } = require('socket.io-client');

// Replace 'http://localhost:3000' with your server's URL if deployed
const socket = io('http://localhost:3000', {
    transports: ['websocket'], // Ensure WebSocket is used
});


socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id);
});

socket.on('boardCreated', (data) => {
    console.log('Received boardCreated event:', data);
});
 
socket.on('boardDeleted', (data) => {
    console.log('Received boardDeleted event:', data);
});

socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
