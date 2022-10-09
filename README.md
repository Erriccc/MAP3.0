## About Map3.0

Map3.0 is a tool that helps users locate crypto friendly businesses near them, and encourages vendors to automatically accept crypto payments in their preferred currency.
#### the map
Map3 creates an ecosystem that connects crypto currency users within a local community. It promotes the use of cryptocurrency as a means of payment and encourages adoption by  real vendors.
#### map3 pay
Map3Pay uses outsourced liquidity to enable cross token transfer between users. Map3pay's instant swaps gives the user the freedom to choose what currency they want to hold, while also allowing the vendor choose what crypto currency they want to accept.
#### Unique features

Unlike current solutions, Map3 actually retains the financial value within the cryptocurency economy, serves as a market maker and taker, and increases volume and stability of the market.
## 
To unlock the full potential of map3, Users and vendor can create profiles which creates a personalized payment expirience. Each profile is an  Nft which contains all details about a user's payment prefrence and other info they might want to share including favourite wallet address, favourite crypto currency, website, geo address, contact info, bio, keywords, and image url.
## Getting Started

```

first run the development server:

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
Polygon Minnet

  Map3P2PContractTest4 ="0xfC2d1c0166e00DBfa712C1F33F7634213e720215"
  VendorAccountsManagerContractTest2 = "0x7ae71782c11d7Af24A437F802926E3B6859D2b7E"

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