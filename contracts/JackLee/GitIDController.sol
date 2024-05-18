// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";
import "@openzeppelin/contracts/utils/Nonces.sol";
import "./GitID.sol";

/**
 * @title GitIDController
 * @dev A controller contract for managing GitID NFTs. This contract handles the minting and burning of GitID NFTs.
 * It uses signatures to verify the authenticity of mint requests.
 */
contract GitIDController is Ownable, Nonces {
    using ECDSA for bytes32;

    // Reference to the GitID contract
    GitID public gitID;
    // Address of the signer who is authorized to sign minting messages
    address public signer;
    // Minting fee
    uint256 public mintFee;

    // Cache the chain ID for checking during minting
    uint256 private immutable _cachedChainId;

    // Event emitted when the signer address is changed
    event SignerChanged(address indexed oldSigner, address indexed newSigner);
    // Event emitted when the minting fee is changed
    event MintFeeChanged(uint256 oldFee, uint256 newFee);

    /**
     * @dev Constructor sets the GitID contract address and the initial signer address.
     * @param gitIDAddress The address of the GitID contract.
     * @param signerAddress The initial signer address.
     */
    constructor(
        address gitIDAddress,
        address signerAddress
    ) Ownable(msg.sender) {
        gitID = GitID(gitIDAddress);
        signer = signerAddress;
        mintFee = 0.069 ether; // Initial mint fee set to 0.069 ether
    }

    /**
     * @dev Computes the message hash for a given GitHub username, chain ID, and user address.
     * @param githubUsername The GitHub username.
     * @param user The user's address.
     * @param expireAt The expiration time of the signature.
     * @param chainId The chain ID.
     * @param isFree Indicates if the minting is free (1 for free, 0 otherwise).
     * @return The computed message hash.
     */
    function getMessageHash(
        string memory githubUsername,
        address user,
        uint256 expireAt,
        uint256 chainId,
        uint8 isFree
    ) public pure returns (bytes32) {
        return
            keccak256(
                abi.encodePacked(
                    githubUsername,
                    user,
                    expireAt,
                    chainId,
                    isFree
                )
            );
    }

    /**
     * @dev Verifies the signature for a given hash.
     * @param hash The hash of the message.
     * @param signature The signature to verify.
     * @return True if the signature is valid, false otherwise.
     */
    function verify(
        bytes32 hash,
        bytes memory signature
    ) public view returns (bool) {
        return ECDSA.recover(hash, signature) == signer;
    }

    /**
     * @dev Mints a new GitID NFT if the provided signature is valid.
     * @param githubUsername The GitHub username to be associated with the GitID NFT.
     * @param user The address of the user who will receive the GitID NFT.
     * @param expireAt The expiration time of the signature.
     * @param chainId The chain ID.
     * @param isFree Indicates if the minting is free (1 for free, 0 otherwise).
     * @param signature The signature to verify the mint request.
     */
    function mint(
        string memory githubUsername,
        address user,
        uint256 expireAt,
        uint256 chainId,
        uint8 isFree,
        bytes memory signature
    ) external payable {
        require(chainId == _cachedChainId, "Invalid ChainId");
        bytes32 messageHash = getMessageHash(
            githubUsername,
            user,
            expireAt,
            chainId,
            isFree
        );
        bytes32 ethSignedMessageHash = MessageHashUtils.toEthSignedMessageHash(
            messageHash
        );

        require(expireAt >= block.timestamp, "Expired signature");
        require(verify(ethSignedMessageHash, signature), "Invalid signature");

        // Check if the user is minting for the first time
        if (isFree == 1) {
            require(msg.value == 0, "First mint is free");
        } else {
            require(msg.value == mintFee, "Mint fee is 0.069 ether");
        }

        gitID.mint(user, githubUsername);
    }

    /**
     * @dev Burns a GitID NFT owned by the specified user.
     * This function is commented out, as it is not currently used.
     * Uncomment and implement if burning functionality is required.
     * @param user The address of the user whose GitID NFT will be burned.
     */
    // function burn(address user) external onlyOwner {
    //     gitID.burn(user);
    // }

    /**
     * @dev Sets a new signer address.
     * @param newSigner The new signer address.
     */
    function setSigner(address newSigner) external onlyOwner {
        address oldSigner = signer;
        signer = newSigner;
        emit SignerChanged(oldSigner, newSigner);
    }

    /**
     * @dev Sets a new mint fee.
     * @param newFee The new mint fee.
     */
    function setMintFee(uint256 newFee) external onlyOwner {
        uint256 oldFee = mintFee;
        mintFee = newFee;
        emit MintFeeChanged(oldFee, newFee);
    }

    /**
     * @dev Withdraws the contract balance to the owner's address.
     * Can only be called by the owner.
     */
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
