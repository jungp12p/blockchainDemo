# Blockchain Demo

A simple interactive blockchain demonstration app.

## Credits

This project is based on the original [blockchain-in-js](https://github.com/nambrot/blockchain-in-js) by [nambrot](https://github.com/nambrot).

## Installation
Make sure to have Node.js installed:
https://nodejs.org/en/download

Install the required dependencies:

```bash
npm install --legacy-peer-deps
```

## Running the App

Start the development server:

```bash
npm start
```

The app will open at `http://localhost:3000`.

## How to Use

1. **Create or Select a Blockchain** - Use the dropdown at the top to create a new blockchain or select an existing one.

2. **Choose Hash Algorithm** - Select from different cryptographic hash algorithms (SHA-256, SHA-512, SHA-1, SHA-3, MD5) to see how they affect blockchain security and performance.

3. **Adjust Difficulty** - Use the difficulty dropdown to set the mining difficulty from 1 to 10. Higher difficulty requires more trailing zeros in block hashes, making mining computationally harder.

4. **View the Blockchain Tree** - The main view shows your blockchain as a tree of blocks, with the longest chain highlighted.

5. **Mine Blocks** - Click the "Mine Here" button on any block to create a new child block. You'll receive 10 coins as a mining reward.

6. **Create Transactions** - Add transactions to your new blocks before mining them.

7. **View Block Details** - Click the database icon on any block to see its details, including transactions and the UTXO pool.

8. **Manage Identities** - Create multiple identities to simulate different miners and users in your blockchain network.

9. **Transaction History** - View the complete transaction history for any identity, including incoming/outgoing transactions, mining rewards, and running balance.

## Hash Algorithms

The demo supports multiple cryptographic hash algorithms:

You can switch algorithms at any time using the dropdown in the navigation bar. Each algorithm will produce different hash outputs, demonstrating how hash functions work in blockchain technology.

## Mining Difficulty

The difficulty setting controls how hard it is to mine a valid block. Difficulty ranges from 1 to 10, representing the number of trailing zeros required in a block's hash.

- **Lower difficulty (1-2)**: Blocks are mined quickly, good for testing and demonstration
- **Higher difficulty (8-10)**: Mining takes significantly longer, simulating real-world blockchain mining challenges

You can adjust the difficulty at any time using the dropdown in the navigation bar. Changes apply immediately to new blocks being mined.
