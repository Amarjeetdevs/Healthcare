const DoctorAvailability = require('../models/doctoravailableModel');

const addAvailabilitySlot = async (req, res, next) => {
    try {
        const { doctorId, daysOfWeek, startTime, endTime } = req.body;
        console.log("Request body:", req.body);

        const newAvailabilitySlot = new DoctorAvailability({
            doctor: doctorId,
            dayOfWeek: daysOfWeek,
            startTime,
            endTime
        });

        await newAvailabilitySlot.save();
        
        res.status(201).json(newAvailabilitySlot);
    } catch (error) {
        next(error);
    }
};

const updateAvailabilitySlot = async (req, res, next) => {
    try {
        const availabilityId = req.params.availabilityId;
        const { dayOfWeek, startTime, endTime } = req.body;
        
        const updatedAvailabilitySlot = await DoctorAvailability.findByIdAndUpdate(
            availabilityId,
            { dayOfWeek, startTime, endTime },
            { new: true }
        );
        
        res.json(updatedAvailabilitySlot);
    } catch (error) {
        next(error);
    }
};

const deleteAvailabilitySlot = async (req, res, next) => {
    try {
        const availabilityId = req.params.availabilityId;
        await DoctorAvailability.findByIdAndDelete(availabilityId);
        res.json({ message: 'Availability slot deleted successfully' });
    } catch (error) {
        next(error);
    }
};

const getAllAvailabilitySlots = async (req, res, next) => {
    try {
        const availabilitySlots = await DoctorAvailability.find();
        console.log('availibilityslots',availabilitySlots);
        res.json(availabilitySlots);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    addAvailabilitySlot,
    updateAvailabilitySlot,
    deleteAvailabilitySlot,
    getAllAvailabilitySlots
};
