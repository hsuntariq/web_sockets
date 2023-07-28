const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const server = http.createServer(app);
require('colors')
const { Server } = require('socket.io');
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods:['GET','POST'],
    }
})

// listen to the request from the frontend

io.on("connection", (socket) => {
    console.log(`User connected on host:${socket.id.cyan}`)

    socket.on("send_message", (data) => {
        socket.broadcast.emit("received_message", data);
    })
})





server.listen(3001, () => console.log('server started on port 3001'));