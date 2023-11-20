import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userName', userName);
    //sends the username and socket ID to the Node.js server
    socket.emit('newUser', { userName, socketID: socket.id });
    navigate('/chat');
  }
  return (
    <form className="w-full h-screen flex flex-col justify-center items-center" onSubmit={handleSubmit}>
      <h2 className="mb-30">Sign in to Open Chat</h2>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        minLength={6}
        name="username"
        id="username"
        className="p-10 w-1/2"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button className="w-200 p-10 text-base cursor-pointer bg-blue-700 text-white outline-none border-none rounded-md">
        SIGN IN
      </button>
    </form>
  );
};

export default Home;
