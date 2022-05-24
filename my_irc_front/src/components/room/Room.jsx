import React from 'react'
import './room.css'
import io from 'socket.io-client'

export default function Room() {

  return (
    <div className='Room'>
      <div className='flex'>
        <div className="chat">
          <div className='header'>
            <div className='btn-container'>
              <div className='red'></div>
              <div className='orange'></div>
              <div className='green'></div>
            </div>
            <h2>Room: </h2>
          </div>
          <div className='content'>Content</div>
          <div className='footer' contentEditable></div>
        </div>
        <div className='users'>
          <h2>Users connected</h2>
          <ul className='usersConnected'>

          </ul>
        </div>
      </div> 
    </div>
  )
}
