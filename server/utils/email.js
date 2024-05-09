const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

const apiKey = process.env.SEND_GRID_API;
const from = process.env.FROM;

sgMail.setApiKey(apiKey);

router.post('/send-email', async (req, res) => {
  try {
    console.log('requested email data', req.body);
    const { to,subject,text}=req.body;
    const msg = {
        to,
        from,
        subject,
        text
    };

    sgMail.send(msg)
    .then((response)=>console.log('Email sent'))
    .catch((error)=>console.log(error))
    
    res.status(200).json({ message: 'Email campaign created and sent successfully.' });
  } catch (error) {
    console.error('Error sending email campaign:', error);
    res.status(500).json({ error: 'Failed to create and send email campaign.' });
  }
});

// module.exports = router;
