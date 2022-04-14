// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract stakeReward{
    IERC20 internal StakeToken;
    IERC20 internal RewardToken;

    // tear levals
    enum tearLevel{
        noLevel,
        browns,
        silver,
        gold,
        platnium
    }


// Percentage value is stored upto 3 decimals. multiplyind by 1000 and divide by 1000 in front end.
    uint public brownsRewardRate=12;
    uint public silverRewardRate=33;
    uint public goldRewardRate=60;
    uint public platniumRewardRate=80;
    constructor(address _StakeToken,address _RewardToken){
        StakeToken=IERC20(_StakeToken);
        RewardToken=IERC20(_RewardToken);
    }

    mapping(address=>uint) stakeBalance;
    mapping(address=>uint)stakingTime;
    mapping(address=>tearLevel) TearLevel;

    function tearLevelCalculator(uint _stakeBalance) public pure returns(tearLevel){
        if(_stakeBalance<10000){
            return tearLevel.noLevel;
        }else if(_stakeBalance>=10000 && _stakeBalance<30000){
            return tearLevel.browns;
        }else if(_stakeBalance>=30000 && _stakeBalance<50000){
            return tearLevel.silver;
        }else if(_stakeBalance>=50000 && _stakeBalance<80000){
            return tearLevel.gold;
        }else{
            return tearLevel.platnium;
        }
    } 

    function stake(uint _amount) external{
        require(StakeToken.balanceOf(msg.sender)>=_amount,"stakeReward:You can not stake more then your balance");
        require(StakeToken.allowance(msg.sender,address(this))>=_amount,
        "stakeReward:You have not approve the token to this contract,or allowance is less then the amount");
        StakeToken.transferFrom(msg.sender,address(this),_amount);
        stakeBalance[msg.sender]=_amount;
        stakingTime[msg.sender]=block.timestamp;
        TearLevel[msg.sender]=tearLevelCalculator(stakeBalance[msg.sender]);
    }

    function getStakeBalane() external view returns(uint){
        return stakeBalance[msg.sender];
    }
    function getTearLevel() external view returns(tearLevel){
        return TearLevel[msg.sender];
    }


    
}