import React, { useState, useEffect } from 'react';
import '../styles/friends.css';

function ChatroomName()
{
  return <img className="chatroom-name" src="/images/chatroom_name.png" alt="Chatroom Name" />;
}

function Background()
{
  return <img className="background-art" src="/images/Background_art.png" alt="Background Art" />;
}

function RedRectangle()
{
  return <img className="red-rectangle" src="/images/Red_rectangle.png" alt="Red rectangle" />;
}

function RedRectangleBottom()
{
  return <img className="red-rectangle-bottom" src="/images/Red_rectangle.png" alt="Red rectangle bottom" />;
}

function SendButton({ onClick })
{
  return (
    <button className="send-button" onClick={onClick}>
      <img src="/images/sendbutton.png" alt="Send button" />
    </button>
  );
}

function SendInputBox({ value, onChange })
{
  return <input type="text" className="send-input" value={value} onChange={onChange} />;
}

function TextArea({ value })
{
  return <textarea className="message-output" value={value} readOnly />;
}

export default function Friends()
{
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [senderId, setSenderId] = useState(user ? user.id : null);
  const [receiverId, setReceiverId] = useState(null); 

  const fetchMessages = async () =>
  {
    try
    {
      const response = await fetch(`/messages`, {headers: {'Authorization': `Bearer ${localStorage.getItem('accessToken')}`}});
      
      if (!response.ok)
      {
        throw new Error(`Failed to fetch messages: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Messages fetched:", data);
      setMessages(data);
    }

    catch (error)
    {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() =>
  {
    fetchMessages();
  }, []);


    

  const handleSendMessage = async () =>
  {
    console.log('Send button was clicked with message:', currentMessage);
    
    if (currentMessage.trim())
    {
      try
      {
        console.log('Sending message:', currentMessage);
        const response = await fetch('/send-message', { method: 'POST', headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`, }, body: JSON.stringify({ senderUserId: senderId, message: currentMessage }), });
        
        if (!response.ok)
        {
          console.error('Failed to send message, server responded with:', response.status, response.statusText);
          throw new Error('Failed to send message');
        }
        
        setCurrentMessage('');
        await fetchMessages();
      }
      
      catch (error)
      {
        console.error("Error sending message:", error);
      }
    }

    else
    {
      console.warn('Cannot send an empty message.');
    }
  };

  const messageDisplay = messages.map(msg => `${msg.UserName} [${new Date(msg.TimeStamp).toLocaleString()}]: ${msg.Message}`).join('\n');

  if (!user)
  {
    console.log("User not found, cannot show chat interface.");
    return null;
  }

  return (
    <div className="parent">
      <Background />
      <RedRectangle />
      <RedRectangleBottom />
      <ChatroomName />
      <SendButton onClick={handleSendMessage} />
      <SendInputBox value={currentMessage} onChange={(e) => setCurrentMessage(e.target.value)} />
      <TextArea value={messageDisplay} /> {/* Display messages in the TextArea */}
    </div>
  );
}