import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import process from "process";
import { sendMessageRoute, recieveMessageRoute } from "../chat_utils/APIRoutes";
import Vedio from "./Vedio";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

        if (data && currentChat) {
          const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
          });

          setMessages(response.data);
        }
      } catch (error) {
        console.error('Error fetching data or sending request:', error);
      }
    };

    fetchData();
  }, [currentChat, setMessages]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        try {
          const storedData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);

          if (storedData) {
            const parsedData = JSON.parse(storedData);
            const currentChatId = parsedData._id;

            // Now you have the currentChatId, you can use it as needed.
            console.log('sender:',currentChatId);
          } else {
            console.warn('No data found in local storage for the specified key.');
          }
        } catch (error) {
          console.error('Error parsing or retrieving data from local storage:', error);
        }
      }
    };

    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });
    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    const setupSocketListener = async () => {
      try {
        if (socket.current) {
          socket.current.on("msg-recieve", (msg) => {
            setArrivalMessage({ fromSelf: false, message: msg });
          });
        }
      } catch (error) {
        console.error('Error setting up socket event listener:', error);
      }
    };

    setupSocketListener();
  }, [socket, setArrivalMessage]);

  useEffect(() => {
    const updateMessages = () => {
      try {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
      } catch (error) {
        console.error('Error updating messages:', error);
      }
    };

    updateMessages();
  }, [arrivalMessage, setMessages]);
  useEffect(() => {
    const scrollIntoViewSmooth = () => {
      try {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error('Error scrolling into view:', error);
      }
    };

    scrollIntoViewSmooth();
  }, [messages, scrollRef]);

  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString();

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            />
          </div>
          <div className="username">
            <h3>{currentChat.username}</h3>
          </div>
        </div>
        <Vedio className="flex-end"/>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"
                  }`}
              >
                <div className="content ">
                  <p>{message.message}</p>

                </div>

              </div>
              <div className="text-s text-blue-200 mr-20 text-end">
       {message.timestamps}
    </div>
            </div>
          );
        })}
      </div>
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar { 
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 5  0%;
        overflow-wrap: break-word;
        padding: .5rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #ffffff;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #061840;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #063f8a;
      }
    }
  }
`;
