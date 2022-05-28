// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract StableCoin is ERC20, Ownable {
    constructor() ERC20("StC", "STC") payable{}

    function mint(uint256 _amount) public {
        _mint(msg.sender, _amount);
    }
}