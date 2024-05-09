import React from "react";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";

import Landing from "./Pages/Landing";
import DepartmentList from "./Pages/DepartmentList";
import DoctorList from "./components/doctorlist/Doctorlist";
import AppointmentForm from "./components/form/AppointmentForm";
import PageNotFound from "./components/pagenotfound/PageNotFound";
import LobbyScreen from "./screen/LobyScreen";
import RoomPage from "./screen/Room";
import { Dashboard, Auth } from "./layouts";
import Chat from "./chat_pages/Chat";
import SetAvatar from "./chat_components/SetAvatar";
import DoctorDashboard from "./doctorpanelUI/doctordashboard/DoctorDashboard";
import PaymentSummary from "./payments/PaymentSummary";
import Booking from "./components/mybooking/Booking";
import Contact from "./components/hero/Contact";
import About from "./components/hero/About";



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/user" element={<Landing />} />
        <Route path="/department" element={<DepartmentList />} />
        <Route path="/doctorlist" element={<DoctorList />} />
        <Route path="/appointmentForm" element={<AppointmentForm />} />
        <Route path="/lobby" element={<LobbyScreen />} />
        <Route path="/room/:roomId" element={<RoomPage />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/newchat" element={<Chat />} />
        <Route path="/doctor/newchat" element={<Chat />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/doctor/*" element={<DoctorDashboard/>} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="/payments" element={<PaymentSummary />} />
        <Route path="/booking" element={<Booking />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}
