import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from '../assets/robot.gif';
import process from "process";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserName(parsedUser.username);
        }
      } catch (error) {
      
        console.error("Error fetching user:", error);
      }
    };
  
    fetchData();
  
   
  }, []);
  
  
  return (
    <Container>
      <img src={Robot} alt="" />
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #2fb2ba;
  }
`;
