import React, { useState, useEffect } from 'react';
import DoctorPopup from '../doctordetails/DoctorDetails';
import axios from 'axios';
import { getAllDoctorRoutes } from '../../chat_utils/APIRoutes';
import Hero from '../hero/Hero';


export default function DoctorList() {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [doctorsData, setAllDocotrsData] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const openPopup = (people) => {
    setSelectedDoctor(people);
  };

  const closePopup = () => {
    setSelectedDoctor(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(getAllDoctorRoutes);
        setAllDocotrsData(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDepartmentChange = (e) => {
    const selectedDept = e.target.value;
    setSelectedDepartment(selectedDept);
    if (selectedDept === 'All') {
      setFilteredDoctors(doctorsData); ``
    } else {
      const filtered = doctorsData.filter(doctor => doctor.department === selectedDept);
      setFilteredDoctors(filtered);
    }
  };
  console.log(doctorsData)
  return (
    <div className='min-h-screen bg-gray-100'>
      <Hero />
      {loading ?
        (<div className='flex justify-center items-center pt-40'>
          <span className="loading loading-ball text-blue-900 loading-lg"></span>
          <span className="loading loading-ball loading-lg"></span><span className="loading loading-ball text-blue-900 loading-lg"></span>
        </div>
        ) : (
          <>

            <div className=' pr-20'>
    
              <div className='flex items-end  relative  justify-end'>
              <h3 className='text-black text-xl font-bold font-mono mr-2 pb-1'>Select Department</h3>
                
                <select
                  className='bg-amber-400    text-cyan-950 font-bold shadow-sm mt-24 border-green-50 rounded-lg'
                  onChange={handleDepartmentChange} value={selectedDepartment}>
                  <option
                  className='bg-cyan-800 text-white hover:bg-red-500'
                    value="All">All Departments</option>

                  <option  value="Pediatrics">Pediatrics</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="ENT">ENT (Otolaryngology)</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Gynecology">Gynecology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Urology">Urology</option>
                  <option value="Dietetics">Dietetics</option>
                  <option value="Rheumatology">Rheumatology</option>
                  <option value="Pulmonology">Pulmonology</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Obstetrics & Gynecology">Obstetrics & Gynecology</option>


                </select>
              </div>
            </div>

            <ul role="list" className="divide-y divide-gray-100 pb-40 px-40">
              {filteredDoctors.map((person) => (
                <li key={person.email} className="py-6">
                  <div className="card card-side bg-cyan-900 text-white shadow-xl">
                    <div className="avatar p-12">
                      <div className="w-32  h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={person.profilePicture} />
                      </div>
                    </div>
                    <div className="card-body">
                      <h2 className="card-title">{person.doctorName}</h2>
                      <p className="text-sm text-gray-300">{person.email}</p>
                      <p className="text-lg pt-4 text-gray-200">{person.department}</p>

                      <div className="card-actions justify-end">
                        <button className="btn btn-primary bg-violet-800 hover:bg-slate-700 text-white" onClick={() => openPopup(person)}>More...</button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>




          </>
        )
      }
      {selectedDoctor && (
        <DoctorPopup people={selectedDoctor} onClose={closePopup} />
      )}
    </div>
  );
}
