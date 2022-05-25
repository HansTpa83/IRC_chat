import React from 'react'
import {BrowserRouter, Routes, Route } from "react-router-dom";

import Log from '../log/Log';
import Room from '../room/Room';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:8000')

export default function Nav() {
  return (
    <div className='Nav'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Log socket={socket}/>}/>
          <Route path='/:room' element={<Room socket={socket}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}
