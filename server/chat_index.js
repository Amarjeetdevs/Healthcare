const express = require("express");
const cors = require("cors");
require("dotenv").config();
// const bodyParser = require("body-parser");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const doctorAppointmentRoutes = require('./routes/appointment');
const scheduleDoctorTimeRoutes = require('./routes/docavlble');
const stripe = require('stripe')(process.env.CLINET_SECRET_KEY);
const key = process.env.CLINET_SECRET_KEY;
console.log("key",key)
const { v4: uuidv4 } = require('uuid');
const app = express();
const socket = require("socket.io");
const conncetDatabase = require('./config/db');
const sendMail = require("./utils/sendemail");
const razorpay = require('razorpay');
const Razorpay = require("razorpay");
const crypto = require('crypto');

app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
conncetDatabase;


app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/v1/apoint", doctorAppointmentRoutes);
app.use("/api/v2/avlble", scheduleDoctorTimeRoutes);

app.use('/uploads', express.static('uploads'));
// paymets routes
// Assuming 'stripe' is properly imported and configured

// app.post('/checkout', async (req, res) => {

//   try {
//     const { product, token } = req.body;
//     console.log('p,pr',product.price);
//     const idempotencyKey = uuid()
    
//     return stripe.customers.create({
//       email:token.email,
//       source:token.id
//     }).then(customer => {
//       stripe.charges.create({
//         amount : product.price * 100,
//         currency:'usd',
//         customer:customer.id,
//         reciept_email:token.email,
//         description:`purchase of ${product.name}`,
//         shopping:{
//           name:token.card.name,
//           address:token.card.address_country
//         }
//       },{idempotencyKey})
//     })
//     .then(result => {
//       res.status(200).json(result);
//       console.log(result)
//     })
//     .catch(err => console.log(err));

  
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const { v4: uuidv4 } = require('uuid');

// app.post('/checkout', async (req, res) => {
//   try {
//     const { product, token } = req.body;
// //  const email = product.email

//     console.log('Product and price:', product.price, );

//     const idempotencyKey = uuidv4();
    
//     const customer = await stripe.customers.create({
//       email: token.email,
//     });

//     const charge = await stripe.charges.create({
//       amount: product.price * 100,
//       currency: 'usd',
//       customer: customer.id,
//       receipt_email: token.email,
//       description: `Purchase of ${product.name}`,
//       // shipping: {
//       //   name: token.card.name,
//       //   address: token.card.address_country
//       // }
//     }, { idempotencyKey });

//     res.status(200).json(charge);
//     console.log('Charge:', charge);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const stripe = require('stripe')('your_stripe_secret_key');
// const stripe = require('stripe')('your_stripe_secret_key');

// app.post("/checkout", async (req, res) => {
//   console.log(req.body);
//   try {
//     const { product} = req.body;

//    const Pname = product.name;
//    console.log('name',Pname);
  
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: Pname
//           },
//           unit_amount: product.price * 100
//         },
//         quantity: 1
//       }],
//       mode: 'payment',
//       success_url: 'http://localhost:5173/success',
//       cancel_url: 'http://localhost:5173/cancel',
//     });

//     res.status(200).json({ sessionId: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: 'Error creating checkout session' });
//   }
// });


app.post('/order',async (req,res)=>{

  try{
    const razorpay = new Razorpay({
      key_id:process.env.RAZORPAY_KEY_ID,
      key_secret:process.env.RAZORPAY_KEY_SECRET
     })
     const options = req.body;
     const order = await razorpay.orders.create(options);
     
     if (order) {
      return res.json(order);
  } else {
      return res.status(500).json({ error: "Failed to create order" });
  }
  }
  catch(error)
  {
    res.status(500).send("Error")
    console.log("error",error)
  }

})

app.post('/validatate',async (res,req)=> {
 console.log(req.body);
  const { razorpay_order_id,razorpay_payment_id,razorpay_signature } = req.body;

 const sha = crypto.createHmac("sha256",process.env.RAZORPAY_KEY_SECRET)
  sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
  const digest = sha.digest("hex");

  if(digest !== razorpay_signature)
  {
    res.status(400),json({msg:'Transaction is not legit!'});
  }
  else{
    res.json({msg:'sucsess',orderId:razorpay_order_id,paymentId:razorpay_payment_id})
  }

})



const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});



global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

