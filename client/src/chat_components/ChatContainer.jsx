import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import axios from "axios";
import process from "process";
import { sendMessageRoute, recieveMessageRoute } from "../chat_utils/APIRoutes";
import Vedio from "./Vedio";


export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [formData, setFormData] = useState({
    to: '',
    from: '',
    message: null
  });
  console.log('messages', messages)
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

        if (data && currentChat) {
          const response = await axios.post(recieveMessageRoute, {
            from: data._id,
            to: currentChat._id,
          });

          setMessages(response.data);
          setLoading(false);
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

           
            console.log('sender:', currentChatId);
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
  
    const from = currentChat._id;
      const to = data._id;
     console.log(' to,from ,msg',to,from,msg)
    if (typeof msg !=='string') {
      const formData = new FormData();
      formData.append("to", to);
      formData.append("from", from);
      formData.append("file", msg);
        
        console.log('fromdata',Array.from(formData));
         const  dataT = Array.from(formData)
        const headers = {
          "Content-Type": "multipart/form-data",
        };
        
        try {
          const response = await axios.post(sendMessageRoute  , formData, {
            headers: headers
          });
          
          console.log('Server response:', response.data); 
        } catch (error) {
          console.error('Error:', error);
        }
      



    }
    else {
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
    }
  
    const msgs = [...messages];
    
    if (typeof msg === 'string') {
      msgs.push({ fromSelf: true, message: msg });
    } else {
      msgs.push({ fromSelf: true, message: msg.name });
    }
    

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
  const isValidDate = (date) => {
    return date && !isNaN(new Date(date).getTime());
  };
  const host = "http://localhost:5001";
  return (
    <Container>
      <div className="chat-header bg-gray-400  py-8  ">
        <div className="user-details">
          <div className="avatar">
            {/* <img
              src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
              alt=""
            /> */}
          </div>
          <div className=" text-black font-bold">
            <h3 >{currentChat.username}</h3>
          </div>
        </div>
        <Vedio className="flex-end" />
        <Logout />
      </div>

      <div className="chat-messages relative" style={{ backgroundImage: `url(${'https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png'})` }}>
  {!loading && messages.map((message, index) => (
    <div key={index} className={`chat ${message.fromSelf ? "chat-end" : "chat-start"}`}>
      <div className="chat-header">
        {message.username}
      </div>
      <div className={`chat-bubble flex ${message.fromSelf ? "bg-blue-500 text-white text-md justify-end" : "bg-gray-200 text-black"} rounded-md p-2 items-center`}>
      {message.message && typeof message.message === "object" ? (
  <a href={`${host}/uploads/${message.message.filename}`} download>{message.message.filename}</a>
) : (
  <p>{message.message}</p>
)}

        <h6 className="text-xs text-gray-700 ml-2">
          {isValidDate(message.timestamp) ? new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h6>
      </div>
      <div className="chat-footer text-white pt-2 opacity-90"></div>
    </div>
  ))}
  <div ref={scrollRef}></div>
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
