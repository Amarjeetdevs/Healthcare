import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faArrowRight, faComment, faPaperPlane, faSeedling } from '@fortawesome/free-solid-svg-icons';


const ChatFooter = ({ socket } ) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

  const handleTyping = () =>
  socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

  return (
    <div className="chat__footer mb-8" >
      <form className="form rouned-full p-2 bg-blue-500 text-white mb-12" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleTyping}
        />
           <button
      className="whatsappSendBtn p-2 rounded-full bg-green-700 text-white mr-12 border-collapse border-white" >
      <FontAwesomeIcon icon={faPaperPlane} className="text-2xl" />
      {/* You can adjust the size and add additional text or styling here if needed */}
    </button>
      </form>
    </div>
  );
};

export default ChatFooter;