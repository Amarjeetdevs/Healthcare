import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../chat_utils/APIRoutes";
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
        if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/auth/sign-in");
        } else {
          setCurrentUser(
            await JSON.parse(
              localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )
          );
        }
      } catch (error) {
        // Handle errors, e.g., parsing JSON or other unexpected issues
        console.error("Error fetching user:", error);
      }
    };
  
    fetchData();
  
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  
  useEffect(() => {
    const setupSocket = async () => {
      if (currentUser) {
        try {
          socket.current = io(host);
          await socket.current.emit("add-user", currentUser._id);
          console.log(currentUser._id,currentUser.username)
          
          
        } catch (error) {
          // Handle errors, e.g., issues with socket connection
          console.error("Error setting up socket:", error);
        }
      }
    };
  
    setupSocket();
  
    // Cleanup logic if needed
    return () => {
      if (socket.current) {
        // Perform any cleanup related to the socket connection here
        // For example, disconnecting the socket
        socket.current.disconnect();
      }
    };
  
  }, [currentUser]);
  
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (currentUser) {
          if (currentUser.isAvatarImageSet) {
            const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(response.data);
          } else {
            navigate("/setAvatar");
          }
        }
      } catch (error) {
        // Handle errors, e.g., network issues or unexpected errors
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  
  }, [currentUser, navigate]);
  

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  
  return (
    <>
     {<Hero/> }
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
  background-color: #cfe7fc;
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
