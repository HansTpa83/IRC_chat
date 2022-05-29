import React, {useEffect, useState} from 'react'
import './allRooms.css'


export default function AllRooms( {socket} ) {
    const [rooms, setAllRooms] = useState([]);

    useEffect(() => {
        socket.on('join', (data) => {
            
        })
    }, []);

    return (
    <div className='AllRooms'>
        <h2>Rooms</h2>
        <div className=''>
            {

            }
        </div>
    </div>
  )
}
