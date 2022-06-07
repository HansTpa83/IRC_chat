import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import './form.css'

export default function Forms() {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='Forms'>
      <div className='username'>
        <label htmlFor="user">Username</label>
        <input 
          type="text" 
          name='user'
          onChange={(event)=> {setUsername(event.target.value)}}
        />
      </div>
      <div className='room'>
        <label htmlFor="room">Room</label>
        <input 
          type="text" 
          name='room'
          onChange={(event)=> {setRoom(event.target.value)}}
        />
      </div>
      <Link to={`/room/?username=${username}&room=${room}`}>Send</Link>
    </div>
  )
}
