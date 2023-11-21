import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ socket, lastMessageRef,typingStatus }) => {
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem('userName');
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    const handleReceiveMessage = (data) => setMessages((prevMessages) => [...prevMessages, data]);

    socket.on('messageResponse', handleReceiveMessage);

    // Cleanup the socket subscription when the component unmounts
    return () => {
      socket.off('messageResponse', handleReceiveMessage);
    };
  }, [socket]);

  return (
    <>
      <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) => (
          <div className="message__chats" key={message.id}>
            {message.name === localStorage.getItem('userName') ? (
              <>
                <p className="sender__name">You</p>
                <div className="message__sender">
                  <p>{message.text}</p>
                </div>
              </>
            ) : (
              <>
                <p>{message.name}</p>
                <div className="message__recipient">
                  <p>{lastMessageRef}</p>
                </div>
              </>
            )}
          </div>
        ))}

        <div className="message__status">
        <p>{typingStatus}</p>
        </div>

      </div>
    </>
  );
};

export default ChatBody;
