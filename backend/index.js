const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
require('colors')
const server = http.createServer(app);
const cors = require('cors');
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods:["POST","GET"],
    }
})

io.on("connection", (socket) => {
    console.log(`User connected on host:${socket.id.cyan}`);
    socket.on('send_message', (data) => {
        socket.broadcast.emit("received_message", data);
    })
})

server.listen(3001,()=>console.log('Server started on port 3001'))