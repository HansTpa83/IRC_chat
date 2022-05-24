import './connection.css'
import React, {useState} from 'react'
import io from 'socket.io-client'

const socket = io.connect('http://localhost:8000')

export default function Connection() {

    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
   
    const sendData = (event) => {
        event.preventDefault()
        console.log("dsnj");
        if(username.username !== "" && room.room !== ""){
            socket.emit('join-room', room)
        }
    }

    return (
        <div className='connection' style={{textAlign: 'center'}}>
            <h1>Sign In</h1>
            <form onSubmit={sendData}>
                <div className='frstInput'>
                    <div>
                        <label>Username :</label>
                    </div>
                    <input 
                        type="text" 
                        name="username"
                        value={username}
                        onChange={(event) => {setUsername(event.target.value)}}
                        required
                    />
                </div>
                <div className='lstInput'>
                    <div>
                        <label>Room :</label>
                    </div>
                    <input 
                        type="text"
                        name="room"
                        value={room}
                        onChange={(event) => {setRoom(event.target.value)}}
                        required
                    />
                </div>
                <div>
                    <input type='submit' className='submit' />
                </div>
            </form>
        </div>
    )
}
