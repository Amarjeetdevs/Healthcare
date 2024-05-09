const nodemailer = require("nodemailer");

const sendMail = async (req, res, doctorName, appointmentDate, appointmentTime,email,  paymentId,orderId,signature) => {

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
      <h2 style="color: #007bff;">Appointment Confirmation</h2>
      <p>Your appointment has been successfully booked with <strong>${doctorName}</strong> for <strong>${appointmentDate}</strong> at <strong>${appointmentTime}</strong>.</p>
      <p>Please ensure to adhere to the scheduled time and be punctual.</p>
      <p><strong>Your payment was successful. Here are the details:</strong></p>
      <ul>
        <li><strong>Payment ID:</strong> ${paymentId}</li>
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Signature:</strong> ${signature}</li>
      </ul>
    </div>
  `;

     await transporter.sendMail({
    from: 'Healthcare Healthcare@gmail.com',
    to: email,
    subject: "Confirmation", 
    text: "Application", 
    html: message, 
  });


};

module.exports = sendMail;
