const Appointment = require('../models/appointmentModel'); 
const CancelAppointmentByUserSendMail = require('../utils/appointment.email');
const sendMail = require('../utils/sendemail')
const mongoose = require('mongoose');


const getAppointments = async (req, res, next) => {
    try {
        const appointments = await Appointment.find()
            .populate({
                path: 'user',
                select: 'username' 
            })
            .populate({
                path: 'doctor',
                select: 'doctorName' 
            });
        res.json(appointments);
    } catch (error) {
        next(error);
    }
};


// Fetch appointments by user
const getAppointmentsByUser = async (req, res, next) => {
    console.log('targeted');
    console.log('params',req.params)
    const {userId} = req.params;
    try {
        // const userId = mongoose.Types. ObjectId(req.params.userId);
        console.log('User ID:', userId); 
        
        const appointments = await Appointment.find({ user: userId }).populate('doctor');
        console.log('Appointments:', appointments); // Log the appointments to verify
        
        if (appointments.length === 0) {
            return res.status(404).json({ message: 'No appointments found for the user' });
        }
        
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments by user:', error);
        next(error);
    }
};


// Fetch appointments by doctor
const getAppointmentsByDoctor = async (req, res, next) => {
    const doctorId = req.params.doctorId;
    console.log('doctorId', doctorId);
    try {
      const appointments = await Appointment.find({ doctor: doctorId })
      .populate({
        path: 'user',
        select: 'username' 
    })
      console.log('appointments',appointments)

      res.json(appointments);
    } catch (error) {
      next(error);
    }
  };
  
  

// Book an appointment
const bookAppointment = async (req, res, next) => {
    console.log(req.body);
    try {
        const { userName, user, doctor, doctorName, appointmentDate, appointmentTime, todayDate, purpose, email, paymentId, orderId, signature } = req.body;

        const appointment = new Appointment({
            user:user,
            doctor:doctor,
            appointmentDate,
            appointmentTime,
            todayDate,
            purpose,
            email
        });
       console.log('data before saving',appointment)
        // Save the appointment to the database
        const savedAppointment = await appointment.save();
        // Send email
        await sendMail(req, res, doctorName, appointmentDate, appointmentTime, email, paymentId, orderId, signature);

        // Respond with the saved appointment
        res.status(201).json(savedAppointment);
    } catch (error) {
        // Handle errors
        next(error);
    }
};


// Cancel an appointment
const cancelAppointment = async (req, res, next) => {
     console.log(req.params);
     const {doctor, appointmentDate, appointmentTime,email,subject} = req.body.body;
     console.log(req.body);
    try {
        const appointment = await Appointment.findById(req.params.appointmentId);
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }
        appointment.status = 'cancelled_by_user';
        appointment.cancelRequested = true;
        const updatedAppointment = await appointment.save();
        await CancelAppointmentByUserSendMail(req, res, doctor, appointmentDate, appointmentTime,email,subject); 
        res.json(updatedAppointment);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAppointments,
    getAppointmentsByUser,
    getAppointmentsByDoctor,
    bookAppointment,
    cancelAppointment
};
