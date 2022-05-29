import React from 'react'

import AllRooms from './all_rooms/AllRooms'
import AllUsers from './all_users/AllUsers'
import Form from './form/Forms'

import './infos.css'

export default function Infos({socket}) {

  return (
    <div className='Infos'>
      <div className='component'>
        <AllUsers socket={socket}/>
      </div>
      <div className='component'>
        <Form/>
      </div>
      <div className='component'>
        <AllRooms socket={socket}/>
      </div>
    </div>
  )
}
