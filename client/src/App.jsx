import React from "react";
import { BrowserRouter as Router, Routes,Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import DepartmentList from "./Pages/DepartmentList";
import LoginUser from "./components/registration/Registration";
import DoctorList from "./components/doctorlist/Doctorlist";
import AppointmentForm from "./components/form/AppointmentForm";
import PageNotFound from "./components/pagenotfound/PageNotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route  path="/"  element={<Landing/>} />
        <Route  path="/department"  element={<DepartmentList/>} />
        <Route  path="/login"  element={<LoginUser/>} />
        <Route  path="/doctorlist"  element={<DoctorList/>} />
        <Route  path="/appointmentForm" element={<AppointmentForm/>} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
    </Router>
  );
}
