     // SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";

contract StakeToken is ERC20Capped{
    constructor() ERC20Capped(500000000*10**decimals()) ERC20("StakeToken","ST"){
        
    }
    function mint(address _to,uint _amount) external{
        _mint(_to,_amount);
    }
}

