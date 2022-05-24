import React, {useContext} from 'react';
import './log.css'
import io from 'socket.io-client'


const Log = ({username, setUsername}) => {

  return (
    <div className='Log'>
      <h1>Sign In</h1>    
      <form>
        <div className='margin'>
          <label htmlFor="username">Username:</label>
          <input type="text" name="username" />
        </div>
        <div className='margin'>
          <label htmlFor="room">Room:</label>
          <input 
            type="text" 
            name="room" 
            value={username}
            onClick={(event) => {setUsername(event.target.value)}}
          />
        </div>
        <div className='margin' style={{padding:'5vh'}}>
          <input type="submit" value="Envoyer" />
        </div>
      </form>
    </div>
  );
}

export default Log;
