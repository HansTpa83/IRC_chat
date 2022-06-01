import './room.css'
import React, { useState, useEffect } from 'react'
import { useLocation , Link, Navigate} from 'react-router-dom';

import UsersRoom from './UsersRoom';

export default function Room({socket}) {
  
  const {search} = useLocation()
  const query = new URLSearchParams(search)
  const roomQuery = query.get('room')
  const usernameQuery = query.get('username')

  const [allMsg, setAllMsg] = useState([])

  useEffect(() => {
    const data = {
      username: usernameQuery,
      room: roomQuery
    }
    socket.emit('join-room', data)
    
  }, [socket]);

  /**
   * Send / receive Message
  */
  useEffect(() => {
    socket.on('receive-msg', (data) => {
      console.log(data);
      setAllMsg((allMsg) => [...allMsg, data])
    })
  }, []);

  const sendMsg = (e) => {
    if (e.target.value !== '' && e.target.value !== ' ' && e.key === 'Enter'){
      let messageInfos = {
        room: roomQuery,
        username: usernameQuery,
        msg: e.target.value
      }
      socket.emit('send-msg', messageInfos)
      e.target.value = ''
    }
  }

  /**
   * Users
  */
  useEffect(() => {
    socket.on('users-update', (data) => {
      console.log(data);
      setAllUsers((allMsg) => [...allMsg, data])
    })
  }, []);

  /**
   * Delete room
  */
  const delRoom = () => {
    const infos = {
      room:roomQuery, 
      username: usernameQuery
    }
    socket.emit('delete',infos )
    return(
      <Navigate to="/" />
    )
  }

  /**
   * Leave room
  */
  const leaveRoom = () => {
    const infos = {
      room:roomQuery, 
      username: usernameQuery
    }
    socket.emit('leave', infos)
  }

  return (
    <div className='Room'>
        <div className='chat'>
          <div className='header'>
            <div className='chat-btn'>
              <Link to='/' className='red' onClick={delRoom}></Link>
              <div to='/' className='orange' onClick={leaveRoom}></div>
              <div className='green'></div>
            </div>
            <h2>{roomQuery}</h2>
          </div>

          <div className='content'>
            {
              allMsg.map((message, index)=>{
                if (usernameQuery == message.username){
                  return(
                    <div key={index} className='userMsg'>
                      <div>{message.msg}</div>
                      <sup>{message.username}</sup>
                    </div>
                  )
                } else if (message.username === 'Server'){
                  return(
                    <div key={index} className='servMsg'>
                      <div>{message.msg}</div>
                      <sup>{message.username}</sup>
                    </div>
                  )
                } else {
                  return(
                    <div key={index} className='otherMsg'>
                      <div>{message.msg}</div>
                      <sup>{message.username}</sup>
                    </div>
                  )
                }
              })
            }
          </div>
          
          <div className="footer">
            <input 
              type="text"
              name="msg"
              onKeyUp={sendMsg}
              placeholder='Message...'
            />
          </div>
        </div>

        <UsersRoom socket={socket} room={roomQuery}/>
        
    </div>
  )
}
