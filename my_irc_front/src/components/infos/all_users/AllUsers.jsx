import React, {useState, useEffect} from 'react'
import './allUsers.css'

export default function AllUsers( {socket} ) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('join', (data) => {
        
    })
  }, []);

  return (
    <div className='AllUsers'>
      <h2>All users</h2>
      <div className='room-users'>
        {

        }
      </div>
    </div>
  )
}
