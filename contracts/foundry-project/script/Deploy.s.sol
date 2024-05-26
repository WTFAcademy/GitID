// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "forge-std/console.sol";

contract DeployScript is Script {
    function run() external {
        console.log("Deploy script running...");

        // Use the default private key and signer address
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address signerAddress = vm.envAddress("SIGNER_ADDRESS");

        console.log("Deployer Private Key:", deployerPrivateKey);
        console.log("Signer Address:", signerAddress);

        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);

        console.log("Starting deployment...");

        // Stop broadcasting transactions
        vm.stopBroadcast();

        console.log("Deployment finished.");
    }
}
