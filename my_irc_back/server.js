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
        console.log('Room joined ', data.room)
        socket.join(data.room);
        // io.to(data.room).emit(data.username + ' join the room !');
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
        console.log(`Disconnected`);
    })
})





server.listen(port, () => {
    console.log(`http://${host}:${port}/`)
    console.log(`Example app listening on port ${port}`)
})