// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import {ERC721URIStorage, ERC721} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract MemeTimeCapsule is ERC721URIStorage {
    struct Meme {
        uint256 id;
        string ipfsHash;
        uint256 unlockTime;
        address creator;
    }

    mapping(uint256 => Meme) public memes;
    uint256[] public memeIds;

    uint256 private _nextTokenId = 0;
    mapping(uint256 => string) private _tokenURIs;

    IERC20 public token; // ERC20 token contract

    constructor() ERC721("MemeTimeCapsule", "MTC") {}

    function mintMeme(
        address to,
        string memory ipfsHash,
        uint256 unlockTime
    ) public returns (uint256) {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, ipfsHash);
        memeIds.push(tokenId);
        memes[tokenId] = Meme(tokenId, ipfsHash, unlockTime, msg.sender);

        return tokenId;
    }

    /* Getter Functions */

    // Function to get all unlocked memes as an array of Meme structs
    function getUnlockedMemes() public view returns (Meme[] memory) {
        uint256 unlockedCount = 0;
        uint256 memeCount = memeIds.length;

        // First, count the number of unlocked memes to initialize the array
        for (uint256 i = 0; i < memeCount; i++) {
            if (block.timestamp >= memes[i].unlockTime) {
                unlockedCount++;
            }
        }

        // Create an array to store unlocked Meme structs
        Meme[] memory unlockedMemes = new Meme[](unlockedCount);
        uint256 index = 0;

        // Populate the unlocked memes array
        for (uint256 i = 0; i < memeCount; i++) {
            if (block.timestamp >= memes[i].unlockTime) {
                unlockedMemes[index] = memes[i];
                index++;
            }
        }

        return unlockedMemes;
    }

    // Function to get all memes owned by a specific address
    function getOwnedMemes(address owner) public view returns (Meme[] memory) {
        uint256 ownedCount = balanceOf(owner);
        uint256 memeCount = memeIds.length;

        // Create an array to store the owned Meme structs
        Meme[] memory ownedMemes = new Meme[](ownedCount);
        uint256 index = 0;

        // Populate the owned memes array
        for (uint256 i = 0; i < memeCount; i++) {
            if (ownerOf(memeIds[i]) == owner) {
                ownedMemes[index] = memes[memeIds[i]];
                index++;
            }
        }

        return ownedMemes;
    }

    function sendTokensToCreator(uint256 tokenId, uint256 amount) public {
        require(memes[tokenId].creator != address(0), "Meme does not exist");
        require(
            msg.sender != memes[tokenId].creator,
            "Creator cannot pay themselves"
        );
        require(
            amount >= 15 && amount <= 100,
            "Amount must be between 15 and 100"
        ); // Ensure valid amount

        address creator = memes[tokenId].creator;

        // Transfer tokens from msg.sender to the creator
        require(
            token.transferFrom(msg.sender, creator, amount),
            "Token transfer failed"
        );
    }
}
