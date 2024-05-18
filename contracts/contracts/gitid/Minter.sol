
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import { IGitIDMinter } from "./IGitIDMinter.sol";
import {GitID} from "./gitid.sol";

contract Minter is Ownable, IGitIDMinter {
    using ECDSA for bytes32;
    GitID gitID;
    address public signer;

    event SignerUpdated(address indexed newSigner);

    event NameRegistered(
        string name,
        address indexed owner,
        uint256 cost
    );

    constructor(GitID _gitID, address _signer) public {
        gitID = _gitID;
        signer = _signer;
    }

    function register(
        string calldata username,
        bytes calldata signature,
        address owner
    ) public payable override{
        uint256 price = msg.value;

        bytes32 messageHash = getMessageHash(username, price);
        address recoveredSigner = messageHash.toEthSignedMessageHash().recover(signature);

        require(recoveredSigner == signer, "Invalid signature");

        uint256 tokenId = gitID.getTokenId(username);

        gitID.register(tokenId, username, owner);

        emit NameRegistered(username, owner, price);
    }

    function getMessageHash(string memory username, uint256 price) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(username, price));
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function updateSigner(address newSigner) external onlyOwner {
        signer = newSigner;
        emit SignerUpdated(newSigner);
    }
}
