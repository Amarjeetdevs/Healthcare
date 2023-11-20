import pkg from 'hardhat';
 
 const { ethers } = pkg;
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  // Get the network information
  const network = await ethers.provider.getNetwork();

  console.log("Network:", network.name);

  // Deploy the PersonalDataStorage contract
  const PersonalDataStorage = await ethers.getContractFactory("PersonalDataStorage");
  const personalDataStorage = await PersonalDataStorage.deploy();
  // await personalDataStorage.deployed();

  console.log("PersonalDataStorage deployed to:", await personalDataStorage.getAddress());

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
