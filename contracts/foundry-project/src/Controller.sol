// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";
import "./GitID.sol"; // 确保此路径与您的GitID合约路径匹配

/**
 * @title Controller
 * @dev 此合约允许通过签名验证铸造GitID NFT。只有所有者可以设置签名者和价格，并提取资金。
 */
contract Controller is Ownable, Nonces {
    using MessageHashUtils for bytes32;
    using ECDSA for bytes32;

    GitID private _gitIdContract;
    address private _signer;
    uint256 private _price;
    uint256 private immutable _cachedChainId;

    event UserMinted(address indexed user, uint256 pricePaid, string username);

    /**
     * @dev 构造函数设置GitID合约地址、签名者地址和铸造价格。
     * @param gitIdAddress_ GitID合约的地址。
     * @param signer_ 签名者的地址。
     * @param price_ 铸造价格（以wei为单位）。
     */
    constructor(
        address gitIdAddress_,
        address signer_,
        uint price_
    ) Ownable(msg.sender) {
        _gitIdContract = GitID(gitIdAddress_);
        _signer = signer_;
        _cachedChainId = block.chainid;
        _price = price_;
    }

    /**
     * @dev 设置签名者的地址。只有合约所有者可以调用此函数。
     * @param signer_ 新的签名者地址。
     */
    function setSigner(address signer_) external onlyOwner {
        _signer = signer_;
    }

    /**
     * @dev 如果签名有效且未过期，则铸造一个新的GitID NFT。非免费铸造需支付费用。
     * @param to 接收NFT的地址。
     * @param username 与NFT关联的GitHub用户名。
     * @param isFree 布尔值，指示是否为免费铸造。
     * @param deadline 签名有效的截止时间戳。
     * @param signature 由签名者生成的签名。
     */
    function mintGitID(
        address to,
        string memory username,
        bool isFree,
        uint256 deadline,
        bytes memory signature
    ) external payable {
        // 检查签名是否过期
        require(deadline >= block.timestamp, "Expired signature");

        // 验证签名
        require(
            _verifySignature(
                to,
                username,
                isFree,
                deadline,
                _cachedChainId,
                _useNonce(to),
                signature
            ),
            "Invalid or unauthorized signature"
        );

        // 如果不是免费铸造，检查支付金额
        if (!isFree) {
            require(msg.value >= _price, "Invalid price");
        }

        // 铸造GitID NFT
        _gitIdContract.mint(to, username);

        emit UserMinted(to, msg.value, username);
    }

    /**
     * @dev 验证签名的内部函数。
     * @param to 接收NFT的地址。
     * @param username 与NFT关联的GitHub用户名。
     * @param isFree 布尔值，指示是否为免费铸造。
     * @param deadline 签名有效的截止时间戳。
     * @param chainId 区块链ID。
     * @param nonces 确保签名唯一性的nonce。
     * @param signature 由签名者生成的签名。
     * @return 如果签名有效，返回true，否则返回false。
     */
    function _verifySignature(
        address to,
        string memory username,
        bool isFree,
        uint256 deadline,
        uint256 chainId,
        uint256 nonces,
        bytes memory signature
    ) private view returns (bool) {
        // 生成用于签名的消息哈希
        bytes32 message = keccak256(
            abi.encodePacked(to, username, isFree, deadline, chainId, nonces)
        );

        // 生成以太坊签名消息哈希
        bytes32 ethSignedMessage = message.toEthSignedMessageHash();

        // 恢复签名者地址并验证
        return _signer == ethSignedMessage.recover(signature);
    }

    /**
     * @dev 返回当前的铸造价格。
     * @return 当前价格（以wei为单位）。
     */
    function getPrice() external view returns (uint256) {
        return _price;
    }

    /**
     * @dev 设置铸造价格。只有合约所有者可以调用此函数。
     * @param price_ 新的价格（以wei为单位）。
     */
    function setPrice(uint256 price_) external onlyOwner {
        _price = price_;
    }

    /**
     * @dev 提取合约余额到所有者地址。只有合约所有者可以调用此函数。
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
