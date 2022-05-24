import React from 'react'
import './room.css'

export default function Room() {
  const leave = () => {
    
  }

  return (
    <div className='room'>
      <div className='flex'>
        <div className='container'>
          <div className='header'>
            <div className='rond'>
              <div className='red' onClick={leave}></div>
              <div className='yellow'></div>
              <div className='green'></div>
            </div>
            <h2>Room: </h2>
          </div>

          <div className='content'>
            <div><div className='OtherUserMessage'>MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage</div></div>
            <div><div className='userMessage'>dnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsqdnjsq</div></div>

          </div>

          <div className='footer'>
            <input type="text" name="msg" className='inputMsg' placeholder='Message...'/>
          </div>
        </div>
          <div>
            <h2>User connected:</h2>
              <ul className='userConnected'>
              </ul>
          </div>
      </div>
    </div>
  )
}
