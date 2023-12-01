# Healthcare
blockchain based Web application
#Instruction for Running porject(Command)
For starting server
cd server
npm install 
npm run dev //for vedio_call
npm run newchat // for chat_application

For Starting frontend
cd client 
npm install or npm install --force
=> first start the local hardhad node 
    npm hardhat node 
=> compile the script || deploy
   npx hardhat run scripts/deploy.js --network localhost   
=> start react_app
   npm run dev
