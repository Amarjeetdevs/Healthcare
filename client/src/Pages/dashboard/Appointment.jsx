import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllappointmentList } from '../../chat_utils/APIRoutes';

export default function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getAllappointmentList); // Adjust the URL according to your API endpoint
        setAppointments(response.data);
        console.log('response data',response.data)
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally  {
        setLoading(false);
      }
      
      
    };

    fetchAppointments();
  }, []);

  return (
    <div className='text-white text-2xl font-bold'>

      <div className="overflow-x-auto">
      <table className="table text-white font-bold  table-zebra">
          <thead>
            <tr className='text-white font-bold text-2xl'>
              <th>User</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Time</th>
              <th>status</th>
              <th>Booking Date</th>
              

            </tr>
          </thead>
          <tbody>
          {loading && (
            <tr>
              <td colSpan="9" className="text-center py-4">
                <div className="loading loading-dots loading-lg"></div>
              </td>
            </tr>
          )}
            {appointments.map(appointment => (
              <tr key={appointment._id}>
                <td>{appointment.user.username}</td>
                <td>{appointment.doctor.doctorName}</td>
                <td>{appointment.appointmentDate}</td>
                <td>{appointment.appointmentTime}</td>
                <td>{appointment.todayDate}</td>
                                                     
                <td 
                  className='text-green-500'
                >{appointment.status}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
