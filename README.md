# Ethereum Block Explorer

Ethereum Block Explorer is a  application built with React for the frontend and powered by the Alchemy API for the backend. This explorer empowers users to interactively explore and analyze information on the Ethereum blockchain.

## Features

### Block Information
- **Search by Block Number:** Retrieve details of a specific Ethereum block by providing its block number.
- **Search by Block Hash:** Explore information about a block using its unique block hash.

### Transaction Details
- **Transaction by Hash:** Get detailed information about a specific Ethereum transaction by providing its transaction hash.
- **Account History:** View the transaction history of an Ethereum account, including the last 1000 transactions.

### NFT Metadata and Pricing
- **NFT Metadata Lookup:** Fetch metadata of an NFT by providing the contract address and token ID.
- **NFT Floor Price:** Find the floor price of an NFT collection using its contract address.

## Technologies Used

- **Frontend:** React.js
- **Backend:** Alchemy SDK


## Getting Started

To run the Ethereum Block Explorer locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/mdasifahamed/ALCHEMY-Ethereum-Block-Explorer-PROJECT.git

   cd blockexplorer npm install
2. Open the the project and create a `.env` file inside that write ``` ALCHEMY_APIKEY=YOUR_APIKEY ``` replace YOUR_APIKEY  with your personal alchemy api key.
3.  Run the application locally.
   ``` npm start ```

## Contributions

Contributions are welcome! If you find a bug or have suggestions for improvements, feel free to open an issue or submit a pull request.
