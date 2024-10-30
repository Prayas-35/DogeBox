import { ethers } from "hardhat";

async function main() {
  // Get the ContractFactory for the contract
  const MemeTimeCapsule = await ethers.deployContract("MemeTimeCapsule");

  console.log("Deploying MemeTimeCapsule...");

  // Wait for the deployment to complete
  await MemeTimeCapsule.waitForDeployment();

  // Get the deployed contract's address
  const contractAddress = await MemeTimeCapsule.getAddress();
  console.log("MemeTimeCapsule deployed to:", contractAddress);
}

// Proper error handling
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });