import React, { useEffect, useState } from 'react'
import {user} from "../Join/join"
import socketIO from "socket.io-client";
import "./Chat.css"
import ReactScrollToBottom from "react-scroll-to-bottom"
import Message from "../Message/Message"
const ENDPOINT = "http://localhost:4500"

const Chat = () => {
// const messages = [1,2,3,4];
  const socket = socketIO(ENDPOINT , {transports : ['websocket']})
  const [id,setid] = useState("")
  const [messages,setMessages] = useState([])
// const [messag , setMeagess] = useState("");
  const send = ()=>{
    const message = document.getElementById('chatInput').value
    console.log(message,id);
    
    socket.emit('message',{message,id});
    document.getElementById('chatInput').value = "";

  }

  useEffect(()=>{

    socket.on("connect",()=>{
      alert("connected");
      console.log(socket.id);
      setid(socket.id);
      console.log(id)
    })

    socket.emit('joined' , {user})
    socket.on('welcome',(data)=>{
      setMessages([...messages,data])
      console.log(data.user,data.message)

    })
    socket.on('userJoined',(data)=>{
      setMessages([...messages,data])
      console.log(data.user,data.message)
    })
    socket.on('leave',(data)=>{
      setMessages([...messages,data])
      console.log(data.user,data.message)
    })

   
    return ()=>{
      socket.emit('disconnects')
      socket.off();
    }

  },[]

  )
  useEffect(()=>{
    socket.on('sendMessage',(data)=>{
      setMessages([...messages,data])
      console.log(data.user,data.message,data.id)
    })
    return ()=>{
      socket.off();
      // cleanup
    }
  }

  
,[messages]
  
  )

  return (

    <div className='chatPage'>
      <div className='chatContainer'>
        <div className='header'><h1>C Chat</h1></div>
        <ReactScrollToBottom className='chatBox'>
        {/* <Message message={"Jdsj"} /> */}
  
          {messages.map((e)=><Message user = {e.id === id ? '' : e.user} message={e.message} classs={e.id === id ? 'right' : 'left'} />)}
        </ReactScrollToBottom>
        <div className='inputBox'>
          <input onKeyPress={(event)=>event.key === 'Enter' ? send() : null} type = "text" id = "chatInput"/>
          <button className = "sendBtn" onClick={send}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Chat