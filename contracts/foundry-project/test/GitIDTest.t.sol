// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/GitID.sol";

/**
 * @title GitIDTest
 * @dev 测试 GitID 合约的功能，包括铸造、销毁、权限和转移限制。
 */
contract GitIDTest is Test {
    GitID public gitID;
    address public controller = address(0x1234);
    address public user1 = address(0x5678);
    string public username = "testuser";

    /**
     * @dev 设置测试环境，在每个测试函数之前运行。
     * 部署 GitID 合约并设置 Controller 地址。
     */
    function setUp() public {
        gitID = new GitID();
        gitID.setController(controller);
    }

    /**
     * @dev 测试铸造 GitID NFT。
     * 检查铸造后所有者地址和用户名是否正确映射。
     */
    function testMint() public {
        vm.prank(controller);
        gitID.mint(user1, username);

        uint256 tokenId = gitID.getTokenIdByUsername(username);
        assertEq(gitID.ownerOf(tokenId), user1);
        assertEq(gitID.getUsernameByAddress(user1), username);
    }

    /**
     * @dev 测试销毁 GitID NFT。
     * 检查销毁后 NFT 是否不存在，以及用户名是否被删除。
     */
    function testBurn() public {
        vm.prank(controller);
        gitID.mint(user1, username);

        uint256 tokenId = gitID.getTokenIdByUsername(username);
        vm.prank(controller);
        gitID.burn(username);

        vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, tokenId));
        gitID.ownerOf(tokenId);
        assertEq(gitID.getUsernameByAddress(user1), "");
    }

    /**
     * @dev 测试只有 Controller 可以铸造 GitID NFT。
     * 检查非 Controller 调用铸造函数时是否会失败。
     */
    function testOnlyControllerCanMint() public {
        vm.expectRevert("Caller is not the controller");
        gitID.mint(user1, username);
    }

    /**
     * @dev 测试只有 Controller 可以销毁 GitID NFT。
     * 检查非 Controller 调用销毁函数时是否会失败。
     */
    function testOnlyControllerCanBurn() public {
        vm.prank(controller);
        gitID.mint(user1, username);

        vm.expectRevert("Caller is not the controller");
        gitID.burn(username);
    }

    /**
     * @dev 测试禁止转移 GitID NFT。
     * 检查尝试转移 NFT 时是否会失败。
     */
    function testCannotTransfer() public {
        vm.prank(controller);
        gitID.mint(user1, username);

        uint256 tokenId = gitID.getTokenIdByUsername(username);
        vm.expectRevert("Soulbound: Transfer failed");
        vm.prank(user1);
        gitID.transferFrom(user1, address(0x9ABC), tokenId);
    }

    /**
     * @dev 测试设置基础 URI。
     * 检查设置后的基础 URI 是否正确。
     */
    function testSetBaseURI() public {
        string memory newBaseURI = "https://api.example.com/metadata/";
        gitID.setBaseURI(newBaseURI);
        assertEq(gitID.baseURI(), newBaseURI);
    }

    /**
     * @dev 测试获取 Token URI。
     * 检查生成的 Token URI 是否正确。
     */
    function testTokenURI() public {
        vm.prank(controller);
        gitID.mint(user1, username);

        string memory baseURI = "https://api.example.com/metadata/";
        gitID.setBaseURI(baseURI);

        uint256 tokenId = gitID.getTokenIdByUsername(username);
        string memory expectedURI = string(abi.encodePacked(baseURI, username));
        assertEq(gitID.tokenURI(tokenId), expectedURI);
    }
}
