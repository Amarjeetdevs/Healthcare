const Doctor = require('./models/doctorModel')
const User = require('./models/userModel');
const mongoose = require('mongoose')
const conncetDatabase = require('./config/db')
const sampleData = [
  {
    doctorName: "Dr. Ananya Singh",
    email: "ananya.singh@example.com",
    mobileNumber: 9876543210,
    age: "40",
    department: "Pediatrics",
    qualification: "MBBS, MD (Pediatrics)",
    fees: 600,
    password: "password123",
    address: {
      street: "789 ABC Street",
      city: "Delhi",
      state: "Delhi",
      postalCode: "110001"
    },
    gender: "Female",
    specialization: "Pediatrician",
    experience: 18,
    certifications: ["Indian Academy of Pediatrics Certification"],
    profilePicture: "https://i.pinimg.com/originals/7e/91/b7/7e91b721691322422919eec7dc039618.jpg",
    languagesSpoken: ["English", "Hindi"],
    bio: "Passionate about child healthcare and development.",
    rating: 4.6,
    reviews: ["Amazing with kids!", "Highly knowledgeable and caring."],
    consultationFee: 700,
    insuranceAccepted: ["Insurance A", "Insurance B"],
    linkedAccounts: {
      socialMedia: {
        facebook: "https://www.facebook.com/ananyasinghpediatrics",
        twitter: "https://twitter.com/ananyasinghped"
      },
      professionalNetworking: {
        linkedIn: "https://www.linkedin.com/in/ananyasinghped"
      }
    },
    availability: [
      {
        dayOfWeek: "Monday",
        timeSlots: [
          {
            startTime: "08:00",
            endTime: "12:00"
          },
          {
            startTime: "15:00",
            endTime: "18:00"
          }
        ]
      },
      {
        dayOfWeek: "Wednesday",
        timeSlots: [
          {
            startTime: "09:00",
            endTime: "13:00"
          },
          {
            startTime: "16:00",
            endTime: "19:00"
          }
        ]
      }
    ]
  },
    {
      doctorName: "Dr. Nisha Gupta",
      email: "nisha.gupta@example.com",
      mobileNumber: 9988776655,
      age: "42",
      department: "Dermatology",
      qualification: "MBBS, MD (Dermatology)",
      fees: 900,
      password: "password789",
      address: {
        street: "789 PQR Street",
        city: "Bangalore",
        state: "Karnataka",
        postalCode: "560001"
      },
      gender: "Female",
      specialization: "Dermatologist",
      experience: 20,
      certifications: ["Dermatology Association of India Certification"],
      profilePicture: "https://thumbs.dreamstime.com/b/indian-beautiful-female-doctor-17989399.jpg",
      languagesSpoken: ["English", "Kannada"],
      bio: "Expert in skincare and dermatological treatments.",
      rating: 4.7,
      reviews: ["Great for skin problems!", "Very friendly and professional."],
      consultationFee: 1000,
      insuranceAccepted: ["Insurance E", "Insurance F"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/nishaguptaderm",
          twitter: "https://twitter.com/nishaguptaderm"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/nishaguptaderm"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
      doctorName: "Dr. Siddharth Joshi",
      email: "siddharth.joshi@example.com",
      mobileNumber: 9876541230,
      age: "48",
      department: "Ophthalmology",
      qualification: "MBBS, MS (Ophthalmology)",
      fees: 1000,
      password: "password101",
      address: {
        street: "456 LMN Street",
        city: "Chennai",
        state: "Tamil Nadu",
        postalCode: "600001"
      },
      gender: "Male",
      specialization: "Ophthalmologist",
      experience: 22,
      certifications: ["All India Ophthalmological Society Certification"],
      profilePicture: "https://th.bing.com/th/id/OIP.xmb76Waeoi8-DkLoJHw7zgHaH5?rs=1&pid=ImgDetMain",
      languagesSpoken: ["English", "Tamil"],
      bio: "Committed to eye care and vision health.",
      rating: 4.8,
      reviews: ["Excellent eye doctor!", "Very professional and thorough."],
      consultationFee: 1200,
      insuranceAccepted: ["Insurance G", "Insurance H"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/siddharthjoshiopt",
          twitter: "https://twitter.com/siddharthjoshiopt"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/siddharthjoshiopt"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
      doctorName: "Dr. Aarav Sharma",
      email: "aarav.sharma@example.com",
      mobileNumber: 9123409876,
      age: "37",
      department: "Neurology",
      qualification: "MBBS, DM (Neurology)",
      fees: 1100,
      password: "password112",
      address: {
        street: "123 EFG Street",
        city: "Hyderabad",
        state: "Telangana",
        postalCode: "500001"
      },
      gender: "Male",
      specialization: "Neurologist",
      experience: 14,
      certifications: ["Neurological Society of India Certification"],
      profilePicture: "https://www.pngitem.com/pimgs/m/194-1943739_indian-doctor-hd-png-download.png",
      languagesSpoken: ["English", "Telugu"],
      bio: "Expert in diagnosing and treating neurological disorders.",
      rating: 4.5,
      reviews: ["Very knowledgeable neurologist!", "Highly recommended for brain issues."],
      consultationFee: 1300,
      insuranceAccepted: ["Insurance I", "Insurance J"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/aaravsharmaneuro",
          twitter: "https://twitter.com/aaravsharmaneuro"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/aaravsharmaneuro"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
      doctorName: "Dr. Neha Reddy",
      email: "neha.reddy@example.com",
      mobileNumber: 9988776655,
      age: "39",
      department: "ENT",
      qualification: "MBBS, MS (ENT)",
      fees: 750,
      password: "password313",
      address: {
        street: "789 RST Street",
        city: "Pune",
        state: "Maharashtra",
        postalCode: "411001"
      },
      gender: "Female",
      specialization: "ENT Specialist",
      experience: 16,
      certifications: ["Indian Society of Otology Certification"],
      profilePicture: "https://img.freepik.com/premium-photo/indian-female-doctor-indian-nurse_714173-205.jpg",
      languagesSpoken: ["English", "Marathi"],
      bio: "Dedicated to ear, nose, and throat health.",
      rating: 4.6,
      reviews: ["Great ENT doctor!", "Very caring and attentive."],
      consultationFee: 900,
      insuranceAccepted: ["Insurance K", "Insurance L"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/neha.reddy.ent",
          twitter: "https://twitter.com/neha.reddy.ent"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/neha.reddy.ent"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
      doctorName: "Dr. Vikram Singh",
      email: "vikram.singh@example.com",
      mobileNumber: 9876567890,
      age: "44",
      department: "Psychiatry",
      qualification: "MBBS, MD (Psychiatry)",
      fees: 850,
      password: "password414",
      address: {
        street: "456 UVW Street",
        city: "Ahmedabad",
        state: "Gujarat",
        postalCode: "380001"
      },
      gender: "Male",
      specialization: "Psychiatrist",
      experience: 19,
      certifications: ["Indian Psychiatric Society Certification"],
      profilePicture: "https://thumbs.dreamstime.com/b/smiling-indian-male-doctor-stethoscope-medicine-profession-healthcare-concept-white-coat-over-grey-background-138824221.jpg",
      languagesSpoken: ["English", "Gujarati"],
      bio: "Expert in mental health diagnosis and treatment.",
      rating: 4.8,
      reviews: ["Highly compassionate psychiatrist!", "Helped me through tough times."],
      consultationFee: 950,
      insuranceAccepted: ["Insurance M", "Insurance N"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/vikram.singh.psych",
          twitter: "https://twitter.com/vikram.singh.psych"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/vikram.singh.psych"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
      doctorName: "Dr. Aishwarya Desai",
      email: "aishwarya.desai@example.com",
      mobileNumber: 9123456780,
      age: "36",
      department: "Dentistry",
      qualification: "BDS, MDS (Orthodontics)",
      fees: 500,
      password: "password515",
      address: {
        street: "123 XYZ Street",
        city: "Jaipur",
        state: "Rajasthan",
        postalCode: "302001"
      },
      gender: "Female",
      specialization: "Orthodontist",
      experience: 12,
      certifications: ["Indian Dental Association Certification"],
      profilePicture: "https://c8.alamy.com/comp/KRT8Y8/indian-female-medical-doctor-portrait-KRT8Y8.jpg",
      languagesSpoken: ["English", "Hindi"],
      bio: "Passionate about creating beautiful smiles.",
      rating: 4.7,
      reviews: ["Best orthodontist ever!", "Very gentle and skilled."],
      consultationFee: 600,
      insuranceAccepted: ["Insurance O", "Insurance P"],
      linkedAccounts: {
        socialMedia: {
          facebook: "https://www.facebook.com/aishwarya.desai.dent",
          twitter: "https://twitter.com/aishwarya.desai.dent"
        },
        professionalNetworking: {
          linkedIn: "https://www.linkedin.com/in/aishwarya.desai.dent"
        }
      },
      availability: [
        {
          dayOfWeek: "Monday",
          timeSlots: [
            {
              startTime: "08:00",
              endTime: "12:00"
            },
            {
              startTime: "15:00",
              endTime: "18:00",
            }
          ]
        },
        {
          dayOfWeek: "Wednesday",
          timeSlots: [
            {
              startTime: "09:00",
              endTime: "13:00"
            },
            {
              startTime: "16:00",
              endTime: "19:00"
            }
          ]
        }
      ]
    },
    {
        doctorName: "Dr. Rajesh Kumar",
        email: "rajesh.kumar@example.com",
        mobileNumber: 9123456780,
        age: "45",
        department: "Orthopedics",
        qualification: "MBBS, MS (Ortho)",
        fees: 800,
        password: "password789",
        address: {
          street: "23 MG Road",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400001"
        },
        gender: "Male",
        specialization: "Orthopedic Surgeon",
        experience: 20,
        certifications: ["Indian Orthopaedic Association Certification"],
        profilePicture: "https://c8.alamy.com/comp/2GGC26P/portrait-of-male-indian-doctor-standing-in-clinic-hospital-looking-at-camera-2GGC26P.jpg",
        languagesSpoken: ["English", "Hindi"],
        bio: "Renowned orthopedic surgeon with extensive experience.",
        rating: 4.9,
        reviews: ["Excellent doctor!", "Very caring and skilled."],
        consultationFee: 1000,
        insuranceAccepted: ["Insurance A", "Insurance B"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/rajeshkumarortho",
            twitter: "https://twitter.com/rajeshkumarortho"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/rajeshkumarortho"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Priya Sharma",
        email: "priya.sharma@example.com",
        mobileNumber: 9876549870,
        age: "45",
        department: "Gynecology",
        qualification: "MBBS, MS (Gynecology)",
        fees: 850,
        password: "password123",
        address: {
          street: "789 GHI Street",
          city: "Delhi",
          state: "Delhi",
          postalCode: "110002"
        },
        gender: "Female",
        specialization: "Gynecologist",
        experience: 21,
        certifications: ["Federation of Obstetric and Gynaecological Societies of India Certification"],
        profilePicture: "https://slidesbase.com/wp-content/uploads/2023/06/16-smiling-indian-female-doctor-medical-person-stock-photo_slidesbase_com-1.jpg",
        languagesSpoken: ["English", "Hindi"],
        bio: "Dedicated to women's health and wellness.",
        rating: 4.5,
        reviews: ["Highly recommended for women's health!", "Very caring and knowledgeable."],
        consultationFee: 900,
        insuranceAccepted: ["Insurance Q", "Insurance R"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/priya.sharma.gynae",
            twitter: "https://twitter.com/priya.sharma.gynae"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/priya.sharma.gynae"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Rahul Kapoor",
        email: "rahul.kapoor@example.com",
        mobileNumber: 9123456780,
        age: "55",
        department: "Orthopedics",
        qualification: "MBBS, MS (Orthopedics)",
        fees: 1100,
        password: "password456",
        address: {
          street: "456 LMN Street",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400002"
        },
        gender: "Male",
        specialization: "Orthopedic Surgeon",
        experience: 30,
        certifications: ["Indian Orthopaedic Association Certification"],
        profilePicture: "https://images.freeimages.com/images/premium/previews/1325/13258665-portrait-of-young-indian-doctor.jpg",
        languagesSpoken: ["English", "Marathi"],
        bio: "Expert in orthopedic surgery and bone health.",
        rating: 4.9,
        reviews: ["Excellent orthopedic surgeon!", "Very skilled and compassionate."],
        consultationFee: 1200,
        insuranceAccepted: ["Insurance S", "Insurance T"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/rahul.kapoor.ortho",
            twitter: "https://twitter.com/rahul.kapoor.ortho"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/rahul.kapoor.ortho"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Kavita Singhania",
        email: "kavita.singhania@example.com",
        mobileNumber: 9988776655,
        age: "48",
        department: "Oncology",
        qualification: "MBBS, DM (Oncology)",
        fees: 1200,
        password: "password789",
        address: {
          street: "789 PQR Street",
          city: "Bangalore",
          state: "Karnataka",
          postalCode: "560002"
        },
        gender: "Female",
        specialization: "Oncologist",
        experience: 25,
        certifications: ["National Cancer Grid Certification"],
        profilePicture: "https://image.freepik.com/free-photo/indian-female-doctor-portrait-south-indian-young-lady-doctor-with-stethoscope_527904-1632.jpg",
        languagesSpoken: ["English", "Kannada"],
        bio: "Dedicated to cancer diagnosis and treatment.",
        rating: 4.8,
        reviews: ["Highly skilled oncologist!", "Provided excellent cancer care."],
        consultationFee: 1300,
        insuranceAccepted: ["Insurance U", "Insurance V"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/kavita.singhania.onc",
            twitter: "https://twitter.com/kavita.singhania.onc"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/kavita.singhania.onc"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Sameer Kapoor",
        email: "sameer.kapoor@example.com",
        mobileNumber: 9876541230,
        age: "47",
        department: "Urology",
        qualification: "MBBS, MS (Urology)",
        fees: 1000,
        password: "password101",
        address: {
          street: "456 LMN Street",
          city: "Chennai",
          state: "Tamil Nadu",
          postalCode: "600002"
        },
        gender: "Male",
        specialization: "Urologist",
        experience: 23,
        certifications: ["Urological Society of India Certification"],
        profilePicture: "https://img.freepik.com/premium-photo/portrait-young-handsome-indian-man-doctor-white_251136-79251.jpg",
        languagesSpoken: ["English", "Tamil"],
        bio: "Committed to urinary tract and male reproductive health.",
        rating: 4.7,
        reviews: ["Excellent urologist!", "Very professional and caring."],
        consultationFee: 1100,
        insuranceAccepted: ["Insurance W", "Insurance X"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/sameer.kapoor.uro",
            twitter: "https://twitter.com/sameer.kapoor.uro"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/sameer.kapoor.uro"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Preeti Sharma",
        email: "preeti.sharma@example.com",
        mobileNumber: 9123409876,
        age: "41",
        department: "Dietetics",
        qualification: "MSc (Nutrition and Dietetics)",
        fees: 500,
        password: "password112",
        address: {
          street: "123 EFG Street",
          city: "Hyderabad",
          state: "Telangana",
          postalCode: "500002"
        },
        gender: "Female",
        specialization: "Dietitian",
        experience: 15,
        certifications: ["Indian Dietetic Association Certification"],
        profilePicture: "https://image.freepik.com/free-photo/indian-female-doctor-portrait-south-indian-young-lady-doctor-with-stethoscope_527904-1628.jpg",
        languagesSpoken: ["English", "Telugu"],
        bio: "Passionate about promoting healthy eating habits.",
        rating: 4.6,
        reviews: ["Great dietitian!", "Provided excellent nutrition advice."],
        consultationFee: 600,
        insuranceAccepted: ["Insurance Y", "Insurance Z"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/preeti.sharma.diet",
            twitter: "https://twitter.com/preeti.sharma.diet"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/preeti.sharma.diet"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Aditya Verma",
        email: "aditya.verma@example.com",
        mobileNumber: 9988776655,
        age: "39",
        department: "Rheumatology",
        qualification: "MBBS, MD (Rheumatology)",
        fees: 750,
        password: "password313",
        address: {
          street: "789 RST Street",
          city: "Pune",
          state: "Maharashtra",
          postalCode: "411002"
        },
        gender: "Male",
        specialization: "Rheumatologist",
        experience: 16,
        certifications: ["Indian Rheumatology Association Certification"],
        profilePicture: "https://thumbs.dreamstime.com/b/south-indian-doctor-smiling-portrait-36256096.jpg",
        languagesSpoken: ["English", "Marathi"],
        bio: "Expert in diagnosing and treating rheumatic diseases.",
        rating: 4.6,
        reviews: ["Great rheumatologist!", "Very caring and attentive."],
        consultationFee: 900,
        insuranceAccepted: ["Insurance AA", "Insurance BB"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/aditya.verma.rheum",
            twitter: "https://twitter.com/aditya.verma.rheum"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/aditya.verma.rheum"
          }
        },   availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Sonali Gupta",
        email: "sonali.gupta@example.com",
        mobileNumber: 9876567890,
        age: "44",
        department: "Pulmonology",
        qualification: "MBBS, MD (Pulmonology)",
        fees: 850,
        password: "password414",
        address: {
          street: "456 UVW Street",
          city: "Ahmedabad",
          state: "Gujarat",
          postalCode: "380002"
        },
        gender: "Female",
        specialization: "Pulmonologist",
        experience: 19,
        certifications: ["Indian Association of Respiratory Care Certification"],
        profilePicture: "https://img.freepik.com/free-photo/closeup-portrait-friendly-smiling-confident-female-indian-doctor_93675-48403.jpg?size=626&ext=jpg",
        languagesSpoken: ["English", "Gujarati"],
        bio: "Expert in diagnosing and treating respiratory diseases.",
        rating: 4.8,
        reviews: ["Highly compassionate pulmonologist!", "Provided excellent respiratory care."],
        consultationFee: 950,
        insuranceAccepted: ["Insurance CC", "Insurance DD"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/sonali.gupta.pulm",
            twitter: "https://twitter.com/sonali.gupta.pulm"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/sonali.gupta.pulm"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Kartik Reddy",
        email: "kartik.reddy@example.com",
        mobileNumber: 9123456780,
        age: "36",
        department: "Endocrinology",
        qualification: "MBBS, DM (Endocrinology)",
        fees: 500,
        password: "password515",
        address: {
          street: "123 XYZ Street",
          city: "Jaipur",
          state: "Rajasthan",
          postalCode: "302002"
        },
        gender: "Male",
        specialization: "Endocrinologist",
        experience: 12,
        certifications: ["Endocrine Society of India Certification"],
        profilePicture: "https://www.internationalinsurance.com/wp-content/uploads/2021/04/Indian-doctor-at-desk-scaled.jpg",
        languagesSpoken: ["English", "Hindi"],
        bio: "Expert in hormone disorders and metabolism.",
        rating: 4.7,
        reviews: ["Best endocrinologist ever!", "Very knowledgeable and caring."],
        consultationFee: 600,
        insuranceAccepted: ["Insurance EE", "Insurance FF"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/kartik.reddy.endo",
            twitter: "https://twitter.com/kartik.reddy.endo"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/kartik.reddy.endo"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Meera Kapoor",
        email: "meera.kapoor@example.com",
        mobileNumber: 9123409876,
        age: "37",
        department: "Hematology",
        qualification: "MBBS, MD (Hematology)",
        fees: 750,
        password: "password112",
        address: {
          street: "123 EFG Street",
          city: "Hyderabad",
          state: "Telangana",
          postalCode: "500003"
        },
        gender: "Female",
        specialization: "Hematologist",
        experience: 14,
        certifications: ["Indian Society of Hematology and Blood Transfusion Certification"],
        profilePicture: "https://thumbs.dreamstime.com/b/indian-doctor-woman-23073056.jpg",
        languagesSpoken: ["English", "Telugu"],
        bio: "Expert in blood disorders and transfusion medicine.",
        rating: 4.5,
        reviews: ["Very knowledgeable hematologist!", "Highly recommended for blood disorders."],
        consultationFee: 900,
        insuranceAccepted: ["Insurance GG", "Insurance HH"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/meera.kapoor.heme",
            twitter: "https://twitter.com/meera.kapoor.heme"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/meera.kapoor.heme"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Sanjay Agarwal",
        email: "sanjay.agarwal@example.com",
        mobileNumber: 9988776655,
        age: "43",
        department: "Gastroenterology",
        qualification: "MBBS, DM (Gastroenterology)",
        fees: 900,
        password: "password202",
        address: {
          street: "789 QRS Street",
          city: "Kolkata",
          state: "West Bengal",
          postalCode: "700001"
        },
        gender: "Male",
        specialization: "Gastroenterologist",
        experience: 18,
        certifications: ["Indian Society of Gastroenterology Certification"],
        profilePicture: "https://th.bing.com/th/id/OIP.qC0FMCYhS8tPvcdl49i42wHaE7?rs=1&pid=ImgDetMain",
        languagesSpoken: ["English", "Bengali"],
        bio: "Expert in digestive system disorders and treatments.",
        rating: 4.7,
        reviews: ["Highly skilled gastroenterologist!", "Provided excellent digestive care."],
        consultationFee: 1000,
        insuranceAccepted: ["Insurance II", "Insurance JJ"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/sanjay.agarwal.gastro",
            twitter: "https://twitter.com/sanjay.agarwal.gastro"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/sanjay.agarwal.gastro"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Anjali Deshpande",
        email: "anjali.deshpande@example.com",
        mobileNumber: 9876543210,
        age: "39",
        department: "Rheumatology",
        qualification: "MBBS, MD (Rheumatology)",
        fees: 850,
        password: "password303",
        address: {
          street: "456 STU Street",
          city: "Mumbai",
          state: "Maharashtra",
          postalCode: "400003"
        },
        gender: "Female",
        specialization: "Rheumatologist",
        experience: 16,
        certifications: ["Indian Rheumatology Association Certification"],
        profilePicture: "https://static2.bigstockphoto.com/9/1/1/large1500/119136797.jpg",
        languagesSpoken: ["English", "Marathi"],
        bio: "Specializes in autoimmune and musculoskeletal disorders.",
        rating: 4.6,
        reviews: ["Great rheumatologist!", "Very caring and attentive."],
        consultationFee: 900,
        insuranceAccepted: ["Insurance KK", "Insurance LL"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/anjali.deshpande.rheum",
            twitter: "https://twitter.com/anjali.deshpande.rheum"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/anjali.deshpande.rheum"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Akash Singhania",
        email: "akash.singhania@example.com",
        mobileNumber: 9123456780,
        age: "46",
        department: "Oncology",
        qualification: "MBBS, DM (Oncology)",
        fees: 1000,
        password: "password404",
        address: {
          street: "123 VWX Street",
          city: "Bangalore",
          state: "Karnataka",
          postalCode: "560003"
        },
        gender: "Male",
        specialization: "Oncologist",
        experience: 22,
        certifications: ["National Cancer Grid Certification"],
        profilePicture: "https://thumbs.dreamstime.com/b/studio-shot-young-handsome-indian-sikh-man-doctor-against-gray-background-young-handsome-indian-sikh-man-doctor-against-gray-199122834.jpg",
        languagesSpoken: ["English", "Kannada"],
        bio: "Leading expert in cancer diagnosis and treatment.",
        rating: 4.8,
        reviews: ["Highly skilled oncologist!", "Provided excellent cancer care."],
        consultationFee: 1100,
        insuranceAccepted: ["Insurance MM", "Insurance NN"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/akash.singhania.onc",
            twitter: "https://twitter.com/akash.singhania.onc"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/akash.singhania.onc"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Shruti Sharma",
        email: "shruti.sharma@example.com",
        mobileNumber: 9988776655,
        age: "42",
        department: "Dermatology",
        qualification: "MBBS, MD (Dermatology)",
        fees: 900,
        password: "password505",
        address: {
          street: "789 XYZ Street",
          city: "Chennai",
          state: "Tamil Nadu",
          postalCode: "600003"
        },
        gender: "Female",
        specialization: "Dermatologist",
        experience: 19,
        certifications: ["Dermatology Association of India Certification"],
        profilePicture: "https://thumbs.dreamstime.com/z/happy-indian-traditional-female-doctor-hospital-interior-79538697.jpg",
        languagesSpoken: ["English", "Tamil"],
        bio: "Specializes in skin care and cosmetic dermatology.",
        rating: 4.7,
        reviews: ["Great dermatologist!", "Very professional and knowledgeable."],
        consultationFee: 1000,
        insuranceAccepted: ["Insurance OO", "Insurance PP"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/shruti.sharma.derm",
            twitter: "https://twitter.com/shruti.sharma.derm"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/shruti.sharma.derm"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Arjun Gupta",
        email: "arjun.gupta@example.com",
        mobileNumber: 9876541230,
        age: "47",
        department: "Orthopedics",
        qualification: "MBBS, MS (Orthopedics)",
        fees: 950,
        password: "password606",
        address: {
          street: "456 YZA Street",
          city: "Hyderabad",
          state: "Telangana",
          postalCode: "500003"
        },
        gender: "Male",
        specialization: "Orthopedic Surgeon",
        experience: 21,
        certifications: ["Indian Orthopaedic Association Certification"],
        profilePicture: "https://www.himalayanbuzz.com/wp-content/uploads/2020/05/Manu_Bora_Doctor.jpg",
        languagesSpoken: ["English", "Telugu"],
        bio: "Expert in bone and joint disorders and surgeries.",
        rating: 4.9,
        reviews: ["Excellent orthopedic surgeon!", "Provided outstanding care for my knee surgery."],
        consultationFee: 1100,
        insuranceAccepted: ["Insurance QQ", "Insurance RR"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/arjun.gupta.ortho",
            twitter: "https://twitter.com/arjun.gupta.ortho"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/arjun.gupta.ortho"
          }
        },
        availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Priya Singh",
        email: "priya.singh@example.com",
        mobileNumber: 9123456780,
        age: "35",
        department: "Obstetrics & Gynecology",
        qualification: "MBBS, MS (Obstetrics & Gynecology)",
        fees: 500,
        password: "password707",
        address: {
          street: "123 ABC Street",
          city: "Pune",
          state: "Maharashtra",
          postalCode: "411003"
        },
        gender: "Female",
        specialization: "Obstetrician & Gynecologist",
        experience: 11,
        certifications: ["Federation of Obstetric and Gynaecological Societies of India Certification"],
        profilePicture: "https://previews.agefotostock.com/previewimage/medibigoff/6b179625504a2b0276d32850b6785bc7/c71-454146.jpg",
        languagesSpoken: ["English", "Hindi"],
        bio: "Dedicated to women's health and wellness.",
        rating: 4.6,
        reviews: ["Great OB-GYN!", "Very supportive throughout my pregnancy."],
        consultationFee: 600,
        insuranceAccepted: ["Insurance SS", "Insurance TT"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/priya.singh.obgyn",
            twitter: "https://twitter.com/priya.singh.obgyn"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/priya.singh.obgyn"
          }
        },   availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Rahul Malhotra",
        email: "rahul.malhotra@example.com",
        mobileNumber: 9988776655,
        age: "41",
        department: "Urology",
        qualification: "MBBS, MCh (Urology)",
        fees: 850,
        password: "password808",
        address: {
          street: "789 DEF Street",
          city: "Delhi",
          state: "Delhi",
          postalCode: "110002"
        },
        gender: "Male",
        specialization: "Urologist",
        experience: 17,
        certifications: ["Urological Society of India Certification"],
        profilePicture: "https://thumbs.dreamstime.com/b/indian-happy-male-doctor-stethoscope-clipboard-clinic-medicine-healthcare-people-concept-223487300.jpg",
        languagesSpoken: ["English", "Hindi"],
        bio: "Expert in urinary tract and male reproductive system disorders.",
        rating: 4.7,
        reviews: ["Highly skilled urologist!", "Performed successful kidney stone surgery for me."],
        consultationFee: 900,
        insuranceAccepted: ["Insurance UU", "Insurance VV"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/rahul.malhotra.uro",
            twitter: "https://twitter.com/rahul.malhotra.uro"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/rahul.malhotra.uro"
          }
        },   
        availability: [
          {
            dayOfWeek: "Tuesday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "02:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      },
      {
        doctorName: "Dr. Rohan Patel",
        email: "rohan.patel@example.com",
        mobileNumber: 9123456780,
        age: "50",
        department: "Cardiology",
        qualification: "MBBS, DM (Cardiology)",
        fees: 1200,
        password: "password101",
        address: {
          street: "456 LMN Street",
          city: "Chennai",
          state: "Tamil Nadu",
          postalCode: "600004"
        },
        gender: "Male",
        specialization: "Cardiologist",
        experience: 25,
        certifications: ["Cardiology Society of India Certification"],
        profilePicture: "https://thumbs.dreamstime.com/z/indian-male-doctor-portrait-happy-indian-male-doctor-standing-arms-crossed-office-119571017.jpg",
        languagesSpoken: ["English", "Tamil"],
        bio: "Leading expert in cardiac care and treatment.",
        rating: 4.9,
        reviews: ["Saved my life!", "Highly recommended for heart issues."],
        consultationFee: 1500,
        insuranceAccepted: ["Insurance YY", "Insurance ZZ"],
        linkedAccounts: {
          socialMedia: {
            facebook: "https://www.facebook.com/rohan.patel.cardio",
            twitter: "https://twitter.com/rohan.patel.cardio"
          },
          professionalNetworking: {
            linkedIn: "https://www.linkedin.com/in/rohan.patel.cardio"
          }
        },   availability: [
          {
            dayOfWeek: "Monday",
            timeSlots: [
              {
                startTime: "08:00",
                endTime: "12:00"
              },
              {
                startTime: "15:00",
                endTime: "18:00",
              }
            ]
          },
          {
            dayOfWeek: "Wednesday",
            timeSlots: [
              {
                startTime: "09:00",
                endTime: "13:00"
              },
              {
                startTime: "16:00",
                endTime: "19:00"
              }
            ]
          }
        ]
      }
  ];
  
  const sampleUserData = [
    {
      username: "rahul_sharma",
      email: "rahul.sharma@example.in",
      mobileNumber: 9876543210,
      password: "password123",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?portrait",
    },
    {
      username: "priya_patel",
      email: "priya.patel@example.in",
      mobileNumber: 9123456780,
      password: "password456",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?woman",
    },
    {
      username: "akash_singh",
      email: "akash.singh@example.in",
      mobileNumber: 9988776655,
      password: "password789",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?man",
    },
    {
      username: "nisha_kumar",
      email: "nisha.kumar@example.in",
      mobileNumber: 9876541230,
      password: "password101",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?girl",
    },
    {
      username: "ananya_pandey",
      email: "ananya.pandey@example.in",
      mobileNumber: 9123409876,
      password: "password112",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?boy",
    },
    {
      username: "rohit_gupta",
      email: "rohit.gupta@example.in",
      mobileNumber: 9988776655,
      password: "password313",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?indian",
    },
    {
      username: "shruti_shah",
      email: "shruti.shah@example.in",
      mobileNumber: 9876567890,
      password: "password414",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?face",
    },
    {
      username: "vikram_jain",
      email: "vikram.jain@example.in",
      mobileNumber: 9123456780,
      password: "password515",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?profile",
    },
    {
      username: "pooja_mehta",
      email: "pooja.mehta@example.in",
      mobileNumber: 9876543210,
      password: "password616",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?young",
    },
    {
      username: "akash_kapoor",
      email: "akash.kapoor@example.in",
      mobileNumber: 9123456780,
      password: "password717",
      isAvatarImageSet: true,
      avatarImage: "https://source.unsplash.com/200x200/?smiling",
    },
  ];
  
  

  conncetDatabase;


function insertData() {
    
    mongoose.startSession({ defaultMaxTimeMS: 60000 }, function(err, session) {
        if (err) {
            console.error('Error starting session:', err);
            return;
        }

 
        session.withTransaction(async function() {
            try {
                await Doctor.insertMany(sampleData);
                console.log('Documents inserted successfully');
              
                session.commitTransaction();
                session.endSession();
                mongoose.disconnect(); 
            } catch (error) {
                console.error('Error inserting documents:', error);
                // Abort the transaction
                session.abortTransaction();
                session.endSession();
                mongoose.disconnect(); 
            }
        });
    });
}
insertData();

