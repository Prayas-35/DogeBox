# DogeBox

## Overview

### The Contract is deployed at the address `0x...` at AIA test Network. Check out the contract in the block explorer: [AIAScan]()

DogeBox is a unique blockchain-based platform that allows users to immortalize and preserve their favorite memes as `NFTs`, locking them in a `digital time capsule` to be opened at a future date. By blending humor with technology, this project provides a way to preserve internet culture and meme history, capturing moments that resonate with audiences today for rediscovery tomorrow.

At its core, the project uses `NFTs` (Non-Fungible Tokens) and `IPFS` (InterPlanetary File System) to securely store memes on the blockchain. When users upload a meme, it is stored on IPFS and minted as an NFT, then “`locked`” in a `smart contract` with a specified unlock date. The NFT and its metadata, including IPFS storage and the unlock timestamp, ensure that the meme remains hidden until the selected future date. Upon reaching the unlock time, the meme becomes accessible to everyone, creating an exciting and nostalgic experience.

## Key Features

### Meme NFT Minting

Users can mint their memes as unique NFTs, preserving them on the blockchain as digital collectibles.

### Time-Locked Capsules

Memes are locked in "time capsules" with a user-specified unlock date, creating a surprise reveal at a future moment.

### Decentralized Storage with IPFS

Memes are securely stored on IPFS, ensuring content is decentralized and resistant to tampering.

### Download & Reward System

Once a meme is unlocked, other users can download it by paying a small fee to the NFT owner, incentivizing creators.

### Public Gallery of Unlocked Memes

A gallery interface showcases unlocked memes, offering a nostalgic journey through internet culture.

## Tech Stack

### Frontend:

`Next.js`, `wagmi`, `RainbowKit UI`

### Smart Contract:

`Solidity` and `OpenZeppelin` for minting `NFTs`

### File Storage:

`IPFS (InterPlanetary File System)`

### Deployment:

`HardHat` for deploying the smart contract at AIA testnet. `Vercel` for deploying the client side of the project

## Usage

Although we have a publicly accessible URL at [DogeBox](https://doge-box.vercel.app), here's the guide for installation into your local machine by following these steps:

Make sure you have `Node` and `npm` installed in your system, if not do it from [here](https://nodejs.org/en/download/prebuilt-installer)

Clone this repository by running:

```
https://github.com/Prayas-35/DogeBox.git
```

Navigate to the repository and use the following commands:

```
cd main
npm i
npm run dev
```

Have fun navigating through our application. Cheers!

We welcome contributions! Please fork the repository and submit a pull request.

### Contributions

We welcome contributions! Please follow the general contribution guidelines below and submit a pull request:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature/new-feature`).
3. Make your changes and test thoroughly.
4. Push to your fork and create a pull request.
