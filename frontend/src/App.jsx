import {useEffect, useState} from 'react'
import io from 'socket.io-client';
import "./styles.css"
const socket = io.connect('http://localhost:3001');
const App = () => {
  const [message, setMessage] = useState('');
  const [sentMessages, setSentMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    socket.on('received_message', (data) => {

      setReceivedMessages((prevState) => [
        ...prevState,
        { id: Date.now(), message: data.message,sent:false },
      ]);
    });

    return () => {
      socket.off('received_message');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Emit the message and add it as a sent message to the state
    socket.emit('send_message', { message: message });
    setSentMessages((prevState) => [
      ...prevState,
      { id: Date.now(), message: message,sent:true },
    ]);
    setMessage('');
  };

  const allMessages = [...sentMessages, ...receivedMessages].sort(
    (a, b) => a.id - b.id
  );
  return (
    <>
      <div className="p-4 container-fluid col-12">
      <form>
        <input className='form-control' value={message} onChange={(e)=>setMessage(e.target.value)} type="text" placeholder="Enter your message..." />
        <button className='btn btn-dark my-3 w-100' onClick={handleSubmit}>Send</button>

      </form>
        <div className="container">
            {allMessages.map((msg) => (
            <div
              key={msg.id}
              className={msg.sent ? 'sent-message' : 'received-message'}
              >
              {console.log(msg.sent)}
              <h5>{msg.message}</h5>
            </div>
          ))}
      </div>
      {/* {console.log(messages)} */}
      </div>
    </>
  )
}

export default App
