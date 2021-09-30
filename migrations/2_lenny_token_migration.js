const LennyToken = artifacts.require("LennyToken");

module.exports = function (deployer) {
  deployer.deploy(LennyToken, "LennyToken", "Lenny");
};
