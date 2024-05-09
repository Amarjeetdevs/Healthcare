import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AddNewSlotFordoctor, GetAllSlotFordoctor } from '../../chat_utils/APIRoutes';

function AddAvailabilityForm() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [doctorId, setDoctorId] = useState('');
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [allSlotAvailable, setAllSlotAvailable] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post(AddNewSlotFordoctor, {
                doctorId,
                daysOfWeek: selectedDays,
                startTime,
                endTime
            });
            setSuccess(true);
                   alert('New availability slot added:', response.data);
        } catch (error) {
            setError(error.message); // Set error message to display in the alert
            alert('Error adding availability slot:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDaySelect = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedDays(selectedOptions);
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await axios.get(GetAllSlotFordoctor);
                setAllSlotAvailable(response.data);
                console.log(response);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);
console.log(allSlotAvailable)
    return (
        <>
            <button className="btn bg-green-600 text-white border border-cyan-600 hover:border-gray-300" onClick={() => document.getElementById('my_modal_4').showModal()}>
                Schedule time
            </button>
  
        
            <dialog id="my_modal_4" className="modal">
                <div className="modal-box w-11/12 bg-slate-500 text-black max-w-5xl">
                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-4">
                        <div className="mb-4">
                            <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700">Doctor ID</label>
                            <input type="text" id="doctorId" value={doctorId} onChange={(e) => setDoctorId(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dayOfWeek" className="block text-sm font-medium text-gray-700">Day(s) of Week</label>
                            <div className="flex flex-wrap mb-2">
                                {selectedDays.map((day, index) => (
                                    <span key={index} className="btn btn-info text-white px-2 py-1 rounded-md mr-2 mb-2">{day}</span>
                                ))}
                            </div>
                            <select multiple id="dayOfWeek" value={selectedDays} onChange={handleDaySelect} className="border border-gray-300 rounded-md px-3 py-2 w-full" required>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                            <input type="text" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                            <input type="text" id="endTime" value={endTime} onChange={(e) => setEndTime(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2 w-full" required />
                        </div>
                        <button type="submit" className="btn btn-info text-white px-4 py-2 rounded-md transition duration-300 hover:bg-blue-600">Add Availability Slot</button>
                    </form>
                    <div className="modal-action">
                        <form className="flex items-center justify-between">
                            <button className="btn bg-red-600">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>

            <div className="overflow-x-auto">
                <table className="table text-white font-bold table-zebra">
                    <thead>
                        <tr className="text-white text-xl">
                            <th>S.No</th>
                            <th>Doctor Id</th>
                            <th>Day of week</th>
                            <th>Start time</th>
                            <th>End time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center"><div className="loading loading-dots loading-lg"></div></td>
                            </tr>
                        ) : (
                            allSlotAvailable.map((slot, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{slot.doctor}</td>
                                    <td>{slot.dayOfWeek}</td>
                                    <td>{slot.startTime}</td>
                                    <td>{slot.endTime}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default AddAvailabilityForm;
