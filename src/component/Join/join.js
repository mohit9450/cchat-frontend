import React, { useState } from 'react'
import "./join.css";
import {Link} from 'react-router-dom';
let user;


const Join = () => {

  const [name , setname] = useState("")

const sendUser = ()=>{
  user = document.getElementById('joinInput').value;
  document.getElementById('joinInput').value = "";
}

  return (
    <div className='joinPage'>
        <div className='joinContainer'> 
          <h1>C Chat</h1>
          <input onChange={(e)=>setname(e.target.value)} type = "text" id = "joinInput" placeholder='Enter your name ' />
         <Link to="/chat" onClick={(event)=>!name ? event.preventDefault():null}> <button className="joinBtn" onClick={sendUser}>Login In</button></Link>

        </div>
    </div>
  );
}

export default Join;
export {user};