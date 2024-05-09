import React, { useState, useEffect } from 'react';
import axios from 'axios';
import process from 'process';
import { cancelbyuser, getAllappointmentListByUser } from '../../chat_utils/APIRoutes';
import Hero from '../hero/Hero';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Get the user ID from local storage
      const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
      const username = data?.username;
      const userId = data._id;
      const email = data.email;
      console.log('email', email)
      if (username) {
        console.log('userName', username, userId);
        const response = await axios.get(`${getAllappointmentListByUser}/user/${userId}`);
        if (response.status === 404) {
          alert('No record found');
        }
        setAppointments(response.data);
        setLoading(false);
      } else {
        console.error('User ID not found in local storage.');
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {


    fetchAppointments();
  }, []);

  const handleToChat = () => {
    navigate('/newchat')
  }
  const handleCancelAppointment = async (appointmentId, doctor, appointmentDate, appointmentTime) => {
    const data = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
    const email = data.email;
    console.log('email', email)
    const subject = 'Cancelation';
    const confirmed = window.confirm('Do you really want to cancel the appointment?');
    if (confirmed) {
      try {
        const response = await axios.patch(`${cancelbyuser}/${appointmentId}`, {
          body: {
            doctor, appointmentDate, appointmentTime, email, subject
          }
        })
        console.log('Resposnse data', response.data);
        fetchAppointments();
      }
      catch (error) {
        console.log(error);
      }
    }
  }
  console.log(appointments)
  return (
    <div className='bg-gray-100 h-screen'>
      <Hero />
      <>
        <div className='flex justify-center items-center gap-44' >
          <div className=' w-1/2 pt-44'>
            <div role="tablist" className="tabs bg-gray-100 tabs-lifted">
              <input type="radio" name="my_tabs_2" role="tab"

                className="tab  bg-red-500   text-white font-bold" aria-label="Appointment" />

              <div role="tabpanel" className="tab-content  bg-white  text-black rounded-box p-6 border-white">
                {loading ? (
                  <div>
                    <span className="loading loading-spinner loading-sm"></span>
                    <span className="loading loading-spinner loading-md"></span>
                  </div>
                ) : (
                  <>
                    <h2
                      className='text-2xl font-bold ml-56 pb-6'
                    >Your Appointments</h2>

                    <div className='overflow-auto autofil:' style={{ maxHeight: '400px' }}>
                      <table className='w-full'>
                        <thead>
                          <tr>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Doctor</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {appointments.map((appointment, index) => (
                            <tr key={appointment._id} className={index % 2 === 0 ? 'bg-gray-300' : 'bg-white'}>
                              <td>{appointment.appointmentDate}</td>
                              <td>{appointment.appointmentTime}</td>
                              <td>{appointment.doctor.doctorName}</td>
                              <td>
                                <button
                                  onClick={() => handleCancelAppointment(appointment._id, appointment.doctor, appointment.appointmentDate, appointment.appointmentTime)}
                                  className={`p-1 m-2 rounded-md ${appointment.status === 'active' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 shadow-sm text-white hover:bg-red-600'
                                    }`}
                                  disabled={appointment.status !== 'active'}
                                >
                                  {appointment.status}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div></>

                )}
              </div>




              <input type="radio" name="my_tabs_2" role="tab" className="tab bg-cyan-700 text-white font-bold" aria-label="History" />

              <div role="tabpanel" className="tab-content bg-white border-base-300 rounded-box p-6">

                <h2> Your appointment history</h2>
              </div>

              {/* <input type="radio" name="my_tabs_2" role="tab" className="tab" aria-label="Tab 3" />
  <div role="tabpanel" className="tab-content bg-base-100 border-base-300 rounded-box p-6">Tab content 3</div> */}
            </div>
          </div>
          <div className="card w-96  relative text-neutralcontent mt-40 text-white bg-cyan-900">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Communicate With doctor</h2>
              <p>CHAT HERE</p>
              <div className="card-actions justify-end">
                <button onClick={handleToChat} className="btn bg-violet-600 text-white">Proceed</button>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>

  );
}
