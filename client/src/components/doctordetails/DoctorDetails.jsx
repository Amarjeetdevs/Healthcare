import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Resend } from 'resend';
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, } from '@fortawesome/free-solid-svg-icons'; // Import the star icon
import { faLinkedin, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import process from "process";
import PaymentSummary from "../../payments/PaymentSummary";
import { Newappointment } from "../../chat_utils/APIRoutes";
// import { error } from "console";
ReactModal.setAppElement("#root");



function DoctorPopup({ people, onClose }) {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [purpose, setPurpose] = useState(null);
  const [showPaymentSummary, setShowPaymentSummary] = useState(false);
  const navigate = useNavigate();


  const handleTimeSelection = (time, date) => {
    setSelectedTime(time);
    setSelectedDate(date);
  };
  const handleBooking = async () => {
    console.log(selectedTime);
    if (selectedDate && selectedTime) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0]; // Extract date part
      const confirmationMessage = `Confirm booking appointment with Doctor ${people.doctorName} on ${selectedDate} at ${selectedTime.startTime} ?`;

      if (window.confirm(confirmationMessage)) {
        console.log(userName, people.doctorName, selectedDate, selectedTime.startTime);
        const PaymentPageRoute = '/payments';
        try {

          // navigate(`${PaymentPageRoute}?userName=${userName}&userId=${userId}&doctorId=${people._id}&doctorName=${people.doctorName}&email=${email}&purpose=${purpose}&consultationFee=${people.consultationFee}&selectedDate=${selectedDate}&selectedTime=${JSON.stringify(selectedTime)}`);
          navigate(`${PaymentPageRoute}?userName=${userName}&userId=${userId}&doctorId=${people._id}&doctorName=${people.doctorName}&email=${email}&purpose=${purpose}&consultationFee=${people.consultationFee}&selectedDate=${selectedDate}&selectedTime=${JSON.stringify(selectedTime)}`);

        } catch (error) {
          alert('Something went wrong')
          console.error('Error booking appointment:', error);
        }
      }
    } else {
      window.alert("Please select date and time for the appointment.");
    }
  };

 console.log('time',selectedTime)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
        console.log('local Storage data id', data._id, people._id);
        if (data !== null) {
          setUserId(data._id);
          setUserName(data.username);
          setEmail(data.email);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

  }, []);

  const filledStars = parseFloat(people.rating).toFixed(1);

  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="fixed inset-0 flex mt-12 p-12 items-center justify-center"
      overlayClassName="fixed inset-0 bg-black opacity-82"
      contentLabel="Doctor Popup"
    >
      <div className="bg-white border border-gray-300 rounded-lg px-12 w-2/3 mx-auto my-0 flex items-center relative">
        <button
          className="mt-4 text-red-800 hover:text-red-700 cursor-pointer absolute top-1 right-4"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} style={{ height: '30px' }} />
        </button>
        <div className="w-1/2 text-center relative">
          <div className="bg-gray-00 p-12 rounded-md shadow-d">

            <div className="avatar p-6">
              <div className="w-32  h-32 rounded-full ring ring-danger ring-offset-base-100 ring-offset-2">

                <img
                  src={people.profilePicture}
                />
              </div>
            </div>
            <div className="absolute inset-0 rounded-full overflow-hidden"></div>

            <div className="flex flex-col items-start justify-start space-y-0">
              <p className="text-lg text-gray-500 font-bold"> {people.doctorName}</p>
              <p className="text-lg">

                <span className="">Gender</span> {people.gender}
              </p>
              <p className="text-lg">

                <span className="">Age:</span> {people.age}
              </p>
              <p className="text-lg">
                <span className="">Experience:</span> {people.experience} years
              </p>
              <p className="text-lg">
                <span className="">Department:</span> {people.department}
              </p>
              <p className="text-lg ">Specialization: {people.specialization}</p>
              <p className="text-lg">
                Mobile Number: {people.mobileNumber}
              </p>
              <p className="text-lg text-blue-400">
                {people.email}
              </p>
              <p className="text-lg text-green-500">
                <span className="font-semibold text-red-500">Consultation Fee:</span> {people.consultationFee}
              </p>
            </div>

          </div>
        </div>
        <div className="w-1/2">

          <div className=" p-6 rounded-md mt-10 shadow-xs">

            <p className="text-md">Qualification: {people.qualification}</p>
            <p className="text-md text-">Bio: {people.bio}</p>

            <p className="text-sm">Address: {people.address.street}, {people.address.city}, {people.address.state} - {people.address.postalCode}</p>

            <p className="text-md">Insurance Accepted: {people.insuranceAccepted.join(', ')}</p>
            <p className="text-md">Languages Spoken: {people.languagesSpoken.join(', ')}</p>

            <div className="text-xl space-x-4">
              <FontAwesomeIcon
                icon={faLinkedin}
                className="text-blue-600 cursor-pointer"
                onClick={() => window.open(people.linkedAccounts.professionalNetworking.linkedIn, '_blank')}
              />
              <FontAwesomeIcon
                icon={faFacebook}
                className="text-blue-600 cursor-pointer"
                onClick={() => window.open(people.linkedAccounts.socialMedia.facebook, '_blank')}
              />
              <FontAwesomeIcon
                icon={faTwitter}
                className="text-blue-600 cursor-pointer"
                onClick={() => window.open(people.linkedAccounts.socialMedia.twitter, '_blank')}
              />
            </div>



            <p className="text-lg">Reviews:</p>
            <ul className="list-disc list-inside">
              {people.reviews.map((review, index) => (
                <li key={index} className="text-lg">{review}</li>
              ))}
            </ul>
            <div className="flex items-center text-sm">

              <div className="rating rating-md ml-2">
                {[1, 2, 3, 4, 5].map((index) => (
                  <FontAwesomeIcon
                    key={index}
                    icon={faStar}
                    className={`text-yellow-500 ${index <= filledStars ? "checked" : ""}`}
                  />
                ))}
              </div>
            </div>

          </div>

          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <label htmlFor="my-drawer-4" className="drawer-button text-white bg-cyan-900 ml-24 mb-4 btn ">Book Appointment</label>
            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
              <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">



                <div className="mt-24 mb-40">
                  <ul className="mb-4 text-white text-xl">
                    <li>Username: {userName}</li>
                    <li>Doctor: {people.doctorName}</li>
                  </ul>
                  <div>
                    <h6 className="text-green-500 mb-2">Select available date</h6>


                    <ul>
                      {people.availability.map((availability, index) => (
                        <li key={index} className="mb-4">
                          <h6 className="text-lg font-semibold">{availability.dayOfWeek}</h6>
                          {availability.timeSlots.map((timeSlot, idx) => (
                            <button
                              key={idx}
                              className={`bg-orange-600 text-white py-1 px-2 rounded-md mr-2 mb-2 ${selectedDate === availability.dayOfWeek ? 'bg-green-600' : ''}`}
                              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                              onClick={() => handleTimeSelection(timeSlot, availability.dayOfWeek)}
                            >
                              {timeSlot.startTime} - {timeSlot.endTime}
                            </button>

                          ))}
                        </li>
                      ))}
                    </ul>


                  </div>
  
                  <div className="form-control">
                    <span className="label-text text-lime-50">Reason for Visit on {selectedDate},</span>
                    <label className="label cursor-pointer">


                      <textarea className="textarea w-full m-2" placeholder="purpose" required onChange={(e) => setPurpose(e.target.value)} />
                    </label>

                  </div>

                  <button
                    className="drawer-button text-white bg-cyan-700 btn px-6 my-4 mx-4 py-2 rounded-md transition duration-300 hover:bg-green-600"
                    onClick={handleBooking}
                    disabled={!selectedDate || !selectedTime}
                  >
                    Proceed
                  </button>


                </div>

              </ul>
            </div>
          </div>
        </div>
      </div>
      {showPaymentSummary && (
        <PaymentSummary

          doctorName={people.doctorName}
          userName={userName}
          email={email}
          purpose={purpose}
          consultationFee={people.consultationFee}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />

      )}
    </ReactModal>
  );
}

export default DoctorPopup;
