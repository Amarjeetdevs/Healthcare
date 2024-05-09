const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
    user: { 
          type:mongoose.Schema.Types.ObjectId,
          ref:'Users',
         required: true 
        },
    doctor: { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctors',
        required: true
        },
    appointmentDate: { 
        type: String, 
        required: true 
    },

    appointmentTime: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String,
         enum: ['active', 'cancelled_by_doctor', 'cancelled_by_user'], 
         default: 'active' 
        },
    cancelRequested: { 
        type: Boolean, 
        default: false 
    },
    todayDate:{
        type:String,
        required:true
    },
    purpose:{
        type:String
    },
    email:{
        type:String
    },
      


});


const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
