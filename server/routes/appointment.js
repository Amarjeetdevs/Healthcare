// const express = require('express');
const router = require("express").Router();
const {
    getAppointments,
    getAppointmentsByUser,
    getAppointmentsByDoctor,
    bookAppointment,
    cancelAppointment
} = require('../controllers/appointmentController');


router.get('/appointments', getAppointments);

// Fetch appointments by user
router.get('/appointments/user/:userId', getAppointmentsByUser);

// Fetch appointments by doctor
router.get('/appointments/doctor/:doctorId', getAppointmentsByDoctor);

// Book an appointment
router.post('/appointments/book', bookAppointment);

// Cancel an appointment
router.patch('/cancelbyuser/:appointmentId', cancelAppointment);



module.exports = router;