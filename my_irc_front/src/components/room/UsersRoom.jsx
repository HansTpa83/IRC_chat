import React, {useEffect, useState} from 'react'
import './room.css'

export default function UsersRoom({socket, room}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('new-user-room', (data) => {
      console.log(data);
      setUsers(data)
    })
  }, [])

  return (    
    <div className='UsersRoom'>
        <h2>Users connected</h2>
        <div className='users-room'>
            { users && (
                users.map((user, index) => {
                  console.log(user);
                  return (
                    <div key={index}>{user}</div>
                  )
                })
              )
            }
        </div>
    </div>
  )
}
