import React, {useState, useEffect} from 'react'
import {Link} from "react-router-dom";
import './room.css'

export default function Room({socket}) {
  const url = window.location.search
  let params = url.split('&')
  let room= params[0].split('=')[1]
  let username= params[1].split('=')[1]

  const [msg, setMsg] = useState('')

  const handleKeyPress = async (event) => {
    setMsg(document.querySelector('.footer').textContent)
    if(event.key === 'Enter'){
      const msgData = {
        room,
        username,
        msg
      }
      await socket.emit('send-msg', msgData)
      document.querySelector('.footer').textContent = ''
    }
  }

    socket.on('receive-msg', (data) => {
      console.log(data);
    })


  return (
    <div className='Room'>
      <div className='flex'>
        <div className="chat">
          <div className='header'>
            <div className='btn-container'>
              <Link to='/' className='red'></Link>
              <div className='orange'></div>
              <div className='green'></div>
            </div>
            <h2>{room}</h2>
          </div>
          <div className='content'>Content</div>
          <div className='footer' contentEditable value={msg} onKeyPress={handleKeyPress}></div>
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
