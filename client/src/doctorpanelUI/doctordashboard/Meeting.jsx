import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GetIdForDoctor, getAppointmentsListByDoctor } from '../../chat_utils/APIRoutes';
import process from 'process';

export default function Meeting( ) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [doctorId,setDoctorId] = useState(''); 

  const [doctorUser, setDoctorUser] = useState({
    username: '',
    email: '',
   
  });
  useEffect(() => {
    const fetchDoctorData = () => {
      const doctorData = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
      if (doctorData) {
        const parsedData = JSON.parse(doctorData);
        setDoctorUser({
          username: parsedData.username,
          email: parsedData.email,
          // Set other fields similarly
        });
      }
    };

    fetchDoctorData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const response = await axios.post(GetIdForDoctor, { email: doctorUser.email, username: doctorUser.username });
        setDoctorId(response.data.doctor._id);
        console.log('response', response);

      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData();
  }, [doctorUser.username, doctorUser.email]);

  // if (newdoc !== undefined) {
    const newdoc = '660539dc06bf2e7f8a8ddd8d'
// const newdoc = doctorId;

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      setLoading(true); // Set loading to true before making the request
      const response = await axios.get(`${getAppointmentsListByDoctor}/${doctorId}`);
      if (response.data.length > 0) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  fetchAppointments(); // Call the function to initiate fetching

}, [doctorId]); // Add doctorId as a dependency

   

console.log('docotrId',doctorId);
 console.log(appointments)
 
  return (
    <div className='text-white text-2xl font-bold'>
    <div className="overflow-x-auto">
      <table className="table text-white font-bold  table-zebra">
        <thead>
          <tr className='text-white font-bold text-2xl'>
            <th>Patient</th>
            <th>Day</th>
            <th>Time</th>
            <th>status</th>
            <th>Booking Date</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                <div className="loading loading-dots loading-lg"></div>
              </td>
            </tr>
          ) : (
            appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">No appointments available</td>
              </tr>
            ) : (
              appointments.map(appointment => (
                <tr key={appointment._id}>
                  <td>{appointment.user.username}</td>
                  <td>{appointment.appointmentDate}</td>
                  <td>{appointment.appointmentTime}</td>
                  <td>{appointment.todayDate}</td>
                  <td className='text-orange-500'>{appointment.status}</td>
                </tr>
              ))
            )
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
}
