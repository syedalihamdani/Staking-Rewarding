const RewardToken = artifacts.require("RewardToken");
const StakeToken = artifacts.require("StakeToken");
const stakeReward = artifacts.require("stakeReward");

// truffle is only do integreted test not unit test
contract("StakeToken,RewardToken,stakeReward",accounts=>{
    it("StakeToken:mint to account5,multiple tear level",async ()=>{
        let instance=await StakeToken.deployed();
        let amount=web3.utils.toWei('200000','ether');
        await instance.mint(accounts[5],amount);
        let balanceOf=await instance.balanceOf(accounts[5]);
        assert.equal(balanceOf,amount);
    })
    it("StakeToken:mint to account6,browns",async ()=>{
        let instance=await StakeToken.deployed();
        let amount=web3.utils.toWei('15000','ether');
        await instance.mint(accounts[6],amount);
        let balanceOf=await instance.balanceOf(accounts[6]);
        assert.equal(balanceOf,amount);
    })
    it("StakeToken:mint to account7,Silver",async ()=>{
        let instance=await StakeToken.deployed();
        let amount=web3.utils.toWei('45000','ether');
        await instance.mint(accounts[7],amount);
        let balanceOf=await instance.balanceOf(accounts[7]);
        assert.equal(balanceOf,amount);
    })
    it("StakeToken:mint to account8,Gold",async ()=>{
        let instance=await StakeToken.deployed();
        let amount=web3.utils.toWei('75000','ether');
        await instance.mint(accounts[8],amount);
        let balanceOf=await instance.balanceOf(accounts[8]);
        assert.equal(balanceOf,amount);
    })
    it("StakeToken:mint to account9,platinum",async ()=>{
        let instance=await StakeToken.deployed();
        let amount=web3.utils.toWei('120000','ether');
        await instance.mint(accounts[9],amount);
        let balanceOf=await instance.balanceOf(accounts[9]);
        assert.equal(balanceOf,amount);
        // console.log(StakeToken.address);
    })

    it("RewardToken:mint to account0 all tokens",async ()=>{
        let instance2=await RewardToken.deployed();
        let amount=web3.utils.toWei('5000000000000','ether');
        await instance2.mint(accounts[0],amount);
        let balanceOf2=await instance2.balanceOf(accounts[0]);
        assert.equal(balanceOf2,amount);
    })
    it("stakeReward:stake",async ()=>{
        let instance2=await RewardToken.deployed();
        let amount=web3.utils.toWei('5000000000000','ether');
        await instance2.approve(stakeReward.address,amount);
        let instance=await StakeToken.deployed();
        let amount2=web3.utils.toWei('10000','ether');
        await instance.approve(stakeReward.address,amount2,{from:accounts[6]});
        let instance3=await stakeReward.deployed();
        await instance3.setRewardTokenOwner(accounts[0]);
        await instance3.stake(amount2,{from:accounts[6]});
        let stakeBalance=await instance.balanceOf(stakeReward.address);
        assert.equal(stakeBalance,amount2);
    })
    it("stakeReward:getStakeBalance",async ()=>{
        let instance3=await stakeReward.deployed();
        let amount=web3.utils.toWei('10000','ether');
        let getStakeBalance=await instance3.getStakeBalane({from:accounts[6]});
        assert.equal(getStakeBalance,amount);
    })
    it("stakeReward:tearLevelCalculator",async ()=>{
        let instance3=await stakeReward.deployed();
        let amount=web3.utils.toWei('80000','ether');
        let tearLevel=await instance3.tearLevelCalculator(amount);
        assert.equal(tearLevel.toString(),'4');
    })
    xit("stakeReward:claimReward",async ()=>{
        let instance2=await RewardToken.deployed();
        let amount=web3.utils.toWei('5000000000000','ether');
        await instance2.approve(stakeReward.address,amount);
        let instance3=await stakeReward.deployed();
        let claimReward=await instance3.claimReward({from:accounts[6]});
        console.log(claimReward.toString());
    })
    it("stakeReward:unStake",async ()=>{
        let instance2=await RewardToken.deployed();
        let amount=web3.utils.toWei('5000000000000','ether');
        await instance2.approve(stakeReward.address,amount);
        let instance3=await stakeReward.deployed();
        await instance3.unstake({from:accounts[6]});
        let getStakeBalance=await instance3.getStakeBalane({from:accounts[6]});
        assert.equal(getStakeBalance,0);
        let instance=await StakeToken.deployed();
        let balanceOf=await instance.balanceOf(accounts[6]);
        let amount2=web3.utils.toWei('15000','ether');
        assert.equal(balanceOf,amount2);
    })
})

