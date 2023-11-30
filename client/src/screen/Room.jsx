import React, { useEffect, useCallback, useState } from "react";
import ReactPlayer from "react-player";
import peer from "../service/Peer";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";
const RoomPage = () => {
  const socket = useSocket();
  const navigate = useNavigate();

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [myStream, setMyStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [person, setPerson] = useState('')
  const [Incoming, setIncomming] = useState('');
  const [color, setColor] = useState('');

  var green = 'bg-green-500'

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setPerson(email);
    setRemoteSocketId(id);
    setColor(green);
  }, []);

  const handleCallUser = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    const offer = await peer.getOffer();
    socket.emit("user:call", { to: remoteSocketId, offer });
    setMyStream(stream);
  }, [remoteSocketId, socket]);

  const handleIncommingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });
      setIncomming(from, offer)
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    for (const track of myStream.getTracks()) {
      peer.peer.addTrack(track, myStream);
    }
  }, [myStream]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncomming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );


  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams;
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream[0]);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncommingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncomming);
    socket.on("peer:nego:final", handleNegoNeedFinal);

    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncommingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncomming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncommingCall,
    handleCallAccepted,
    handleNegoNeedIncomming,
    handleNegoNeedFinal,
  ]);

  let backToChat = () => {
    navigate('/newchat')
    window.location.reload();
  }

  return (
    <div
    style={{ backgroundColor: '#cfeafd' }} 
    className="container mx-auto pt-8 p-4 flex flex-col items-center">
        <h3 className="text-sm">
          <span className={`h-4 w-2 rounded-full ${color} mr-2 pr-6`}></span>
        </h3>

    <h5>{Incoming}</h5>
      <h4 className="text-xl mb-4">
        {remoteSocketId ? `connected with ${person}` : "No one in room"}
      </h4>

      <div className="flex justify-center space-x-4 mt-4">
        {myStream && (
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
            onClick={sendStreams}
          >
            Send Stream
          </button>
        )}

        {remoteSocketId && (
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
            onClick={handleCallUser}
          >
            CALL
          </button>
        )}

        <button
          className="bg-red-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full"
          onClick={backToChat}
        >
          Back to chat
        </button>
      </div>

      <div className="flex mt-8">
  {remoteStream && (
    <div>
      <h1 className="text-xl font-bold mb-2">Remote Stream</h1>
      <ReactPlayer
        playing
        muted
        height="600px"
        width="1000px"
        url={remoteStream}
      />
    </div>
  )}

  {myStream && (
    <div className="ml-auto">
      <h1 className="text-xl font-bold mb-2">My Stream</h1>
      <ReactPlayer
        playing
        muted
        height="200px"
        width="400px"
        url={myStream}
      />
    </div>
  )}
</div>

    </div>
  );
};

export default RoomPage;
