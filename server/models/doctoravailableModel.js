const mongoose = require("mongoose");

const doctorAvailabilitySchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctors',
        required: true
    },
    dayOfWeek: {
        type: [String],
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
 
});

module.exports = mongoose.model("DoctorAvailability", doctorAvailabilitySchema);
