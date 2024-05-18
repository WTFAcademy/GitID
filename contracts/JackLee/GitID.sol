// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title GitID
 * @dev A contract for managing GitID NFTs. This contract handles the minting and burning of GitID NFTs.
 * Each GitID NFT is associated with a unique GitHub username.
 */
contract GitID is ERC721, Ownable {
    // Mapping from user address to GitHub username
    mapping(address => string) private _addressToUsername;
    // Base URI for all tokens
    string private _URI;

    // Address of the controller contract
    address public controller;

    // Event emitted when a new GitID is minted
    event Mint(address indexed user, uint256 indexed tokenId, string username);
    // Event emitted when a GitID is burned
    event Burn(address indexed user, uint256 indexed tokenId, string username);

    /**
     * @dev Constructor initializes the ERC721 token with a name and a symbol.
     */
    constructor() ERC721("GitID", "GitID") Ownable(msg.sender) {}

    /**
     * @dev Sets the controller contract address.
     * @param controller_ The address of the controller contract.
     */
    function setController(address controller_) public onlyOwner {
        controller = controller_;
    }

    /**
     * @dev Modifier to check if the caller is the controller contract.
     */
    modifier isController() {
        require(
            msg.sender == controller,
            "GitID: Caller is not the controller"
        );
        _;
    }

    /**
     * @dev Mints a new GitID NFT if the GitHub username is not already taken.
     * If the user already has a GitID, it burns the old one before minting a new one.
     * @param user The address of the user who will receive the GitID NFT.
     * @param githubUsername The GitHub username to be associated with the GitID NFT.
     */
    function mint(
        address user,
        string memory githubUsername
    ) external isController {
        // Ensure the user does not already have a GitID
        require(
            keccak256(abi.encodePacked(_addressToUsername[user])) ==
                keccak256(abi.encodePacked("")),
            "GitID: Username already taken"
        );

        // Generate tokenId based on the GitHub username
        uint256 tokenId = getTokenIdByUsername(githubUsername);

        // Burn old GitID if it exists
        if (
            keccak256(abi.encodePacked(_addressToUsername[user])) !=
            keccak256(abi.encodePacked(""))
        ) {
            _burnGitID(user);
        }

        // Mint new GitID
        _mint(user, tokenId);

        // Update mappings
        _addressToUsername[user] = githubUsername;

        emit Mint(user, tokenId, githubUsername);
    }

    /**
     * @dev Burns a GitID NFT owned by the specified user.
     * @param user The address of the user whose GitID NFT will be burned.
     */
    function burn(address user) external isController {
        // Ensure the user has a GitID to burn
        require(
            keccak256(abi.encodePacked(_addressToUsername[user])) !=
                keccak256(abi.encodePacked("")),
            "GitID: No GitID to burn"
        );

        _burnGitID(user);
    }

    /**
     * @dev Internal function to burn a GitID NFT.
     * @param user The address of the user whose GitID NFT will be burned.
     */
    function _burnGitID(address user) internal {
        // Retrieve the GitHub username and tokenId for the user
        string memory githubUsername = _addressToUsername[user];
        uint256 tokenId = getTokenIdByAddress(user);
        // Update mappings
        delete _addressToUsername[user];

        // Burn the token
        _burn(tokenId);

        emit Burn(user, tokenId, githubUsername);
    }

    /**
     * @dev Generates a tokenId based on the GitHub username.
     * @param username The GitHub username.
     * @return The generated tokenId.
     */
    function getTokenIdByUsername(
        string memory username
    ) public pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(".git", username)));
    }

    /**
     * @dev Retrieves the address of the owner of the GitID associated with the given username.
     * @param username The GitHub username.
     * @return The address of the owner.
     */
    function getAddressByUsername(
        string memory username
    ) public view returns (address) {
        uint256 tokenId = getTokenIdByUsername(username);
        return ownerOf(tokenId);
    }

    /**
     * @dev Retrieves the address of the owner of the given tokenId.
     * @param tokenId The tokenId of the GitID.
     * @return The address of the owner.
     */
    function getAddressByTokenId(
        uint256 tokenId
    ) public view returns (address) {
        return ownerOf(tokenId);
    }

    /**
     * @dev Retrieves the GitHub username associated with the given address.
     * @param user The address of the user.
     * @return The GitHub username.
     */
    function getUsernameByAddress(
        address user
    ) public view returns (string memory) {
        return _addressToUsername[user];
    }

    /**
     * @dev Retrieves the tokenId associated with the given address.
     * @param user The address of the user.
     * @return The tokenId.
     */
    function getTokenIdByAddress(address user) public view returns (uint256) {
        string memory username = _addressToUsername[user];
        return getTokenIdByUsername(username);
    }

    /**
     * @dev Retrieves the GitHub username associated with the given tokenId.
     * @param tokenId The tokenId of the GitID.
     * @return The GitHub username.
     */
    function getUsernameByTokenId(
        uint256 tokenId
    ) public view returns (string memory) {
        address owner = ownerOf(tokenId);
        return getUsernameByAddress(owner);
    }

    /**
     * @dev Internal function to handle updates to the token's ownership.
     * Ensures that GitID tokens are non-transferable (soulbound).
     * @param to The address to transfer the token to.
     * @param tokenId The ID of the token to transfer.
     * @param auth The address that authorized the transfer.
     * @return The address of the previous owner of the token.
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address owner = _ownerOf(tokenId);
        if (owner != address(0) && to != address(0)) {
            revert("GitID: SoulBound, Transfer failed");
        }

        return super._update(to, tokenId, auth);
    }

    /**
     * @dev Returns the base URI for all token URIs.
     * @return The base URI.
     */
    function _baseURI() internal view override returns (string memory) {
        return _URI;
    }

    /**
     * @dev Sets a new base URI for all tokens.
     * @param newURI_ The new base URI.
     */
    function setTokenURI(string memory newURI_) public onlyOwner {
        _URI = newURI_;
    }

    /**
     * @dev Retrieves the token URI for the given tokenId.
     * @param tokenId The ID of the token to retrieve the URI for.
     * @return The token URI.
     */
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        _requireOwned(tokenId);
        string memory username = getUsernameByTokenId(tokenId);
        return
            bytes(_URI).length > 0
                ? string(abi.encodePacked(_URI, username))
                : "";
    }
}
