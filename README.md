This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About Map3.0

Map 3.0 is simply provides cryptocurrency users and vendors a platform to find each other  trade transact between tokens with fewer intermediaries and cheap transaction fees

## how does Map3 intend to solve this problem

##
Map3 makes it easy for cryptocurrency users to spend find local vendors and spend their favorite tokens
## 

Vendors can choose stable or blue chip tokens to reduce their exposure to market volitility

##

Unlike current solutions, Map3 actually retains the financial value within the cryptocurency economy, sereves as a market maker and taker, and increases volume and stability of the market.

## 
creating a Map3 profile creates a cutom shareable payment link that is attached to your wallet and token of choice

## 
Map3 is designed to reward early cryptofriendly vendors by giving them the presence and exposure to  crypto users as an aditional source of revenue

## 
Mpa3Pay is working on integrating a feeless liquidity source 0x protocol's RFQ orders, which will help eliminate all transaction fees bar network gas fees for blue chip stable coins

## Uni Voting Token

Uni VOTING TOken is a simple review implimentation token that is minted to Map3 users after every transaction.
Users can choose to leave a good or bad review about thier expirience at the store they visit.
review ranks will be used to reward the best vendors per /week/month when reward programs are open
review ranks will be reset every week/moth with the hep of chainlink keepers
## Getting Started

First, run the development server:

```bash
npm install 
# or
yarn add
```

next, start the hardhat local node, note  the tests require a fork of the mainnet so you need your json rpc provider in hardhat config


```bash
npx hardhat node
```
next deploy scripts and run custom script to impersonate and grap tokens from the mainnet, make sure to switch TargetAccount in scripts/contracts-deploy-script.js to the account where you want the funds sent to
```bash
npx hardhat run --network localhost scripts/contracts-deploy-script.js
```

then start your front end
```bash
yarn next dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/_app.js`. make sure to create your .env file and inculde your evm node url.
## Things to take note of for this Build:

### 1 
Note tokens with fees and transaction taxes are likely to fail!!
Use ERC20 fully compliant tokens to increase transaction through·put

##### note to adjust decimals before fowarding to exchanges

### 2
Tokens with fee or tax atached on sale will likely fail to swap from 0x..


## project  details
current map3 address= "0xD38B508e98B092FA7baBefc30652F1AfFA8c857C"
##
Map3 ABI cann be found under Utilities directory
##
const IERC20Abi = 
[
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)",
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ] 

## Learn More

To learn more about Next.js, take a look at the following resources:
## Deploy on Vercel