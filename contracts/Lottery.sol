// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Lottery {
    address payable[] public players;
    address public manager;
    address payable public winner;

    constructor() {
        manager = msg.sender;
    }

    receive() external payable {
        require(msg.value == 1 ether, "You must send 1 ether");
        players.push(payable(msg.sender));
    }

    function getBalance() public view returns (uint256) {
        require(msg.sender == manager, "You are not the manager");
        return address(this).balance;
    }

    function random() private view returns (uint256) {
        return
            uint256(
                keccak256(
                    abi.encodePacked(
                        block.difficulty,
                        block.timestamp,
                        players.length
                    )
                )
            );
    }

    function pickWinner() public {
        require(msg.sender == manager, "You are not the manager");
        require(players.length >= 3, "Not enough players");

        uint256 r = random();
        uint256 index = r % players.length;
        winner = players[index];
        winner.transfer(address(this).balance);
        players = new address payable[](0);
    }

    function allPlayers() public view returns (address payable[] memory) {
        return players;
    }
}
//0x248399B5d8a9481dFaDc465854F6a0D5a2318ae3
//ganache 0x3649Bde268f21FfB8137AF98640E46651A0815Ab