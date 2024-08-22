import { useEffect, useState } from 'react';

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessages, setLatestMessages] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
  
    const ws = new WebSocket('ws://localhost:8080');

   
    ws.onopen = () => {
      console.log("Connected");
      setSocket(ws);
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      setLatestMessages(event.data);
    };

    
    return () => {
      ws.close();
      setSocket(null);
    };
  }, []);

  const handleSend = () => {
    if (socket) {
      socket.send(message);
      setMessage(''); 
    }
  };

  if (!socket) {
    return <div>Loading...</div>;
  }

  return (
    <>
      
      <input 
        type="text" 
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
      {latestMessages}
    </>
  );
}

export default App;
