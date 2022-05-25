import React, {useState, useEffect} from 'react'

import {Link} from "react-router-dom";
import './room.css'

export default function Room({socket}) {
  const [allMsg, setAllMsg] = useState([])
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("")

  useEffect(() => {
    const url = window.location.search
    let params = url.split('&')
    let roomQuery= params[0].split('=')[1]
    let usernameQuery= params[1].split('=')[1]
    
    setRoom(roomQuery)
    setUsername(usernameQuery)

    let data = {
      room,
      username
    }

    socket.emit('join-room', data)

  }, [socket])

  const handleKeyPress = (event) => {
    if(event.key === 'Enter' && event.target.textContent != ''){
      const msgData = {
        room,
        username,
        msg: event.target.textContent
      }
      socket.emit('send-msg', msgData)

      document.querySelector('.footer').textContent = ''
    }
  }


  useEffect(() => {
    socket.on('receive-msg', (data) => {
      setAllMsg((allMsg) => [...allMsg, data])
    })
  }, [])

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
          <div className='content'>
            <ul className='msg-display'>
              {
                allMsg.map((data, index) => {
                  if (data.msg) {
                    if(data.username === username){
                      return (<li className='userMessage' key={index}>
                        <p>{data.msg}</p>
                        <sub>From: {data.username}</sub>
                      </li>) 

                    } else {

                      return (<li className='OtherUserMessage' key={index}>
                        <p>{data.msg}</p>
                        <sub>From: {data.username}</sub>
                      </li>) 
                    }
                  }
                })
              }
            </ul>
          </div>
          <div contentEditable className='footer' onKeyPress={handleKeyPress}></div>
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
