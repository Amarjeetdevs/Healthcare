import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import process from "process";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

        if (data.username !== undefined) {
          setCurrentUserName(data.username);
        } else if (data.doctorName !== undefined) {
          setCurrentUserName(data.doctorName);
        } else {
          alert('Unable to fetch previous details');
          Navigate('/auth/sign-up');
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [setCurrentUserName]);
  
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    console.log(`message receiver is:`, contact._id);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <div className="brand">
        {/* <img src={Logo} alt="logo" /> */}
        <h3>Contacts</h3>
      </div>
  
      <div className="contacts">
      <input
        type="text"
        placeholder="Search by username..."
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        className="input input-bordered input-error   max-w-lg "
      />  
        {filteredContacts.map((contact, index) => (
          <div
            key={contact._id}
            className={`contact ${index === currentSelected ? "selected" : ""}`}
            onClick={() => changeCurrentChat(index, contact)}
          >
            <div className="avatar">{/* Avatar image */}</div>
            <div className="username">
              <h3>{contact.username}</h3>
            </div>
          </div>
        ))}
      </div>
      <div className="current-user">
        <div className="avatar">{/* <img src={currentUserImage} alt="avatar" /> */}</div>
        <div className="username">
          <h2>{currentUserName}</h2>
        </div>
      </div>
    </Container>
  );
}


const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #080420;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 2rem;
    }
    h3 {
      color: white;
      text-transform: uppercase;
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: #ffffff34;
      min-height: 3.5rem;
      cursor: pointer;
      width: 90%;
      border-radius:2rem;
      padding: 0.4rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      transition: 0.5s ease-in-out;
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
    .selected {
      background-color: #9a86f3;
    }
  }

  .current-user {
    background-color: #0d0d30;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
      }
    }
    .username {
      h2 {
        color: white;
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
