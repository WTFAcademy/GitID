pragma solidity >=0.8.4;

interface IGitIDMinter {
    function register(
        string calldata username,
        bytes calldata signature,
        address
    ) external payable;
}
