var PlayToken = artifacts.require("./PlayToken.sol");
var P4PGame = artifacts.require("./P4PGame.sol");
//var P4PPool = artifacts.require("./P4PPool.sol");

module.exports = async function(deployer, network) {
    let tokenAddress = PlayToken.address;

    console.log(`deploying P4PGame with token address ${tokenAddress}`);
    const game = await deployer.deploy(P4PGame, tokenAddress);

    // this can be done only if the current account owns the token contract. Not the case on mainnet
    console.log(`setting in token contract ${tokenAddress}: controller ${P4PGame.address}`);
    const token = PlayToken.at(tokenAddress);
    await token.setController(P4PGame.address);
}