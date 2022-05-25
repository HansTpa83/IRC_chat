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

    socket.on('join-room', (data) => {
        console.log(`${socket.id} room: ${data}`);
        socket.join(data);
    })
    
    socket.on('send-msg', (data) => {
        console.log('send-msg : ',data);
        socket.to(data.room).emit('receive-msg', data)
    })
    
    socket.on('disconnect', () => {
        console.log(`Disconnected`);
    })
})





server.listen(port, () => {
    console.log(`http://${host}:${port}/`)
    console.log(`Example app listening on port ${port}`)
})