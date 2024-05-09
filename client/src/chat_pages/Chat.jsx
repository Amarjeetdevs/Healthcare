import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host, registerRoute } from "../chat_utils/APIRoutes";
import ChatContainer from "../chat_components/ChatContainer"; 
import Contacts from "../chat_components/Contacts";
import Welcome from "../chat_components/Welcome";
import process from "process";
import Hero from "../components/hero/Hero";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (!storedUser) {
          navigate("/auth/sign-in");
        } else {
          setCurrentUser(JSON.parse(storedUser));

        // console.log('stored data',(JSON.parse(storedUser.id)))
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchData();
  }, [navigate]);
  


  useEffect(() => {
    const setupSocket = async () => {
      if (currentUser) {
        try {
          socket.current = io(host);
          await socket.current.emit("add-user", currentUser._id);
          console.log("id and username", currentUser._id, currentUser.username, currentUser.doctorName);
        } catch (error) {
          console.error("Error setting up socket:", error);
        }
      }
    };
  
    setupSocket();
  
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [currentUser]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser && currentUser._id) {
          const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(response.data);
          console.log('user response',response.data);
          // console.log('currnetUser._id',response.data._id);
        } else {
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  
  return (
    <>
      {/* <Hero/> */}
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: .1rem;
  align-items: center;
  background-color: #10B981;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #ffffff ;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
