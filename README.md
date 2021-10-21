# Getting Started with Lennymon NFT minting Dapp

Create a reat app with the following command:
```npx create-react app lennymon```

### Make sure you have node.js and yarn installed!

```npm install --global yarn```

Run the following lines to make sure yarn is equiped with the required libraries for yarn:
```yarn add redux```
```yarn add redux-thunk```
```yarn add react-redux```
```yarn add web3```
```yarn add styled-components```
```yarn add @openzeppelin/contracts```

### Create a local blockchain environment

```npm install -g ganache-cli```

Execute ganache in powershell:
```ganache-cli -d --allowUnlimitedContractSize```

# Getting MetaMask setup

![](https://github.com/AimenHallou/LennymonNFT/blob/master/metamask_network.png)

### Import accounts to MetaMask with private keys

### Migrate both contracts into the local blockchain

```truffle migrate --reset```

# Start yarn/react webpage 

```yarn start```




# Common bugs

Error with minting and gas fees charges:
