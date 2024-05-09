import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAllDoctorRoutes, registerDoctor } from '../../chat_utils/APIRoutes';

export default function Doctors() {
  const [formData, setFormData] = useState({
    doctorName: '',
    email: '',
    mobileNumber: '',
    age: '',
    department: '',
    qualification: '',
    fees: '',
    password: ''
  });
  const [loading, setLoading] = useState(false); 

  const [doctorsData, setAllDoctorsData] = useState([]); 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Form data:', formData);
      const response = await axios.post(registerDoctor, formData);
      console.log('Doctor created successfully:', response.data);
    
      setFormData({
        doctorName: '',
        email: '',
        mobileNumber: '',
        age: '',
        department: '',
        qualification: '',
        fees: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating doctor:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(getAllDoctorRoutes);
        setAllDoctorsData(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);




  return (
    <>
      <button className="btn bg-green-600 text-white" onClick={() => document.getElementById('my_modal_4').showModal()} >Add Doctor</button>


      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 bg-cyan-600 text-white max-w-5xl">


          <div className='flex items-center justify-center'>
            <div className="card shrink-0 bg-white w-full max-w-xl shadow-2xl">
              <form className="card-body grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Doctors Name</span>
                  </label>
                  <input name="doctorName" value={formData.doctorName} onChange={handleChange} type="text" placeholder="Doctors Name" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mobile Number</span>
                  </label>
                  <input name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} type="number" placeholder="Mobile Number" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input name="age" value={formData.age} onChange={handleChange} type="number" placeholder="Age" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Department</span>
                  </label>
                  <input name="department" value={formData.department} onChange={handleChange} type="text" placeholder="Department" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Qualification</span>
                  </label>
                  <input name="qualification" value={formData.qualification} onChange={handleChange} type="text" placeholder="Qualification" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Fees</span>
                  </label>
                  <input name="fees" value={formData.fees} onChange={handleChange} type="number" placeholder="Fees" className="input input-bordered" required />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input name="password" value={formData.password} onChange={handleChange} type="password" placeholder="Password" className="input input-bordered" required />
                </div>

                <div className="form-control pt-2 col-span-2">
                  <button type="submit" className="btn btn-primary">Create new doctor</button>
                </div>
              </form>
            </div>
          </div>

          <div className="modal-action">

            <form className="flex items-center justify-between">

              <button className="btn bg-red-600">Close</button>
            </form>


          </div>

        </div>
      </dialog>


      <div className="overflow-x-auto">
        <table className="table text-white font-bold  table-zebra">
          <thead>
            <tr className="text-white text-xl">
              <th>S.No</th>
              <th> Doctor name</th>
              <th>Email</th>
              <th>Contact</th>
              <th>Age</th>
              <th>Department</th>
              <th>Qualification</th> 
              <th>Fees</th>
              <th>Password</th>

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
            {doctorsData.map((doctor, index) => (
              <tr key={doctor._id}>
                <th>{index + 1}</th>
                <td>{doctor.doctorName}</td>
                <td>{doctor.email}</td>
                <td>{doctor.mobileNumber}</td>
                <td>{doctor.age}</td>
                <td>{doctor.department}</td>
                <td>{doctor.qualification}</td>
                <td>{doctor.fees}</td>
                <td>{doctor.password}</td>




                {/* <td>
                <button className="bg-red-500" onClick={() => handleDelete(user._id)}>Delete</button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>


      </div>

    </>
  );
}
