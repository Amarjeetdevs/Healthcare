import React, { useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

ReactModal.setAppElement("#root"); // Set the root element for accessibility

function DoctorPopup({ people, onClose }) {
  const navigate = useNavigate();

  const openform = () => {
    navigate("/appointmentForm");
  };
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="fixed inset-0 flex p-12 items-center justify-center"
      overlayClassName="fixed inset-0 bg-black opacity-82"
      contentLabel="Doctor Popup"
    >
      <div className="bg-white border border-gray-300 rounded-lg p-12 w-2/3 mx-auto my-0 flex items-center">
        <div className="w-1/2 text-center relative">

          <div className="rounded-full h-32 w-32 overflow-hidden relative">
            <img
              src={people.imageUrl}
              alt="not found"
              className="rounded-full w-full h-full"
            />
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {/* <div className="absolute inset-0 bg-gradient-to-br from-red-500 to-blue-500 rounded-full" /> */}
            </div>
          </div>
        </div>

        <div className="w-1/2">

          <h2 className="text-lg font-semibold">{people.name}</h2>
          <p>Degree: {people.email}</p>
          <p>Experience: {people.roll} years</p>

          <button
            className="mt-4 text-red-800 hover-text-red-700 cursor-pointer right-24"
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} style={{ height: '30px' }} />
          </button>
          <button onClick={openform} className="bg-blue-800 text-white mx-6 px-4 py-2 rounded-lg">
            Book appointment
          </button>
        </div>
      </div>
    </ReactModal>
  );
}

export default DoctorPopup;
