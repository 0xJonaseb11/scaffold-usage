import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployContracts: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network sepolia`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` or `yarn account:import` to import your
    existing PK which will fill DEPLOYER_PRIVATE_KEY_ENCRYPTED in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  await deploy("MineralRegistry", {
    from: deployer,
    // Contract constructor arguments
    args: [deployer],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  await deploy("RolesManager", {
    from: deployer,
    // contract constructor arguments
    // args: [deployer],
    log: true,
    autoMine: true,
  });

  await deploy("MyToken", {
    from: deployer,
    args: [deployer],
    log: true,
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const mineralRegistry = await hre.ethers.getContract<Contract>("MineralRegistry", deployer);
  const rolesManager = await hre.ethers.getContract<Contract>("RolesManager", deployer);
  const myToken = await hre.ethers.getContract<Contract>("MyToken", deployer);

  // console.log("Mineral Registry factory: ", await mineralRegistry.registerMineral("Gold", "Mining Center"));
  // console.log("RolesManager: ", await rolesManager.registerMineral(0xe7f1725e7734ce288f8367e1bb143e90bb3f0512, "MINER_ROLE"));
};

export default deployContracts;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployContracts.tags = ["MineralRegistry", "RolesManager", "MyToken"];
