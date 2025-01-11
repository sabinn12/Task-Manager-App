const { io } = require('socket.io-client');


const socket = io('http://localhost:3000', {
    transports: ['websocket'], 
});


socket.on('connect', () => {
    console.log('Connected to the Socket.IO server:', socket.id);
});

socket.on('boardCreated', (data) => {
    console.log('Received boardCreated event:', data);
});

socket.on('boardUpdated', (data) => {
    console.log('Received boardUpdated event:', data);
});
 
socket.on('boardDeleted', (data) => {
    console.log('Received boardDeleted event:', data);
});


socket.on('disconnect', () => {
    console.log('Disconnected from the server');
});
