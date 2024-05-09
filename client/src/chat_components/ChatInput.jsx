import React, { useState, useRef } from "react";
import { IoMdSend } from "react-icons/io";
import styled from "styled-components";

export default function ChatInput({ handleSendMsg }) {
  const fileInputRef = useRef(null);
  const [msg, setMsg] = useState("");
  const [fileName, setFileName] = useState("");

  const sendChat = (event) => {
    event.preventDefault();
    if (typeof msg !== 'string') {
      handleSendMsg(msg);

     
    } else if (msg.trim() !== "") {
      handleSendMsg(msg);
    }
    setMsg("");
    setFileName("");
  };
  
  
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      console.log('Selected file:', file);
      setFileName(file.name); // Set the file name
      setMsg(file); // Set the file object in the message state
    }
  };
  

  return (
    <Container>
      <div className="button-container">
        {/* Add emoji picker button here */}
      </div>
      <form className="input-container" onSubmit={sendChat}>
        <img
          width={44}
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEuzEyiodgSY6JxOSEu16Pp_uYUDejKpBhNGVMRWm9yg&s"
          }
          alt="User"
          onClick={handleImageClick}
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <input
          type="text"
          placeholder="Type your message here"
          onChange={(e) => setMsg(e.target.value)}
          value={msg instanceof File ? fileName : msg} 
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}



const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #06368a;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: white;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #25D366;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
