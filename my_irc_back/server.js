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

let usersInRoom = []
let rooms = []
let allUsers = []

io.on('connection', (socket) => {
    console.log('Connected');
    socket.on('join-room', (data) => {
        console.log('Room joined');
        socket.join(data.room)
    })

    socket.on('send-msg', (data) => {
        console.log('send-msg : ',data);
        io.to(data.room).emit('receive-msg', data)
    })
    
    socket.on('command' ,(data) => {
        switch (data.msg) {
            case value:
                
                break;
            default:
                break;
        }
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} Disconnected`);
    })
})





server.listen(port, () => {
    console.log(`http://${host}:${port}/`)
    console.log(`Example app listening on port ${port}`)
})