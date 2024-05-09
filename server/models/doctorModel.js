const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    doctorName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },  
   
    mobileNumber: {
      type: Number,
      required: false,
      unique: false,
      
    },
    age: {
        type: String,
        required: false,
        unique: false,
        
      },
      department: {
        type: String,
        required: false,
        unique: false,
      },
      qualification: {
        type: String,
        required: false,
        unique: false,
      },
      fees: {
        type: Number,
        required: true,
      },
      password: {
      type: String,
      required: true,
      min: 8,
    }, address: {
      street: String,
      city: String,
      state: String,
      postalCode: String
  },
  gender: {
      type: String
  },
  specialization: {
      type: String
  },
  experience: {
      type: Number
  },
  certifications: {
      type: [String]
  },
  profilePicture: {
      type: String
  },
  languagesSpoken: {
      type: [String]
  },
  bio: {
      type: String
  },
  rating: {
      type: Number
  },
  reviews: {
      type: [String]
  },
  consultationFee: {
      type: Number
  },
  insuranceAccepted: {
      type: [String]
  },
  linkedAccounts: {
      socialMedia: {
          facebook: String,
          twitter: String,
      },
      professionalNetworking: {
          linkedIn: String
      }
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
  availability: [
    {
        dayOfWeek: {
            type: String,
            enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            required: true
        },
        timeSlots: [
            {
                startTime: {
                    type: String,
                    required: true
                },
                endTime: {
                    type: String,
                    required: true
                }
            }
        ]
    }
]
 
  });
  
  module.exports = mongoose.model("Doctors", doctorSchema);
  