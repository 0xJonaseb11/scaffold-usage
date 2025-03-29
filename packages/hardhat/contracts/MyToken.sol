// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {console} from "hardhat/console.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is Ownable {

    string public name = "FROG";
    string public symbol = "FROG";
    uint256 public totalSupply = 1000000 * 10 ** 18;

    constructor (address _owner) Ownable(_owner) {
        _transferOwnership(_owner);
    }
     
}