const app = require("./app")
const http = require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
    cors:{
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    },
});

const port =  8000
const host = "localhost"

io.on('connection', (socket) => {
    // console.log(`User ${socket.id} connected`);
    socket.on('join-room', (data) => {
        socket.emit(data.room);
    })
    socket.on('disconnect', () => {
        // console.log(`User ${socket.id} disconnected`);
    })
})





server.listen(port, () => {
    console.log(`http://${host}:${port}/`)
    console.log(`Example app listening on port ${port}`)
})