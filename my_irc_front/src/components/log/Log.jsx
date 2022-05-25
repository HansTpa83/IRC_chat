import React, {useState} from 'react';
import './log.css'
import {Link} from "react-router-dom";

const Log = ({socket}) => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const submit = (e) =>{
    if (username !== '' && room !== '') {
      let data = {
        room,
        username
      }
      socket.emit('join-room', data)
    } else {
      e.preventDefault()
    }
  }

  return (
    <div className='Log'>
      <h1>Sign In</h1>    
      <form>
        <div className='margin'>
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            name="username" 
            required
            value={username}
            onChange={(event) => {setUsername(event.target.value)}}
          />
        </div>
        <div className='margin'>
          <label htmlFor="room">Room:</label>
          <input 
            type="text" 
            name="room" 
            required
            value={room}
            onChange={(event) => {setRoom(event.target.value)}}
          />
        </div>
        <div className='margin' style={{padding:'5vh'}}>
          <Link className='btn-send' to={`room/?room=${room}&username=${username}`} onClick={submit}>Send</Link>
        </div>
      </form>
    </div>
  );
}

export default Log;
