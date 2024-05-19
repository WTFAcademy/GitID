// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GitID
 * @dev GitID 合约继承自 ERC721 和 Ownable，用于铸造和管理与 GitHub 用户名相关的 NFT。仅允许 Controller 合约调用铸造和销毁功能。
 */
contract GitID is ERC721, Ownable {
    // 存储地址与其 GitHub 用户名的映射
    mapping(address => string) private _addressToUsername;

    // Controller 合约的地址
    address public controller;

    // 基础 URI
    string public baseURI;

    // 事件：记录 NFT 的铸造
    event Minted(address indexed to, uint256 indexed tokenId, string username);
    
    // 事件：记录 NFT 的销毁
    event Burned(address indexed from, uint256 indexed tokenId, string username);

    /**
     * @dev 构造函数，初始化 ERC721 合约和 Ownable 合约
     */
    constructor() ERC721("GitID", "GITID") Ownable(msg.sender) {}

    /**
     * @dev 设置 Controller 合约的地址，仅所有者可调用
     * @param controller_ 新的 Controller 地址
     */
    function setController(address controller_) public onlyOwner {
        controller = controller_;
    }

    /**
     * @dev 修饰符，仅允许 Controller 调用
     */
    modifier isController() {
        require(msg.sender == controller, "Caller is not the controller");
        _;
    }

    /**
     * @dev 铸造新的 GitID NFT，仅允许 Controller 调用
     * @param to 接收 NFT 的地址
     * @param username 与 NFT 关联的 GitHub 用户名
     */
    function mint(address to, string memory username) public isController {
        require(balanceOf(to) == 0, "Address already has a GitID");

        uint256 tokenId = getTokenIdByUsername(username);
        require(_ownerOf(tokenId) == address(0), "TokenID already minted");

        // 更新 to 的 GitHub 用户名
        _addressToUsername[to] = username;
        // 铸造 Git ID
        _mint(to, tokenId);

        emit Minted(to, tokenId, username);
    }

    /**
     * @dev 销毁旧的 GitID NFT，仅允许 Controller 调用
     * @param username 关联的 GitHub 用户名
     */
    function burn(string memory username) public isController {
        uint256 tokenId = getTokenIdByUsername(username);
        address from = ownerOf(tokenId);
        // 删除 from 的 GitHub 用户名
        delete _addressToUsername[from];
        // 销毁 Git ID
        _burn(tokenId);

        emit Burned(from, tokenId, username);
    }

    /**
     * @dev 禁止转移功能，只允许铸造和销毁
     * @param to 接收地址
     * @param tokenId 代币 ID
     * @param auth 授权地址
     * @return 旧的所有者地址
     */
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

    /**
     * @dev 通过用户名获取 TokenID
     * @param username GitHub 用户名
     * @return 对应的 TokenID
     */
    function getTokenIdByUsername(string memory username) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(username)));
    }

    /**
     * @dev 通过用户名获取所有者地址
     * @param username GitHub 用户名
     * @return 对应的所有者地址
     */
    function getOwnerByUsername(string memory username) public view returns (address) {
        uint256 tokenId = getTokenIdByUsername(username);
        return ownerOf(tokenId);
    }

    /**
     * @dev 通过地址获取 GitHub 用户名
     * @param owner 所有者地址
     * @return 对应的 GitHub 用户名
     */
    function getUsernameByAddress(address owner) public view returns (string memory) {
        return _addressToUsername[owner];
    }

    /**
     * @dev 通过地址获取 TokenID
     * @param owner 所有者地址
     * @return 对应的 TokenID
     */
    function getTokenIdByAddress(address owner) public view returns (uint256) {
        return getTokenIdByUsername(_addressToUsername[owner]);
    }

    /**
     * @dev 通过 TokenID 获取 GitHub 用户名
     * @param tokenId 代币 ID
     * @return 对应的 GitHub 用户名
     */
    function getUsernameByTokenId(uint256 tokenId) public view returns (string memory) {
        address owner = ownerOf(tokenId);
        return _addressToUsername[owner];
    }

    /**
     * @dev 通过 TokenID 获取所有者地址
     * @param tokenId 代币 ID
     * @return 对应的所有者地址
     */
    function getOwnerByTokenId(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    /**
     * @dev 设置基础 URI
     * @return 基础 URI 字符串
     */
    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    /**
     * @dev 设置新的基础 URI，仅所有者可调用
     * @param baseURI_ 新的基础 URI
     */
    function setBaseURI(string memory baseURI_) external onlyOwner {
        baseURI = baseURI_;
    }

    /**
     * @dev 返回 TokenID 的 URI
     * @param tokenId 代币 ID
     * @return 对应的 URI 字符串
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory name = getUsernameByTokenId(tokenId);
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, name)) : "";
    }
}
