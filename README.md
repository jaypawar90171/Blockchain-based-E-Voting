Blockchain-based Decentralized Voting System

Overview

The Blockchain-based Decentralized Voting System is a secure and transparent voting platform leveraging Ethereum Blockchain and IPFS for data integrity and accessibility. This system ensures that votes are immutable, reducing fraud and enhancing trust in the voting process.

Features

Decentralized & Transparent: Powered by Ethereum Smart Contracts.

Secure & Immutable: Votes cannot be altered once cast.

User Authentication: Role-based access for voters and administrators.

IPFS Integration: Stores images of candidates and voters securely.

Real-time Voting Period: Voting starts and ends based on a predefined period.

Automatic Vote Tallying: Results are calculated automatically once the voting period ends.

Reset Functionality: Allows resetting counters and clearing mappings for a fresh voting session.

Tech Stack

Frontend:

React.js – For building the user interface

Tailwind CSS – For styling

React Router – For navigation

Socket.io – For real-time communication

Backend:

Node.js & Express.js – For API development

MongoDB (Atlas) – Database for user and project data

Web3.js / ethers.js – To interact with the Ethereum blockchain

Hardhat – For smart contract deployment and testing

IPFS – For decentralized storage

Smart Contracts:

Solidity – For writing Ethereum smart contracts

Hardhat – For testing and deployment

Setup & Installation

Prerequisites

Ensure you have the following installed:

Node.js (v16 or later)

npm or yarn

Metamask (for interacting with the blockchain)

Ganache (optional, for local Ethereum blockchain testing)

Clone the Repository

git clone https://github.com/jaypawar90171/Blockchain-based-E-Voting.git
cd Blockchain-based-E-Voting

Install Dependencies

npm install  # or yarn install

Configure Environment Variables

Create a .env file in the root directory and add the following:

MONGO_URI=<your_mongodb_connection_string>
INFURA_API_KEY=<your_infura_api_key>
PRIVATE_KEY=<your_wallet_private_key>

Run the Backend Server

npm run server

Deploy Smart Contracts

npx hardhat compile
npx hardhat deploy --network localhost

Start the Frontend

npm start

Smart Contract Functionalities

Candidate Registration: Admin adds candidates.

Voter Registration: Users register to vote.

Voting Period Control: Admin sets voting start and end time.

Vote Casting: Registered voters can vote only once.

Result Calculation: Automated tallying once voting ends.

Reset System: Clears previous data for a new election cycle.

API Endpoints

Method

Endpoint

Description

GET

/users/all

Fetch all registered users

PUT

/projects/add-user

Add collaborators to project

POST

/projects/vote

Submit a vote

GET

/projects/results

Fetch election results

Folder Structure

Blockchain-based-E-Voting/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   ├── index.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   ├── App.js
│
├── smart-contracts/
│   ├── contracts/
│   │   ├── Voting.sol
│   ├── scripts/
│   ├── hardhat.config.js
│
├── README.md
├── package.json
├── .env

Future Enhancements

Multi-chain Support – Expanding support for other blockchains like Polygon or Binance Smart Chain.

Mobile Application – A React Native-based mobile voting application.

Identity Verification – Integrating decentralized identity verification using Zero-Knowledge Proofs (ZKP).

Contributors

Jay Pawar – Smart Contracts & Backend

Sanika Navale – Frontend

Akash Gurav – Frontend

Alfaj Mulla – Backend


Contact

For any queries or contributions, reach out to jaypawar90171@gmail.com.

