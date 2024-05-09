const nodemailer = require("nodemailer");

const CancelAppointmentByUserSendMail = async (req, res, doctor, appointmentDate, appointmentTime,email,subject ) => {
// const email = email;
console.log('email in email',email,appointmentDate,appointmentTime,doctor);
  let transporter = await nodemailer.createTransport({
  
    service:'gmail',
    port: 465,
    auth: {
      user: "amarjeet12ka4@gmail.com",
      pass: "fdpg nlun ykru kckg",
    },
  });

  let message = `
  <div style="font-family: Arial, sans-serif; color: #333;">
  <h2 style="color: #007bff;">Appointment Cancellation</h2>
  <p>Your appointment has been successfully cancelled with <strong style="color: #007bff;">${doctor}</strong> for <strong style="color: #007bff;">${appointmentDate}</strong> at <strong style="color: #007bff;">${appointmentTime}</strong>.</p>
  <p><strong style="color: #ff0000;">Your Appointment was successfully canceled by you. Here are the details:</strong></p>
  <h3 style="color: #007bff;">Payment will be refunded soon!</h3>
</div>

  `;

     await transporter.sendMail({
    from: 'Healthcare Healthcare@gmail.com',
    to: email,
    subject: subject, 
    text: "Application", 
    html: message, 
  });


};

module.exports = CancelAppointmentByUserSendMail;
