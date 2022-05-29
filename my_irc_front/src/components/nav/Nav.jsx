import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Infos from '../infos/Infos'
import Room from '../room/Room'

import { io } from "socket.io-client";
const socket = io( "http://localhost:8000")

export default function Nav() {
  return (
    <div className='Nav'>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Infos socket={socket}/>}/>
                <Route path='/room' element={<Room socket={socket}/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  )
}
