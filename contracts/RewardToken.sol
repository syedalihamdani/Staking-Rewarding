      // SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RewardToken is ERC20Capped,Ownable{
    constructor() ERC20Capped(5000000000000*10**decimals()) ERC20("RewardToken","RT"){
        _mint(msg.sender,500000000);
    }
    function mint(address _to,uint _amount) external onlyOwner(){
        _mint(_to,_amount);
    }
}

