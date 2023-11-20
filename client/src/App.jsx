import React from "react";
import { BrowserRouter as Router, Routes,Navigate ,Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import DepartmentList from "./Pages/DepartmentList";
import LoginUser from "./components/registration/Registration";
import DoctorList from "./components/doctorlist/Doctorlist";
import AppointmentForm from "./components/form/AppointmentForm";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import LobbyScreen from "./screen/LobyScreen";
import RoomPage from "./screen/Room";
import Home from "./components/ChatComponents/Home";
import ChatPage from "./components/ChatComponents/ChatPage";
import { io } from "socket.io-client";  // Import io, not Socket
import { Dashboard,Auth } from "./layouts";

const url = "http://localhost:4000";
const socket = io(url);  // Use io, not Socket.connect

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="/doctorlist" element={<DoctorList />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/chathome" element={<Home />} />
        <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        <Route path="*" element={<PageNotFound />} />
     

        <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />

    
      </Routes>
    </Router>
  );
}
