import React, {useState, useEffect} from 'react'
import './allUsers.css'

export default function AllUsers( {socket} ) {
  const [allUsers, setAllUsers] = useState([])

  useEffect(() => {
    socket.on('new-user-server', (data) => {
      console.log(data);
        setAllUsers(data)
    })
  }, []);

  return (
    <div className='AllUsers'>
      <h2>Users</h2>
      <div className='room-users'>
        {
          allUsers.map((user, index) => {
            return (
              <div key={index}>{user}</div>
            )
          })
        }
      </div>
    </div>
  )
}
