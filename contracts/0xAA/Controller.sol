// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";
import "./GitID.sol"; // 确保此路径与您的GitID合约路径匹配

contract Controller is Ownable, Nonces {
    using MessageHashUtils for bytes32;
    using ECDSA for bytes32;

    GitID private _gitIdContract;
    address private _signer;
    uint256 private _price;
    uint256 private immutable _cachedChainId;

    event UserMinted(address indexed user, uint256 pricePaid, string username);

    constructor(address gitIdAddress_, address signer_, uint price_) Ownable (msg.sender){
        _gitIdContract = GitID(gitIdAddress_);
        _signer = signer_;
        _cachedChainId = block.chainid;
        _price = price_;
    }

    // 设置后端签名者的地址
    function setSigner(address signer_) external onlyOwner {
        _signer = signer_;
    }

    // Mint一个新的GitID NFT
    function mintGitID(address to, string memory username, bool isFree, uint256 deadline, bytes memory signature) external payable {
        // 检查signature时效性
        require(deadline >= block.timestamp, "Expired signature");
        // 验证后端的签名
        require(_verifySignature(to, username, isFree, deadline, _cachedChainId, _useNonce(to), signature), "Invalid or unauthorized signature");
        
        if(!isFree){
            // 检查用户支付的价格
            require(msg.value >= _price, "Invalid price");
        }
        // 调用GitID合约的mint函数
        _gitIdContract.mint(to, username);

        emit UserMinted(to, msg.value, username);
    }

    // 验证签名的内部函数
    function _verifySignature(address to, string memory username, bool isFree, uint256 deadline, uint256 chainId, uint256 nonces, bytes memory signature) private view returns (bool) {
        // 生成用于签名的消息
        bytes32 message = keccak256(abi.encodePacked(to, username, isFree, deadline, chainId, nonces));
        bytes32 ethSignedMessage = message.toEthSignedMessageHash();

        // 恢复签名者地址
        return _signer == ethSignedMessage.recover(signature);
    }

    // 查询mint Price
    function getPrice() external view returns(uint256){
        return _price;
    }

    // 设置mint Price
    function setPrice(uint256 price_) external onlyOwner {
        _price = price_;
    }

    // 提取资金
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
