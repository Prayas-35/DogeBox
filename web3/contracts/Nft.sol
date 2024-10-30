// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract Nft is ERC721URIStorage {
    uint256 private _nextTokenId = 0;
    mapping(uint256 => string) private _tokenURIs;
    uint256[] private _mintedTokens;
    constructor() ERC721("NFT", "NFT") {}

    function mint(address to, string memory tokenURI) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        _mintedTokens.push(tokenId);

        return tokenId;
    }

    /*Getter Functions */
    
    // Function to get the URI of a specific token
    function getTokenUri(uint256 tokenId) public view returns (string memory) {
        return tokenURI(tokenId);
    }

    // Function to get all minted tokens
    function getMintedTokens() public view returns (uint256[] memory) {
        return _mintedTokens;
    }
}
