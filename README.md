

---

# Healthcare Blockchain Web Application

This project is a blockchain-based web application designed for healthcare, featuring video calls and chat functionality.

## Features

1. **Video Calls**: Conduct secure video calls between healthcare providers and patients for remote consultations.

2. **Chat Application**: Real-time messaging system for communication between healthcare providers and patients.

3. **Appointment Booking**: Allow patients to schedule appointments with doctors based on availability.

4. **Payment Integration**: Secure payment processing using Razorpay for appointment bookings and other services.

5. **Email Notifications**: Send automated email notifications using Nodemailer for appointment reminders and updates.

6. **Blockchain Data Storage**: Utilize blockchain technology to securely store patient data, ensuring immutability and transparency.

## Running the Project

### Server

1. Navigate to the server directory:
    ```bash
    cd server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the server for video calls:
    ```bash
    npm run dev
    ```

4. Start the chat application:
    ```bash
    npm run newchat
    ```

### Frontend

1. Navigate to the client directory:
    ```bash
    cd client
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start the local Hardhat node:
    ```bash
    npm hardhat node
    ```

4. Compile the script and deploy:
    ```bash
    npx hardhat run scripts/deploy.js --network localhost
    ```

5. Start the React app:

---
