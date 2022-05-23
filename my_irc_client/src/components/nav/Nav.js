import React, {useState, useEffect} from 'react'

import Room from '../room/Room'
import Connection from '../connection/Connection'

export default function Nav() {
  const [view, setView] = useState(<Room/>);

  useEffect(() => {
      
  }, [view]);

  return (
    <div className='nav'>
        {view}
    </div>
  )
}
