// SPDX-License-Identifier: MIT
pragma solidity ^0.5.17;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

contract Mock is ERC20, ERC20Detailed {
  constructor() ERC20Detailed("Mock", "MOCK", 18) public {
    _mint(msg.sender, 100000000000000000000000000);
  }
}