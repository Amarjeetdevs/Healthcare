import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";

const LobbyScreen = () => {

  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  const navigate = useNavigate();

  // const toastOptions = {
  //   position : "button-right",
  //   autoClose:6000,
  //   pauseOnHover:true,
  //   draggable:true,
  //   theme : "white"
  // }

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();

      if (email === '' || room === '') {
        alert('Please fill out the form properly');
      } else {
        // Check if the room number has more than 3 digits
        if (room.length < 3) {
          alert('Please enter a room number with more than 3 digits');
        } else {
          // If all validations pass, emit the "room:join" event
          socket.emit("room:join", { email, room });
        }
      }
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  const backToChat = () => {
    navigate('/newchat')
  }
  return (
    <div style={{ backgroundColor: '#cfeafd', minHeight: '100vh' }} 
    className="flex flex-col items-center justify-center"  >
      <h1 className="text-4xl  font-bold mb-12   ">Vedio Conference</h1>
      <form onSubmit={handleSubmitForm} className="container  max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            placeholder="xyz@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="room" className="block text-sm font-semibold text-gray-600">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            placeholder="xyz"
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Join
        </button>
        <button
          onClick={backToChat}
          className="bg-green-500 ml-10 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Back to chat
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
