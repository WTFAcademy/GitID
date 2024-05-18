pragma solidity >=0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


contract GitID is Ownable, ERC721, ERC721Enumerable  {

    // basename '.gitid'
    string public baseName;
    string public baseURI;

    // A map of tokenId to name
    mapping(uint256=>string) names;

    // A map of addresses that are authorised to register and renew names.
    mapping(address=>bool) public minters;


    event MinterAdded(address indexed minter);
    event MinterRemoved(address indexed minter);
    event NameRegistered(uint256 indexed id, address indexed owner);


    constructor(string memory _name, string memory _symbol, string memory _baseName) ERC721(_name, _symbol) {
        baseName = _baseName;
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        bool result = super.supportsInterface(interfaceId);
        if (result) {
            return true;
        }
        if (interfaceId == type(IERC721Enumerable).interfaceId) {
            return true;
        }
        return false;
    }

    modifier onlyMinter {
        require(minters[msg.sender]);
        _;
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize) internal override(ERC721, ERC721Enumerable) {
        require(balanceOf(to) == 0);
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function addMinter(address minter) external onlyOwner {
        minters[minter] = true;
        emit MinterAdded(minter);
    }

    // Revoke minter permission for an address.
    function removeMinter(address minter) external onlyOwner {
        minters[minter] = false;
        emit MinterRemoved(minter);
    }


    /**
     * @dev Register a name.
     * @param id The token ID (keccak256 of the label).
     * @param owner The address that should own the registration.
     */
    function register(uint256 id, address owner) external onlyMinter {
        return _register(id, owner);
    }


    function _register(uint256 id, string memory name, address owner) internal {
        require(!_exists(id), 'Already registered');

        _mint(owner, id);
        names[id] = name;

        emit NameRegistered(id, owner);
    }


    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        _requireMinted(tokenId);
        string memory name = getName(tokenId);
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, name)) : "";
    }

    function setBaseURI(string calldata uri) public onlyOwner {
        baseURI = uri;
    }

    function getName(uint256 tokenId) public view returns(string memory) {
        string memory name = names[tokenId];
        return name;
    }
}
