import React, { useState, useEffect } from "react";
// import PersonDataStorage from "../../artifacts/contracts/PersonDataStorage.sol/PersonalDataStorage.json";
import MedicalRecords from '../../artifacts/contracts/MedicalRecord.sol/MedicalRecords.json'
import axios from "axios";
import { ethers } from "ethers";
import { allUsersRoute } from "../../chat_utils/APIRoutes";



// Utility function to initialize provider
const initializeProvider = async () => {
  try {
    const url = "http://localhost:8545";
    const provider = new ethers.JsonRpcProvider(url);
    const signer = await provider.getSigner();
    console.log("signer:::::::", signer);
    console.log("Provider initialized successfully:", provider);
    return provider;
  } catch (error) {
    console.error("Error initializing provider:", error);
    throw error;
  }
};




export default function AppointmentForm() {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);


  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState('');
  const [allergies, setAllergies] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [recordId, setRecordId] = useState('');
  const [medicatData, setMedicalData] = useState('');


  const [signer, setSigner] = useState(null);
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';


  useEffect(() => {
    const initialize = async () => {
      try {
        const providerInstance = await initializeProvider();
        const signerInstace = providerInstance.getSigner();
        const contractInstance = new ethers.Contract(
          contractAddress,
          MedicalRecords.abi,
          providerInstance
        );
        setSigner(signerInstace);
        setContract(contractInstance);
        setProvider(providerInstance);
        const blockNumber = await providerInstance.getBlockNumber();
        console.log("Block Number:", blockNumber);



      } catch (error) {
        console.error("Error initializing:", error);
      }
      0
    };
    initialize();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (contract && provider) {
          const connectedContract = contract.connect(provider);
          const MedicalData = await connectedContract.getRecord(recordId); // Pass the recordId as an argument
          setMedicalData(MedicalData);
          console.log("Record Data:");
          console.log("Timestamp:", MedicalData[0].toString());
          console.log("Name:", MedicalData[1]);
          console.log("Age:", MedicalData[2].toString());
          console.log("Gender:", MedicalData[3]);
          console.log("Blood Type:", MedicalData[4]);
          console.log("Allergies:", MedicalData[5]);
          console.log("Diagnosis:", MedicalData[6]);
          console.log("Treatment:", MedicalData[7]);

          // You can use fetched data further as needed
        }
      } catch (error) {
        console.error("Error fetching record data:", error);
      }
    };

    fetchData();

    return () => {

    };
  }, [contract, provider, recordId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!contract) {
      alert("Contract is not loaded.");
      return;
    }


    try {
      const wallet = new ethers.Wallet(privateKey, provider);
      const contractWithSigner = contract.connect(wallet);
      console.log('contractWithSigner::::', contractWithSigner);

      const transaction = await contractWithSigner.addRecord(
        name,
        age,
        gender,
        bloodType,
        allergies,
        diagnosis,
        treatment

      );
      const receipt = await transaction.wait();

      console.log("Transaction receipt:", receipt);

      if (receipt.status === 1) {
        alert("Data sent to the local blockchain!");
      } else {
        alert("Transaction failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error sending data to the local blockchain");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(allUsersRoute);
        setUsers(response.data);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();

  }, []); 

  // const handleDelete = async (userId) => {
  //   try {
   
  //     const confirmed = window.confirm('Are you sure you want to delete this user?');
  //     if (!confirmed) {
  //       return; 
  //     }
  //     console.log('Deleting user with ID:', userId); 
  //     await axios.delete(`http://localhost:50001/api/auth/users/${userId}`);
  //     console.log('User deleted successfully');
     
  
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };


  return (

    <>

    <>
      <div className="bg-cyan-700">
        <button className="btn  bg-orange-600 text-white" onClick={() => document.getElementById('my_modal_4').showModal()} >Record Log</button>
        <button className="btn mx-14 bg-green-600 text-white" onClick={() => document.getElementById('my_modal_5').showModal()} >Add Log</button>
      </div>

      <dialog id="my_modal_5" className="modal">
        <div className="modal-box w-11/12 bg-white text-white max-w-5xl">

          <form className="bg-white" onSubmit={handleSubmit}>

            <div className=" px-64 py-20">
              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Profile
                </h2>



                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      name
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="name"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      age
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="number"
                          name="age"
                          id="age"
                          value={age}
                          required
                          onChange={(e) => setAge(e.target.value)}
                          autoComplete="age"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="age"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-4">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      gender
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="gender"
                          id="gender"
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          autoComplete="gender"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="gender"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-4">
                    <label
                      htmlFor="fathername"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      BloodType
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="bloodType"
                          id="bloodType"
                          value={bloodType}
                          onChange={(e) => setBloodType(e.target.value)}
                          autoComplete="fathername"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="BloodType"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="sm:col-span-4">
                    <label
                      htmlFor="allergies"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      allergies
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="allergies"
                          id="allergies"
                          value={allergies}
                          onChange={(e) => setAllergies(e.target.value)}
                          autoComplete="fathername"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="allergies"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="sm:col-span-4">
                    <label
                      htmlFor="fathername"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      diagnosis
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="diagnosis"
                          id="diagnosis"
                          value={diagnosis}
                          onChange={(e) => setDiagnosis(e.target.value)}
                          autoComplete="fathername"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="diagnosis"
                        />
                      </div>
                    </div>
                  </div>


                  <div className="sm:col-span-4">
                    <label
                      htmlFor="fathername"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      treatment
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <input
                          type="text"
                          name="treatment"
                          id="treatment"
                          value={treatment}
                          onChange={(e) => setTreatment(e.target.value)}
                          autoComplete="treatment"
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="treatment"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center px-64 mb-44 justify-end gap-x-6">
              <button
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Proceed
              </button>
            </div>
          </form>


          <div className="modal-action">

            <form className="flex items-center justify-between">

              <button className="btn bg-red-600">Close</button>
            </form>


          </div>

        </div>
      </dialog>





      <dialog id="my_modal_4" className="modal">
        <div className="modal-box w-11/12 bg-slate-500 text-white max-w-5xl">
          <h3 className="font-bold text-xl">Patient Record log</h3>
          <p className="py-4">Please enter the Id record number</p>
          <div className="sm:col-span-4">
            <label htmlFor="recordId" className="block text-sm font-medium leading-6 text-gray-900">

            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="number"
                  name="recordId"
                  id="recordId"
                  value={recordId}
                  onChange={(e) => setRecordId(e.target.value)}
                  autoComplete="recordId"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Record ID"
                />
              </div>
            </div>
          </div>

          <h3 className="font-bold text-lg text-white">Record Data</h3>
          {medicatData && (
            <div className="overflow-x-auto">
              <table className="table table-zebra text-white">
                <thead>
                  <tr>
                    <th>Field</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Timestamp</td>
                    <td>{new Date(parseInt(medicatData[0].toString()) * 1000).toLocaleString()}</td>
                  </tr>


                  <tr>
                    <td>Name</td>
                    <td>{medicatData[1]}</td>
                  </tr>
                  <tr>
                    <td>Age</td>
                    <td>{medicatData[2].toString()}</td>
                  </tr>
                  <tr>
                    <td>Gender</td>
                    <td>{medicatData[3]}</td>
                  </tr>
                  <tr>
                    <td>Blood Type</td>
                    <td>{medicatData[4]}</td>
                  </tr>
                  <tr>
                    <td>Allergies</td>
                    <td>{medicatData[5]}</td>
                  </tr>
                  <tr>
                    <td>Diagnosis</td>
                    <td>{medicatData[6]}</td>
                  </tr>
                  <tr>
                    <td>Treatment</td>
                    <td>{medicatData[7]}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          <div className="modal-action">
            <button className="btn mr-24 btn-accent">Send Files</button>
            <form className="flex items-center justify-between">

              <button className="btn bg-red-600">Close</button>
            </form>


          </div>
        </div>
      </dialog>
    
    
      <div className="overflow-x-auto">
        <table className="table text-white font-bold table-zebra">
          <thead>
            <tr  className="text-white text-xl">
            <th>S.no</th>
              <th>Username</th>
              <th>Email</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
          {loading && (
      
        <td colSpan="9" className="text-center py-4">
          <div className="loading loading-dots loading-lg"></div>
        </td>
    
      )}
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th> 
                <td>{user.username}</td> 
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                {/* <td>
                <button className="bg-red-500" onClick={() => handleDelete(user._id)}>Delete</button>
              </td> */}
              </tr>
            ))}
          </tbody>
        </table>


      </div>

    </>
    </>

  );
}
