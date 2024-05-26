// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/Controller.sol";
import "../src/GitID.sol";
import "@openzeppelin/contracts/utils/cryptography/MessageHashUtils.sol";

/**
 * @title ControllerTest
 * @dev 测试 Controller 和 GitID 合约的功能，包括铸造、签名验证、权限控制和资金提取。
 */
contract ControllerTest is Test {
    Controller public controller;
    GitID public gitID;
    address public owner = address(0xa0Ee7A142d267C1f36714E4a8F75612F20a79720);
    address public user = address(0x2);
    address public signer = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);
    uint256 public price = 0.01 ether;
    string public username = "testuser";
    uint256 public deadline = block.timestamp + 1 days;
    // 使用Foundry提供的私钥
    uint256 public signerPrivateKey =
        uint256(
            0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
        );

    /**
     * @dev 设置测试环境，在每个测试函数之前运行。
     * 部署 GitID 和 Controller 合约，并设置 Controller 地址。
     */
    function setUp() public {
        // 确保 owner 拥有足够的资金
        vm.deal(owner, 10 ether);

        vm.startPrank(owner);
        gitID = new GitID();
        controller = new Controller(address(gitID), signer, price);
        gitID.setController(address(controller));
        vm.stopPrank();
    }

    /**
     * @dev 测试铸造 GitID NFT。
     * 检查铸造后所有者地址和用户名是否正确映射。
     */
    function testMintGitID() public {
        vm.prank(owner);
        vm.deal(user, 1 ether);

        uint256 nonce = controller.nonces(user);
        bytes32 message = keccak256(
            abi.encodePacked(
                user,
                username,
                false,
                deadline,
                block.chainid,
                nonce
            )
        );
        bytes32 ethSignedMessage = MessageHashUtils.toEthSignedMessageHash(
            message
        );

        // 使用签名者的私钥签名消息
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            signerPrivateKey,
            ethSignedMessage
        );
        bytes memory signature = abi.encodePacked(r, s, v);

        // 调试输出
        emit log_named_address("Signer", signer);
        emit log_named_bytes32("Message", message);
        emit log_named_bytes32("Eth Signed Message", ethSignedMessage);
        emit log_named_bytes("Signature", signature);

        // 使用用户地址调用 mintGitID 函数
        vm.prank(user);
        controller.mintGitID{value: price}(
            user,
            username,
            false,
            deadline,
            signature
        );

        uint256 tokenId = gitID.getTokenIdByUsername(username);
        assertEq(gitID.ownerOf(tokenId), user);
        assertEq(gitID.getUsernameByAddress(user), username);
    }

    /**
     * @dev 测试使用过期签名铸造 GitID NFT。
     * 检查是否会因签名过期而失败。
     */
    function testMintGitIDWithExpiredSignature() public {
        vm.prank(owner);
        vm.deal(user, 1 ether);

        uint256 expiredDeadline = block.timestamp - 1;
        bytes32 message = keccak256(
            abi.encodePacked(
                user,
                username,
                false,
                expiredDeadline,
                block.chainid,
                controller.nonces(user)
            )
        );
        bytes32 ethSignedMessage = MessageHashUtils.toEthSignedMessageHash(
            message
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            signerPrivateKey,
            ethSignedMessage
        );
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(user);
        vm.expectRevert("Expired signature");
        controller.mintGitID{value: price}(
            user,
            username,
            false,
            expiredDeadline,
            signature
        );
    }

    /**
     * @dev 测试使用无效签名铸造 GitID NFT。
     * 检查是否会因签名无效而失败。
     */
    function testMintGitIDWithInvalidSignature() public {
        vm.prank(owner);
        vm.deal(user, 1 ether);

        bytes32 message = keccak256(
            abi.encodePacked(
                user,
                username,
                false,
                deadline,
                block.chainid,
                controller.nonces(user)
            )
        );
        bytes32 ethSignedMessage = MessageHashUtils.toEthSignedMessageHash(
            message
        );
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(
            uint256(uint160(address(0x3))),
            ethSignedMessage
        ); // 使用不同的密钥签名
        bytes memory signature = abi.encodePacked(r, s, v);

        vm.prank(user);
        vm.expectRevert("Invalid or unauthorized signature");
        controller.mintGitID{value: price}(
            user,
            username,
            false,
            deadline,
            signature
        );
    }

    /**
     * @dev 测试只有所有者可以设置价格。
     * 检查非所有者调用设置价格函数时是否会失败。
     */
    function testOnlyOwnerCanSetPrice() public {
        vm.prank(owner);
        controller.setPrice(0.02 ether);
        assertEq(controller.getPrice(), 0.02 ether);

        vm.prank(user);
        vm.expectRevert(
            abi.encodeWithSelector(
                Ownable.OwnableUnauthorizedAccount.selector,
                user
            )
        );
        controller.setPrice(0.03 ether);
    }

    /**
     * @dev 测试提取合约中的资金。
     * 检查提取后所有者的余额是否增加。
     */
    function testWithdraw() public {
        // 确保合约有足够的资金
        testMintGitID();
        uint256 ownerBalanceBefore = owner.balance;
        console.log("balance", address(controller).balance);

        vm.prank(owner);
        controller.withdraw();

        uint256 ownerBalanceAfter = owner.balance;

        console.log("balanceBefore", ownerBalanceBefore);
        console.log("balanceAfter", ownerBalanceAfter);

        assertEq(ownerBalanceAfter, ownerBalanceBefore + 0.01 ether);
    }
}
