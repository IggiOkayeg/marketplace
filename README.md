# AI Model Marketplace dApp
## Overview
This project is a decentralized application (dApp) that allows users to list, purchase, and rate AI models. The smart contract handles the core functionality, and the frontend interacts with the contract using Web3.js.
## Usage
A: Preparations - how to run dApp locally
1. Install dependences to work with solidity: npm, node.js, web3, truffle
   You can use commands: npm install
2. Install Ganache https://archive.trufflesuite.com/docs/ganache/
3. Open project repository on Visual Studio Code
4. In assignment2 terminal:
   1. Open the Ganache on your machine
   2. Compile smart contracts: truffle compile
   3. Deploy contracts to local network: truffle migrate --reset --network development
5. In client terminal:
   1. Run: npm run dev - it will open the webpage in your web-browser
6. Connect to the ganache network on your MetaMask by the private key

B: Functionality overview
   1. First, you can add the new model to the list.
      ![image](https://github.com/user-attachments/assets/cdab908c-a338-4423-9712-e4607f41e835)
   2. All available models will be shown on the grid below.
      ![image](https://github.com/user-attachments/assets/8f2b6306-624d-491c-87f0-2cdeb7d18dc7)
   3. You can purchase the model for the set price and view model details.
      ![image](https://github.com/user-attachments/assets/dbaf77bf-398e-49d2-9028-cba9866812ed)
   4. You can rate the model (only that you have purchased).
      ![image](https://github.com/user-attachments/assets/80469295-5f4a-4225-9774-7c77fc90ef26)
   5. You can get all the money from selling your models.



      

      

   
