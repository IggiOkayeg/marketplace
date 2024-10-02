if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
  }
  
var contractABI = [{
  "inputs": [],
  "name": "modelCount",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "models",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "description",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "internalType": "address payable",
      "name": "creator",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "ratingSum",
      "type": "uint8"
    },
    {
      "internalType": "uint8",
      "name": "ratingCount",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    }
  ],
  "name": "pendingWithdrawals",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "address",
      "name": "",
      "type": "address"
    },
    {
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }
  ],
  "name": "purchases",
  "outputs": [
    {
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
},
{
  "inputs": [
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "description",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    }
  ],
  "name": "listModel",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "modelId",
      "type": "uint256"
    }
  ],
  "name": "purchaseModel",
  "outputs": [],
  "stateMutability": "payable",
  "type": "function",
  "payable": true
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "modelId",
      "type": "uint256"
    },
    {
      "internalType": "uint8",
      "name": "rating",
      "type": "uint8"
    }
  ],
  "name": "rateModel",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "withdrawFunds",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [],
  "name": "resetModels",
  "outputs": [],
  "stateMutability": "nonpayable",
  "type": "function"
},
{
  "inputs": [
    {
      "internalType": "uint256",
      "name": "modelId",
      "type": "uint256"
    }
  ],
  "name": "getModelDetails",
  "outputs": [
    {
      "internalType": "uint256",
      "name": "id",
      "type": "uint256"
    },
    {
      "internalType": "string",
      "name": "name",
      "type": "string"
    },
    {
      "internalType": "string",
      "name": "description",
      "type": "string"
    },
    {
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "internalType": "address",
      "name": "creator",
      "type": "address"
    },
    {
      "internalType": "uint8",
      "name": "averageRating",
      "type": "uint8"
    }
  ],
  "stateMutability": "view",
  "type": "function",
  "constant": true
}];

var contractAddress = '0x4de728bB2F88d3EBbff384b08A915a81DA1da5f3';  
var contract = new web3.eth.Contract(contractABI, contractAddress);

window.onload = function() {
  loadModels();
};

document.getElementById('listModelForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var name = document.getElementById('modelName').value;
  var description = document.getElementById('modelDescription').value;
  var price = document.getElementById('modelPrice').value;
  web3.eth.getAccounts().then(function(accounts) {
    return contract.methods.listModel(name, description, price).send({ from: accounts[0] });
  }).then(function(result) {
    console.log('Model listed:', result);
  }).catch(function(err) {
    console.error(err);
  });
});

function displayModel(model) {
  var modelsList = document.getElementById('modelsList');
  var modelDiv = document.createElement('div');
  modelDiv.className = 'model-card'; // Apply the card styling
  modelDiv.innerHTML = `
    <h3>${model.name} (ID: ${model.id})</h3>  <!-- Add the Model ID here -->
    <p>${model.description}</p>
    <p>Price: ${model.price} Wei</p>
    <button onclick="purchaseModel(${model.id}, ${model.price})">Purchase</button>
    <button onclick="viewModelDetails(${model.id})">View Details</button>
  `;
  modelsList.appendChild(modelDiv);
}

function loadModels() {
  contract.methods.modelCount().call().then(function(count) {
    count = parseInt(count);
    for (let i = 1; i <= count; i++) {
      contract.methods.getModelDetails(i).call()
        .then(function(model) {
          // Check if the model exists by verifying the creator's address
          if (model.creator !== '0x0000000000000000000000000000000000000000') {
            displayModel(model);
          }
        })
        .catch(function(err) {
          console.error("Error fetching model details for model ID " + i + ":", err);
        });
    }
  }).catch(function(err) {
    console.error("Error fetching model count:", err);
  });
}

function purchaseModel(modelId, price) {
  web3.eth.getAccounts().then(function(accounts) {
    return contract.methods.purchaseModel(modelId).send({ from: accounts[0], value: price });
  }).then(function(result) {
    console.log('Model purchased:', result);
  }).catch(function(err) {
    console.error(err);
    alert('Error purchasing the model.');
  });
}

document.getElementById('rateModelForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var modelId = document.getElementById('rateModelId').value;
  var rating = document.getElementById('modelRating').value;
  web3.eth.getAccounts().then(function(accounts) {
    return contract.methods.rateModel(modelId, rating).send({ from: accounts[0] });
  }).then(function(result) {
    console.log('Model rated:', result);
  }).catch(function(err) {
    console.error(err);
    alert('Error rating the model.');
  });
});

function viewModelDetails(modelId) {
  contract.methods.getModelDetails(modelId).call().then(function(model) {
    alert(`
      Name: ${model.name}
      Description: ${model.description}
      Price: ${model.price} Wei
      Creator: ${model.creator}
      Average Rating: ${model.averageRating}
    `);
  }).catch(function(err) {
    console.error("Error viewing model details:", err);
    alert('Error viewing model details.');
  });
}

function withdrawFunds() {
  web3.eth.getAccounts().then(function(accounts) {
    return contract.methods.withdrawFunds().send({ from: accounts[0] });
  }).then(function(result) {
    console.log('Funds withdrawn:', result);
    alert('Withdrawal successful!');
  }).catch(function(err) {
    console.error("Error withdrawing funds:", err);
    alert('Withdrawal failed. Check the console for details.');
  });
}

function resetModels() {
  web3.eth.getAccounts().then(function(accounts) {
    return contract.methods.resetModels().send({ from: accounts[0] });
  }).then(function(result) {
    console.log('All models have been reset');
    alert('All models have been reset.');
    // Clear the frontend display (reset the models list in the UI)
    document.getElementById('modelsList').innerHTML = '';
  }).catch(function(err) {
    console.error("Error resetting models:", err);
    alert('Error resetting models. Check the console for details.');
  });
}
