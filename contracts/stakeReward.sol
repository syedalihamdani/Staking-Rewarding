  // SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract stakeReward is Ownable{
    IERC20 internal StakeToken;
    IERC20 internal RewardToken;
    address internal RewardTokenOwner;

    // tear levals
    enum tearLevel{
        noLevel,
        browns,
        silver,
        gold,
        platnium
    }

    constructor(address _StakeToken,address _RewardToken){
        StakeToken=IERC20(_StakeToken);
        RewardToken=IERC20(_RewardToken);
    }

    mapping(address=>uint) stakeBalance;
    mapping(address=>uint)updatedTime;

    function tearLevelCalculator(uint _stakeBalance) public pure returns(tearLevel){
        if(_stakeBalance<10000*1e18){
            return tearLevel.noLevel;
        }else if(_stakeBalance>=10000*1e18 && _stakeBalance<30000*1e18){
            return tearLevel.browns;
        }else if(_stakeBalance>=30000*1e18 && _stakeBalance<50000*1e18){
            return tearLevel.silver;
        }else if(_stakeBalance>=50000*1e18 && _stakeBalance<80000*1e18){
            return tearLevel.gold;
        }else{
            return tearLevel.platnium;
        }
    } 

    function stake(uint _amount) external{
        require(StakeToken.balanceOf(msg.sender)>=_amount,"stakeReward:You can not stake more then your balance");
        require(StakeToken.allowance(msg.sender,address(this))>=_amount,
        "stakeReward:You have not approve the token to this contract,or allowance is less then the amount");
        if((block.timestamp-updatedTime[msg.sender])/1 minutes>=1){
            claimReward();
        }
        StakeToken.transferFrom(msg.sender,address(this),_amount);
        stakeBalance[msg.sender]= stakeBalance[msg.sender]+_amount;
        updatedTime[msg.sender]=block.timestamp;
    }

    function getStakeBalane() external view returns(uint){
        return stakeBalance[msg.sender];
    }
        function claimReward() public{
             uint numberOfCycle=(block.timestamp-updatedTime[msg.sender])/1 minutes;   //TODO: Change 1 to 10 minutes;
             require(numberOfCycle >=1,"stakeReward:Reward time cycle has not been completed.You have to wait at least 10 minutes");
             uint stakerTearLevel=uint(tearLevelCalculator(stakeBalance[msg.sender]));
             uint rewardRate;
             if(stakerTearLevel==0){
                 rewardRate=0;
             }else if(stakerTearLevel==1){
                 rewardRate=stakeBalance[msg.sender]*12/1000;
             }else if(stakerTearLevel==2){
                 rewardRate=stakeBalance[msg.sender]*33/1000;
             }else if(stakerTearLevel==3){
                 rewardRate=stakeBalance[msg.sender]*6/100;
             }else{
                 rewardRate=stakeBalance[msg.sender]*8/100;
             }
             uint rewardAmount=rewardRate*numberOfCycle;
             RewardToken.transferFrom(RewardTokenOwner,msg.sender,rewardAmount);
             updatedTime[msg.sender]=block.timestamp;
        }

        function unstake() external{
            require(stakeBalance[msg.sender]>0,"stakeReward:You have not stake any token amount");
            StakeToken.transfer(msg.sender,stakeBalance[msg.sender]);
            delete stakeBalance[msg.sender];
            delete updatedTime[msg.sender];
        }

        function getRewardTokenOwner() external view returns(address){
        return RewardTokenOwner;
        }
        function setRewardTokenOwner(address _RewardTokenOwner) external onlyOwner{
         RewardTokenOwner=_RewardTokenOwner;
        }

    
}