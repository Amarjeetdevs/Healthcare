const Messages = require("../models/messageModel");
// const upload = require('../utils/upload');

// Function to handle file uploads
const handleFileUpload = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return next(err); // Pass any upload errors to the error handling middleware
    }
    next(); // Proceed to the next middleware/controller function
  });
};

// Controller function to get messages
module.exports.getMessages = async (req, res, next) => {
  try {
    const { from, to } = req.body;

    const messages = await Messages.find({
      users: { $all: [from, to] }
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text || msg.message.file ,
        timestamp: msg.createdAt,
      };
    });

    res.json(projectedMessages);
  } catch (ex) {
    next(ex); 
  }
}



const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  }
});

const upload = multer({ storage: storage });


module.exports.addMessage = async (req, res, next) => {
  try {
    upload.single('file')(req, res, async function (err) {
      if (err) {
        // Handle multer error
        return next(err);
      }

      const { from, to, message } = req.body;

      try {
        // Check if a file was uploaded
        if (req.file) {
          const { filename } = req.file;
          await Messages.create({
            message: { file: { filename } },
            users: [from, to],
            sender: to,
          });
        } else {
          await Messages.create({
            message: { text: message },
            users: [from, to],
            sender: from,
          });
        }

        res.json({ msg: "Message added successfully." });
      } catch (error) {
        // Handle any database-related errors
        next(error);
      }
    });
  } catch (ex) {
    // Handle any other errors
    next(ex); 
  }
};


