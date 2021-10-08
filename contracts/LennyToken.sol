// SPDX-License-Identifier: MIT 

pragma solidity ^0.8.0;

//Importing smart contract 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";



contract LennyToken is ERC721, Ownable{
    //Constructor to make the smart contract
    constructor (string memory _name, string memory _symbol) ERC721(_name,_symbol){
    }
    //Minted counter
    uint256 COUNTER;
    
    uint256 fee = 1 ether;
    
    //How to make a Lenny
    struct Lenny {
        string name;
        uint256 id;
        uint256 dna;
        uint8 level;
        uint8 rarity;
    }
    
    //Array of lennys
    Lenny[] public lennys;
    
    
    event NewLenny(address indexed owner, uint256 id, uint256 dna);
    
    //
    //Helpers
    //
    function _createRandomNum(uint256 _mod) internal view returns(uint256){
        uint256 randomNum = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
        return randomNum % _mod;
    }
    
    //Update the fee
    function updateFee(uint256 _fee) external onlyOwner(){
        fee = _fee;
    }
    
    function withdraw() external payable onlyOwner() {
        address payable _owner = payable(owner());
        _owner.transfer(address(this).balance);
    }
    
    //
    //Mining Lennys
    //
    function _createLenny(string memory _name) internal{
        uint8 randRarity = uint8(_createRandomNum(100));
        uint256 ranDna = _createRandomNum(10**16);
        Lenny memory newLenny = Lenny(_name, COUNTER, ranDna,1,randRarity);
        lennys.push(newLenny);
        _safeMint(msg.sender, COUNTER);
        emit NewLenny(msg.sender, COUNTER, ranDna);
        COUNTER++;
    }
    
    function createRandomLenny(string memory _name) public payable {
        require(msg.value >= fee, "The fee is not correct");
        _createLenny(_name);
    }
    
    //
    //Getters
    //
    function getLennys() public view returns (Lenny[] memory){
        return lennys;
    }

    function getOwnerLennys(address _owner) public view returns (Lenny[] memory){
        Lenny[] memory result = new Lenny[](balanceOf(_owner));
        uint256 counter = 0;
        for (uint256 i = 0; i < lennys.length; i++) {
            if (ownerOf(i) == _owner) {
                result[counter] = lennys[i];
                counter++;
            }
        }
        return result;
    }
}