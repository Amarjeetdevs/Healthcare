import React, { useState, useEffect } from 'react'
import { Newappointment, paymentroutes } from '../chat_utils/APIRoutes'
import { useLocation, useNavigate,  } from "react-router-dom";
import axios from 'axios';

export default function PaymentSummary() {
  // window.onbeforeunload = function() {
  //   return "Dude, are you sure you want to leave? Think of the kittens!";
  // }
  // window.location.reload(false);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [paymentId, setPaymentId] = useState('');
  const [orderId, setOrderId] = useState('');
  const [signature, setSignatureId] = useState('');
  const [paymentStarted, setPaymentStarted] = useState(false);
  const location = useLocation();


  const searchParams = new URLSearchParams(location.search);
  const userName = searchParams.get("userName");
  const userId = searchParams.get("userId");
  const doctorId = searchParams.get("doctorId");
  const doctorName = searchParams.get("doctorName")
  const email = searchParams.get("email");
  const purpose = searchParams.get("purpose");
  const consultationFee = searchParams.get("consultationFee");
  const selectedDate = searchParams.get("selectedDate");
  const selectedTime = JSON.parse(searchParams.get("selectedTime"));

  useEffect(() => {
    if (userName == null) {
      navigate("/doctorlist");
      // window.location('/doctorlist')
    }
  }, []);



  console.log("Received data:", { userName,doctorId,userId, doctorName,email, purpose, consultationFee, selectedDate, selectedTime });


  function generateRandomId(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomId += chars.charAt(randomIndex);
    }
    return randomId;
  }

  // Usage
  const randomId = generateRandomId(10);
  console.log('randomId', randomId);
  const amount = consultationFee * 100;
  const currency = 'INR'
  const reciptId = randomId

  useEffect(() => {
    const Bookappointment = async () => {
      try {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];

        const appointmentResponse = await axios.post(Newappointment, {
          user: userId,
          doctor: doctorId,
          appointmentDate: selectedDate,
          appointmentTime: selectedTime.startTime,
          todayDate: formattedDate,
          purpose,
          email,
          paymentId,
          orderId,
          signature,
          doctorName,
          userName,
        });

        console.log('response for data saving', appointmentResponse);
        handleBookingList();
      } catch (error) {
        console.log(error);
      }
    };

    if (paymentId && orderId && signature) {
      Bookappointment();
    }
  }, [paymentId, orderId, signature]);

  const handlePayment = async (e) => {
    
    if (!paymentStarted) {
      setPaymentStarted(true);
    }
    e.target.disabled = true;
    
    console.log('button clicked')
    const respose = await fetch(paymentroutes, {
      method: 'POST',
      body: JSON.stringify({
        amount,
        currency,
        receipt: reciptId
      }),
      headers: {
        "Content-Type": "application/json"
      },
    });

    const order = await respose.json();
    console.log('order', order);

    var options = {
      "key": "rzp_test_T3UOMZSb7ce6l7",
      amount,
      currency,
      "name": "Healthcare",
      "description": "Test Transaction",
      "image": "https://th.bing.com/th/id/OIP.8CLKo8-PzzwejDYH3zHl3wHaGN?w=231&h=193&c=7&r=0&o=5&dpr=1.3&pid=1.7",
      "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
      "handler": function (response) {
        setPaymentId(response.razorpay_payment_id);
        setOrderId(response.razorpay_order_id);
        setSignatureId(response.razorpay_signature)
        setOpen(true);
        // Bookappontment();
        // window.location('')
      },
      //   async function (response){
      //     const body = {
      //       razorpay_payment_id:response.razorpay_payment_id,
      //       razorpay_order_id:response.razorpay_order_id,
      //       razorpay_signature:response.razorpay_signature
      //     }
      //     console.log('response data to send for varification')
      //     const validateResponse = await fetch(`${paymentroutes}/validate`,{
      //       method:'POST',
      //       body:JSON.stringify(body),
      //       headers:{
      //         "Content-Type" : "application/json"
      //       },
      //     })
      //    const josnRes = await validateResponse.json();
      //    console.log('jsonRes',josnRes)
      // },
      "prefill": {
        "name": userName,
        "email": email,
        "contact": "6205645474"
      },
      "notes": {
        "address": "SMVITM Bantakal Udupi"
      },
      "theme": {
        "color": "#3399cc"
      }

    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.success', async function (response) {
      alert("successfull")

    });
    rzp1.on('payment.failed', function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
    const today = new Date();

    const formattedDate = today.toISOString().split('T')[0]; // Extract date part



  }

  const handleDoctorList = () => {
    navigate('/doctorlist')
  }
  const handleBookingList = () => {
   setTimeout(() => {
    navigate('/booking')
   }, 3000);
  }
  return (
    <div className='bg-slate-100 h-screen flex flex-col justify-center items-center rounded-lg p-8'>
      {open && (
        <div role="alert" className="alert alert-success flex items-center justify-center border-b-2 border-gray-400 pb-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex justify-center items-center flex-col">
            <span className="font-semibold mr-2 text-center">Your Appointment has been Booked Successfully!</span>
            <h3 className="font-semibold mb-1 text-center">Payment ID: {paymentId}</h3>
            {/* <h3 className="font-semibold mb-1 text-center">Order ID: {orderId}</h3>
      <h3 className="font-semibold text-center">Signature: {signature}</h3> */}
          </div>
        </div>
      )}


      <div className="mb-4 border-b-2 border-gray-400 pb-4">
        <h2 className="text-xl font-semibold mb-4">Payment Summary</h2>
        <p><span className="font-semibold">User Name:</span> {userName}</p>
        <p><span className="font-semibold">Email:</span> {email}</p>
        <p><span className="font-semibold">Purpose:</span> {purpose}</p>
        <p><span className="font-semibold">Consultation Fee:</span> {consultationFee}</p>
        <p><span className="font-semibold">Selected Date:</span> {selectedDate}</p>
        <p><span className="font-semibold">Selected Time:</span> {selectedTime.startTime} - {selectedTime.endTime}</p>
      </div>
      <button
        className='bg-blue-500 text-white p-3 rounded                
         transition duration-300'
        onClick={handlePayment}
     
        disabled={paymentStarted} 
        >
          {paymentStarted ? 'Paid' : 'Pay Now'}
        </button>
      <button
        className='bg-white text-gray-800 mt-10 p-3 rounded hover:bg-gray-200 transition duration-300'
        onClick={handleDoctorList}
      >Back to search doctor
      </button>
      <button
        className='bg-white text-gray-800 mt-10 p-3 rounded hover:bg-gray-200 transition duration-300'
        onClick={handleBookingList}
      >Check Your Appointment
      </button>
      {/* <p className="mt-4 text-gray-600">Don't want to proceed? <a href="#" className="underline">Check Details</a></p> */}
    </div>
  

)
}
