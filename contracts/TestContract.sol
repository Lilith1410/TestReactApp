pragma solidity >=0.4.21 <0.7.0;

contract TestContract{

  address public owner;
  uint public counter;

  constructor() public {
    owner = msg.sender;
    counter = 1;
  }

  function getCounter() public returns (uint) {
    return counter;
  }


  function incrementCounter() public {
    counter++;
  }

}
