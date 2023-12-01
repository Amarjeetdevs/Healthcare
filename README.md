# Healthcare Blockchain Web Application

This project is a blockchain-based web application with video call and chat features for healthcare.

## Running the Project

### Server

1. Navigate to the server directory:

    ```bash
    cd server
    ```

2. Install dependencies:

    npm install


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

    ```bash
    npm run dev
    ```

---

