// Import du smart contract "SimpleStorage"
const Voting = artifacts.require("Voting");

module.exports = (deployerObj) => {
 // Deployer le smart contract!
 deployerObj.deploy(Voting, 6, {value:1});
} 