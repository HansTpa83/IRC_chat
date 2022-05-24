import React , {useState, createContext} from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";

import Log from '../log/Log';
import Room from '../room/Room';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000')

export default function Nav() {

  const [username, setUsername] = useState('')
  const [room, setRoom] = useState('')

  return (
    <div className='Nav'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Log setUsername={setUsername} username={username}/>}/>
          <Route path='/:room' element={<Room/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
