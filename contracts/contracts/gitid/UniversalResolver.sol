import {GitID} from "./gitid.sol";

contract UniversalResolver {

    GitID gitID;

    constructor(GitID _gitID) public {
        gitID = _gitID;
    }

    function resolve(
        string calldata username
    ) external view returns (address) {
        return _resolveSingle(username);
    }

    function _resolveSingle(
        string calldata username
    ) public view returns (address) {
        uint256 tokenId = gitID.getTokenId(username);
        return gitID.ownerOf(tokenId);
    }

    function getGitHubUserName(
       address userAddress
    ) external view returns (string memory) {
        uint256 balance = gitID.balanceOf(userAddress);
        require(balance > 0, 'USER NO GITID');
        uint256 tokenId = gitID.tokenOfOwnerByIndex(userAddress, 0);
        return gitID.getName(tokenId);
    }

}
