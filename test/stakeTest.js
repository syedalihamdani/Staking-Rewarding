const RewardToken = artifacts.require("RewardToken");
const StakeToken = artifacts.require("StakeToken");
const stakeReward = artifacts.require("stakeReward");

// truffle is only do integreted test not unit test
contract("StakeToken,RewardToken,stakeReward",accounts=>{
    it("StakeToken:mint to account5,multiple tear level",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.mint(accounts[5],200000);
        let balanceOf=await instance.balanceOf(accounts[5]);
        assert.equal(balanceOf,200000);
    })
    it("StakeToken:mint to account6,browns",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.mint(accounts[6],15000);
        let balanceOf=await instance.balanceOf(accounts[6]);
        assert.equal(balanceOf,15000);
    })
    it("StakeToken:mint to account7,Silver",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.mint(accounts[7],45000);
        let balanceOf=await instance.balanceOf(accounts[7]);
        assert.equal(balanceOf,45000);
    })
    it("StakeToken:mint to account8,Gold",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.mint(accounts[8],75000);
        let balanceOf=await instance.balanceOf(accounts[8]);
        assert.equal(balanceOf,75000);
    })
    it("StakeToken:mint to account9,platinum",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.mint(accounts[9],120000);
        let balanceOf=await instance.balanceOf(accounts[9]);
        assert.equal(balanceOf,120000);
        console.log(StakeToken.address);
    })

    it("RewardToken:mint to account0 all tokens",async ()=>{
        let instance2=await RewardToken.deployed();
        await instance2.mint(accounts[0],5000000000000);
        let balanceOf2=await instance2.balanceOf(accounts[0]);
        assert.equal(balanceOf2,5000000000000);
    })
    it("stakeReward:stake",async ()=>{
        let instance=await StakeToken.deployed();
        await instance.approve(stakeReward.address,10000,{from:accounts[6]});
        let instance3=await stakeReward.deployed();
        await instance3.stake(10000,{from:accounts[6]});
        let stakeBalance=await instance.balanceOf(stakeReward.address);
        assert.equal(stakeBalance,10000);
    })
    it("stakeReward:getStakeBalance",async ()=>{
        let instance3=await stakeReward.deployed();
        let getStakeBalance=await instance3.getStakeBalane({from:accounts[6]});
        assert.equal(getStakeBalance,10000);
    })
    it("stakeReward:tearLevelCalculator",async ()=>{
        let instance3=await stakeReward.deployed();
        let tearLevel=await instance3.tearLevelCalculator(80000);
        assert.equal(tearLevel.toString(),'4');
    })
    it("stakeReward:getTearLevel",async ()=>{
        let instance3=await stakeReward.deployed();
        let getTearLevel=await instance3.getTearLevel({from:accounts[6]});
        assert.equal(getTearLevel.toString(),'1');
    })
    it("stakeReward:claimReward",async ()=>{
        let instance3=await stakeReward.deployed();
        let claimReward=await instance3.claimReward({from:accounts[6]});
        // assert.equal(getTimeCycle,6);
        console.log(claimReward.toString());
    })
    
    
    
})

