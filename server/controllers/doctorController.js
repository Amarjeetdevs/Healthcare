const Doctor = require('../models/doctorModel');

module.exports.loginDoctor = async (req, res, next) => {
    try {
      const { doctorName, password } = req.body;
      const doctor = await Doctor.findOne({ doctorName });
      if (!doctor)
        return res.json({ msg: "Incorrect Doctor Name or Password", status: false });
      
      if (password !== doctor.password)
        return res.json({ msg: "Incorrect Doctor Name or Password", status: false });
      
      return res.json({ status: true, doctor });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.registerDoctor = async (req, res, next) => {
    try {
      const { doctorName, email, password, mobileNumber, age, department, qualification, fees } = req.body;
      const doctorNameCheck = await Doctor.findOne({ doctorName });
      if (doctorNameCheck)
        return res.json({ msg: "Doctor Name already used", status: false });
      const emailCheck = await Doctor.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      
      const doctor = await Doctor.create({
        doctorName,
        email,
        mobileNumber,
        age,
        department,
        qualification,
        fees,
        password,
      });
      return res.json({ status: true, doctor });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.getAllDoctors = async (req, res, next) => {
    try {
      const doctors = await Doctor.find();
      return res.json(doctors);
    } catch (ex) {
      next(ex);
    }
  };


  module.exports.deleteDoctor = async (req, res, next) => {
    try {
      const doctorId = req.params.id;
      const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
      if (!deletedDoctor) {
        return res.status(404).json({ msg: "Doctor not found" });
      }
      return res.json({ msg: "Doctor deleted successfully" });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.doctor_setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    console.log(userId,avatarImage);
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
  };



  module.exports.getIdForDoctor = async (req, res, next) => {
    try {
      const { email } = req.body;
      const doctor = await Doctor.findOne({ email });
    
      // console.log('database doctor', doctor);
      
      // Returning response directly
      return res.json({ doctor });
    } catch (ex) {
      next(ex);
    }
  };
  
  