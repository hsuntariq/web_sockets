import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001');



function App() {
  const [message, setMessage] = useState('')
  const [sendMessages, setSendMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send_message", { message: message });
    setSendMessages([...sendMessages,message])
    setMessage('');
    console.log(sendMessages)
  }
  
  useEffect(() => {
    socket.on("received_message", ((data) => {
      setMessages([...messages, data.message]);
      // alert(data.message)
      // console.log(messages)
    }))
  }, [socket,messages]);
  return (
    <>
        <form>
          <input value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="message..." />
          <button onClick={handleSubmit}>Send</button>
        {messages?.map((msg) => {
          return (
              <>
              <h4>{msg}</h4>
              </>
            )
          })}
        </form>
    </>
  )
}

export default App
