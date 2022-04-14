const StakeToken = artifacts.require("StakeToken");
const RewardToken = artifacts.require("RewardToken");
const stakeReward = artifacts.require("stakeReward");

module.exports =async function (deployer) {
 await deployer.deploy(StakeToken);
  await deployer.deploy(RewardToken)
    await StakeToken.deployed();
    await RewardToken.deployed();
    await deployer.deploy(stakeReward,StakeToken.address,RewardToken.address);
    console.log(stakeReward.address);  
};
