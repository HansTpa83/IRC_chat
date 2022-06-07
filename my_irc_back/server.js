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

let usersInRoom = {}
let allRooms = []
let allUsers = []

io.on('connection', (socket) => {
    // JOIN ROOM
    io.emit('new-user-server', allUsers)
    io.emit('update-room', allRooms)

    socket.on('join-room', (data) => {
        if(data.username !== null && data.username !== ''){
            if (!usersInRoom[data.room]){
                allRooms.push(data.room)
                usersInRoom[data.room] = []
                const msgCreateRoom = {
                    username: 'Server',
                    msg: 'Room '+data.room+' has been created',
                }
                io.emit('receive-msg', msgCreateRoom)
            }
            if (!usersInRoom[data.room].includes(data.username)){
                usersInRoom[data.room].push(data.username)
            }
            io.emit('new-user-room', usersInRoom[data.room])
        } 
        
        socket.join(data.room)

        const adminMsg = {
            username: 'Server',
            msg: 'user '+data.username+' has join the room',
        }
        io.to(data.room).emit('receive-msg', adminMsg)

        if (!allUsers.includes(data.username)){
            allUsers.push(data.username)
        }
        io.emit('new-user-server', allUsers)
        io.emit('update-room', allRooms)
    })

    // LEAVE ROOM
    socket.on('leave', (data) => {
        const adminMsg = {
            username: 'Server',
            msg: 'user '+data.username+' has left the room',
        }
        io.to(data.room).emit('receive-msg', adminMsg)
        
        let numKey = usersInRoom[data.room].indexOf(data.username)
        usersInRoom[data.room].splice(numKey, 1);
        socket.leave(data.room)

        io.emit('new-user-room', usersInRoom[data.room])

        numKey = allUsers.indexOf(data.username)
        allUsers.splice(numKey, 1);

        io.emit('new-user-server', allUsers)
    })
    
    // DELETE ROOM
    socket.on('delete', (data)=> {
        io.in(data.room).socketsLeave(data.room)

        const dataObj = {
            username: 'Server',
            msg: 'Room '+data.room+' as been deleted'
        }

        let numKey = allRooms.indexOf(data.username)
        allRooms.splice(numKey, 1);

        io.emit('receive-msg', dataObj)
        io.emit('new-user-server', allUsers)
        io.emit('update-room', allRooms)
    })

    // SEND MSG
    socket.on('send-msg', (data) => {
        // console.log('send-msg : ',data);
        io.to(data.room).emit('receive-msg', data)
    })
    
    // DISCONNECT SERVER
    socket.on('disconnect', () => {
        // console.log(`${socket.id} Disconnected`);
    })
})

server.listen(port, () => {
    console.log(`http://${host}:${port}/`)
    // console.log(`Example app listening on port ${port}`)
})