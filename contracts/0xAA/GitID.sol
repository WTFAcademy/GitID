// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GitID is ERC721, Ownable {
    // 存储地址与其GitHub用户名的映射
    mapping(address => string) private _addressToUsername;

    // Controller的地址
    address public controller;

    string private baseURI;

    // 事件，用于记录NFT的铸造
    event Minted(address indexed to, uint256 indexed tokenId, string username);
    event Burned(address indexed from, uint256 indexed tokenId, string username);

    constructor() ERC721("GitID", "GITID") Ownable(msg.sender) {
    }

    // 设置Controller的函数
    function setController(address controller_) public onlyOwner {
        controller = controller_;
    }

    // 修饰符，仅允许Controller调用
    modifier isController() {
        require(msg.sender == controller, "Caller is not the controller");
        _;
    }

    // 铸造新的GitID NFT
    function mint(address to, string memory username) public isController {
        require(balanceOf(to) == 0, "Address already has a GitID");

        uint256 tokenId = getTokenIdByUsername(username);
        require(_ownerOf(tokenId) == address(0), "TokenID already minted");

        // 更新 to 的 GitHub Username
        _addressToUsername[to] = username;
        // 铸造 Git ID
        _mint(to, tokenId);

        emit Minted(to, tokenId, username);
    }

    // 销毁旧的GitID NFT
    function burn(string memory username) public isController {
        uint256 tokenId = getTokenIdByUsername(username);
        address from = ownerOf(tokenId);
        // 更新 from 的 GitHub Username
        delete _addressToUsername[from];
        // 销毁 Git ID
        _burn(tokenId);

        emit Burned(from, tokenId, username);
    }

    // SoulBound: 不允许transfer，只允许mint/burn
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        if (from != address(0) && to != address(0)) {
            revert("Soulbound: Transfer failed");
        }

        return super._update(to, tokenId, auth);
    }

    // 通过用户名获取TokenID
    function getTokenIdByUsername(string memory username) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(username)));
    }

    // 通过用户名获取owner地址
    function getOwnerByUsername(string memory username) public view returns (address) {
        uint256 tokenId = getTokenIdByUsername(username);
        return ownerOf(tokenId);
    }

    // 通过地址获取用户名
    function getUsernameByAddress(address owner) public view returns (string memory) {
        return _addressToUsername[owner];
    }

    // 通过地址获取TokenID
    function getTokenIdByAddress(address owner) public view returns (uint256) {
        return getTokenIdByUsername(_addressToUsername[owner]);
    }

    // 通过TokenID获取GitHub用户名
    function getUsernameByTokenId(uint256 tokenId) public view returns (string memory) {
        address owner = ownerOf(tokenId);
        return _addressToUsername[owner];
    }

    // 通过TokenID获取owner地址
    function getOwnerByTokenId(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    // 设置BaseURI
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory name = getUsernameByTokenId(tokenId);
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, name)) : "";
    }
}
