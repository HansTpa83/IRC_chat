import './room.css'
import React, { useState, useEffect } from 'react'
import { useLocation , Link} from 'react-router-dom';

export default function Room({socket}) {
  
  const {search} = useLocation()
  const query = new URLSearchParams(search)
  const roomQuery = query.get('room')
  const usernameQuery = query.get('username')

  const [allMsg, setAllMsg] = useState([])
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    const data = {
      username: usernameQuery,
      room: roomQuery
    }
    console.log(data);
    socket.emit('join-room', data)
    
  }, [socket]);

  /**
   * Send / receive Message
   */
  useEffect(() => {
    socket.on('receive-msg', (data) => {
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
      setAllUsers((allMsg) => [...allMsg, data])
    })
  }, []);

  return (
    <div className='Room'>
        <div className='chat'>
          <div className='header'>
            <div className='chat-btn'>
              <Link to='/' className='red'></Link>
              <div className='orange'></div>
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
            />
          </div>
        </div>

        <div>
          <h2>Users connected</h2>
          <div className='users-room'>
            {
              allUsers.map((user, index) => {
                <div key={index}>{user}</div>
              })
            }
          </div>
        </div>
    </div>
  )
}
