import React, {useEffect, useState} from 'react'
import './allRooms.css'


export default function AllRooms( {socket} ) {
    const [rooms, setAllRooms] = useState([]);

    useEffect(() => {
        socket.on('update-room', (data) => {
            console.log(data);
            setAllRooms(data)
        })
    }, []);

    return (
        <div className='AllRooms'>
            <h2>Rooms</h2>
            <div className='room'>
                {
                    rooms.map((room, index) => {
                        return(
                            <div key={index}>{room}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
