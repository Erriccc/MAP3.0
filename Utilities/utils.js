'use strict'
 
//providers.JsonRpcProvider()
const HDWalletProvider = require('@truffle/hdwallet-provider');
const BigNumber = require('bignumber.js');
// const process = require('process');
const Web3 = require('web3');
const Map3AbiPlaceHolder = require( '../artifacts/contracts/Map3Pay.sol/Map3Pay.json')
// const Map3Abi = Map3AbiPlaceHolder.abi;
// const Map3Abi = require( './map3PayABI.json')
const Map3Abi = require( './Map3P2PContract.json')

// const Map3VendorsABi = require( './map3VendorPlansABI.json')
const Map3VendorsABi = require( './VendorAccountsManagerContract.json')
const uniVoteAbi = require( './univotetoken.json')
// const Map3WebsiteUrl = "https://www.map3.com"
const Map3WebsiteUrl = "https://map3.vercel.app/"
// const Map3WebsiteUrl = "http://10.0.0.232:3000"

const TypoEffectTexts = require('../constants/TypoEffectTexts')
const PolygonCoinList = require('../constants/coinListPolygon')
const ReciversCoinList = PolygonCoinList.reciversCoinList;
const SendersCoinList = PolygonCoinList.sendersCoinList;

const vendorsData= require("constants/testdata.json") ;
const  { DefaultCoinIcon } = require( '/components/icons/defaultCoinIcon');

const MAPBOXACCESSTOKEN = process.env.NEXT_PUBLIC_MAP_BOX_ACCESS_TOKEN
const MAPSTYLE = process.env.NEXT_PUBLIC_MAP_STYLE
const web3StorageToken = process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN;


const API_PRICE_URL = 'https://polygon.api.0x.org/swap/v1/price';
// const API_PRICE_URL = 'https://api.0x.org/swap/v1/price';
const Ox_POLYGON_API_PRICE_URL = 'https://polygon.api.0x.org/swap/v1/price';
// const API_QUOTE_URL = 'https://api.0x.org/swap/v1/quote';
const API_QUOTE_URL = 'https://polygon.api.0x.org/swap/v1/quote';


const PaymentHandlerEndpoint = '/api/oxQuoteHandler'
const map3SameTokenTransferEndpoint = '/api/map3pay/map3sametokentransfer' 
const map3SwapAndTransferEndpoint = '/api/map3pay/map3swapandtransfer' 
const map3OxMap3SwapERC20ToEthEndpoint = '/api/map3pay/oxmap3SwapERC20ToEth' 
const mapDataFetcherEndpoint = '/api/map3Profiles/mapDataFetcher' 
const findProfilesDataFetcherEndpoint = '/api/map3Profiles/findProfilesDataFetcher' 
const payProfileDataFetcherEndpoint = '/api/map3Profiles/payProfileDataFetcher' 

const map3SignUpEndpoint = '/api/map3signup/signUp' 
const map3ApproveEndpoint = '/api/map3pay/map3approve' 

const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"

const dummyHexData = "0xd4984f8a000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000bb2cb98982ed6547aa7e39707807253a999796b700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"

// const  Map3Polygon4="0xb403aBD7aD3e45F052eb801059b08048798fb508";
const  Map3Polygon5="0xD38B508e98B092FA7baBefc30652F1AfFA8c857C";
const  Map3PolygonTEST6="0x4e5Ae028918EB31FD5Ba99DcBCf608763272B4e3"
// const  Map3PolygonTEST7="0xcB6De4466d85be717E84a1B36c10132E6cA550c8" // with plans and sending eth transactions
const  Map3PolygonTEST7="0xa1784087D227e9891FEd0ED04f2f2Ad5361573Ad" // with plans and sending eth transactions
const  Map3PolygonTEST8="0x0158345e52522C57ce34773c89D0214c2d10edd1" // with plans and sending eth transactions, fixed bug

const Map3P2PContractTest1 ="0x11F15ad3D1f8Ab61b86FC2Bd2247Cf2EB96F3ddF"
const Map3P2PContractTest2 ="0x5416c30970a66B041Df941e2A28711E1c7f8e0Ce"
const Map3P2PContractTest3 ="0x8b637c32B61b838a574a6a1834361758E5610eC8"



const  Map3VendorPlansPolgonTest1="0xfdD4e6BFC94a402bC40161067fC29860518159Ca" // with plans and sending eth transactions
const  Map3VendorPlansPolgonTest2="0x3095d04AdC87dF6C50A9de0A5106602DB6fc902e" // with plans and sending eth transactions
const  VendorAccountsManagerContractTest1 = "0xfdF123c9E8BD78a50bdD41aaEe069d89e8B4BE57"
const  VendorAccountsManagerContractTest2 = "0x2C6792dB0b81678a784F34C916546A5b292fbeA1"



const  Map3address=Map3P2PContractTest3;
const  Map3VendorAddress=VendorAccountsManagerContractTest2;

const EthAddress = "0x0000000000000000000000000000000000000000";
const _wethAddresses = {
    mainnet: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    polygon: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270",
    
}
const WethAddress = _wethAddresses. polygon;

const testAccount ="0x6fe4668722E3195Fa897217A4Bdd6ee1d289543f";
const vendorSignUpFee = 0;
const slippage = 1.15;
const U256MAXVALUE = ethers.constants.MaxUint256
// const U256MAXVALUE =(2**256) - 10


const IERC20Abi = [
    // Read-Only Functions
    "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
    "function approve(address spender, uint256 amount) external returns (bool)",
    "function allowance(address owner, address spender) external view returns (uint256)",
    // Authenticated Functions
    "function transfer(address to, uint amount) returns (bool)",
    // Events
    "event Transfer(address indexed from, address indexed to, uint amount)"
  ]
// const provider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_JSON_RPC_URL_POLYGON)
// const provider = new ethers.providers.Web3Provider(window.ethereum)
const provider = new ethers.providers.JsonRpcProvider("https://polygon-rpc.com")

const getCurrentWalletAddress = async () => {
    const _provider = new ethers.providers.Web3Provider(window.ethereum)

    const signer = _provider.getSigner();
    let web3Address;
    if (signer) {
        console.log("signer:", signer)
         web3Address = await signer.getAddress();
        console.log("web3Address: ", web3Address)
        return web3Address
        // setAddress(web3Address);
        // getBalance(provider, web3Address);
    }
return web3Address
}
const getSigner = async (connection) => {
    const _provider = new ethers.providers.Web3Provider(connection)
    const signer = _provider.getSigner();
        console.log("signer:", signer)
return signer
}



// const { MNEMONIC, RPC_URL } = process.env;

function createQueryString(params) {
    return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&');
}

// Wait for a web3 tx `send()` call to be mined and return the receipt.
function waitForTxSuccess(tx) {
    return new Promise((accept, reject) => {
        try {
            tx.on('error', err => reject(err));
            tx.on('receipt', receipt => accept(receipt));
        } catch (err) {
            reject(err);
        }
    });
}

// function createProvider() {
//     const provider = /^ws?:\/\//.test(RPC_URL)
//         ? new Web3.providers.WebsocketProvider(RPC_URL)
//         : new Web3.providers.HttpProvider(RPC_URL);
//     if (!MNEMONIC) {
//         return provider;
//     }
//     return new HDWalletProvider({ mnemonic: MNEMONIC, providerOrUrl: provider });
// }

// function createWeb3() {
//     return new Web3(createProvider());
// }

function etherToWei(etherAmount) {
    return new BigNumber(etherAmount)
        .times('1e18')
        .integerValue()
        .toString(10);
}

function weiToEther(weiAmount) {
    return new BigNumber(weiAmount)
        .div('1e18')
        .toString(10);
}

function numberExponentToLarge(numIn) {
    numIn +="";                                            // To cater to numric entries
    let sign="";                                           // To remember the number sign
    numIn.charAt(0)=="-" && (numIn =numIn.substring(1),sign ="-"); // remove - sign & remember it
    let str = numIn.split(/[eE]/g);                        // Split numberic string at e or E
    if (str.length<2) return sign+numIn;                   // Not an Exponent Number? Exit with orginal Num back
    let power = str[1];                                    // Get Exponent (Power) (could be + or -)
    let deciSp = 1.1.toLocaleString().substring(1,2);  // Get Deciaml Separator
    str = str[0].split(deciSp);                        // Split the Base Number into LH and RH at the decimal point
    let baseRH = str[1] || "",                         // RH Base part. Make sure we have a RH fraction else ""
        baseLH = str[0];                               // LH base part.
     if (power>=0) {   // ------- Positive Exponents (Process the RH Base Part)
        if (power> baseRH.length) baseRH +="0".repeat(power-baseRH.length); // Pad with "0" at RH
        baseRH = baseRH.slice(0,power) + deciSp + baseRH.slice(power);      // Insert decSep at the correct place into RH base
         if (baseRH.charAt(baseRH.length-1) ==deciSp) baseRH =baseRH.slice(0,-1); // If decSep at RH end? => remove it
     } else {         // ------- Negative exponents (Process the LH Base Part)
        let num= Math.abs(power) - baseLH.length;                               // Delta necessary 0's
        if (num>0) baseLH = "0".repeat(num) + baseLH;                       // Pad with "0" at LH
        baseLH = baseLH.slice(0, power) + deciSp + baseLH.slice(power);     // Insert "." at the correct place into LH base
        if (baseLH.charAt(0) == deciSp) baseLH="0" + baseLH;                // If decSep at LH most? => add "0"
  
     }
     // Rremove leading and trailing 0's and Return the long number (with sign)
     return sign + (baseLH + baseRH).replace(/^0*(\d+|\d+\.\d+?)\.?0*$/,"$1");
   }

   const  getTokenDecimal = async (_tokenAddress) =>{
    const myContract = new ethers.Contract(_tokenAddress,IERC20Abi,provider)
    const tokenDecimals = await myContract.decimals()
    console.log("tokenDecimals from function getTokenDecimal in utils :", tokenDecimals)
    return tokenDecimals;
  }
  const  getTokenSymbol = async (_tokenAddress) =>{
    if (_tokenAddress == EthAddress){
    return "ETH/MTC";
    }else{
    const myContract = new ethers.Contract(_tokenAddress,IERC20Abi,provider)
    const tokenSymbol = await myContract.symbol()
    console.log("tokenDecimals from function getTokenSymbol in utils:", tokenSymbol)
    return tokenSymbol;
    }
  }
  const WholeTOWeiDecimals = async (_tokenAddress, _num) => {
    let tempNum =_num
    if(typeof _num !== "string" ){
      tempNum =_num.toString()
    }
    const tokenDecimals= await getTokenDecimal(_tokenAddress)
    const convertedToTokenDecimals = ethers.utils.parseUnits(tempNum,tokenDecimals).toString();
    console.log("passed the WholeTOWeiDecimals conversion test. type of input changed from:", typeof _num, "to: ", typeof convertedToTokenDecimals )
    return convertedToTokenDecimals;
  }

  const getSendersAllowanceBalance = async (ownersTokenAddress,owner) => {
    const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
    const tx1 = await allowanceContract.allowance(owner,Map3address)
    return tx1 // returns big number
}
const getSendersAllowanceBalanceInWei = async (ownersTokenAddress,owner) => {
    const allowanceContract = new ethers.Contract(ownersTokenAddress,IERC20Abi,provider)
    const tx0 = await allowanceContract.allowance(owner,Map3address)
    const tx1 = Number(tx0._hex)
    return tx1 // returns long number
}
const getUserErc20Balance = async (tokenAddress,owner) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
    const tx0 = await tokenContract.balanceOf(owner)
    const tx1 = ethers.utils.formatUnits(
        tx0, await getTokenDecimal(tokenAddress))
    return tx1
}
const getUserErc20BalanceInWei = async (tokenAddress,owner) => {
    // const provider = new ethers.providers.Web3Provider(window.ethereum)
    const tokenContract = new ethers.Contract(tokenAddress,IERC20Abi,provider)
    const tx0 = await tokenContract.balanceOf(owner)
    // Number(tx0)
    const tx1 = Number(tx0._hex)
    return tx1
}
const getUserNativeBalance = async (owner) => {
    let balance = await provider.getBalance(owner);
    const tx1 = ethers.utils.formatUnits( balance, 18);
    console.log("eth balance requested...", tx1)
    return tx1
}
const getUserNativeBalanceInWei = async (owner) => {
    let balance = await provider.getBalance(owner);
    // Number(balance)
    const tx1 = Number(balance._hex)
    console.log("getUserNativeBalanceInWei requested...", tx1)
    return tx1
  }

  const ValidateIfStringIsAddress = async (address) => {
    let addressBalance;
    try{
        addressBalance = await provider.getBalance(address);
        console.log("was able to fetch a balance for the address", await addressBalance)
        return true;
    }catch(e){
        return false;
    }
 return true; 
}






  const ValidateIfAddressIsErc20 = async (address) => {
    let addressBalance;
    let addressSymbol;
    let addressBalanceValidated = false;
    let addressSymbolValidated = false;
    try{
        addressBalance = await provider.getBalance(address);
        console.log("was able to fetch a balance for the address")
        addressBalanceValidated = true;
    }catch(e){
        return [false, null]
    }
    try{
        addressSymbol = await getTokenSymbol(address);
        addressSymbolValidated = true;
    }catch(e){
        return [false, null]
    }
    if(addressBalanceValidated && addressSymbolValidated){
        return [true, addressSymbol]
    }else{
        return [false, null]
    }
}
const GetCUrrencyDetails = async (address) => {


    let coinListData;

    (async function() {

        coinListData = SendersCoinList.find(function (item) {
            const walletAddress = item.address;
            return(
                walletAddress.match(address) ||
                (walletAddress.toLowerCase().match(address) && walletAddress) 
              )
        }
        );
      })();

    if(coinListData == null){
        // let newfoundCurrencyInfo; 
            //   (async function() {
                console.log("searching blockchain")
                let newfoundCurrencyInfo = await ValidateIfAddressIsErc20(address)
                console.log("done searching blockchain", newfoundCurrencyInfo)
        
                  if(newfoundCurrencyInfo[0] ==true ){
                    console.log(newfoundCurrencyInfo, "newfoundCurrencyInfo")
                    coinListData=  {
                      icon:(<DefaultCoinIcon symbol={newfoundCurrencyInfo[1]} />),
                      address: address,
                      code: newfoundCurrencyInfo[1],
                      name: newfoundCurrencyInfo[1],
                    }
                      console.log("newfoundCurrencyInfo...", coinListData)
                        console.log("pushing result to newCustomCustomCurrencyInfo...")
                      return(coinListData)

                  }
                  else{
                    console.log('not a valid erc20 token')
                  }
                // })();

    }else{
      console.log("result of coinlist data", coinListData)
      return(coinListData)
    }
}

  const WeiToWholeDecimals = async (_tokenAddress, _num) => {

    /////////Note if Error or bug
    // 1: remove the next 4 lines after comment
    // 2: change tempNum back to _num in line 6 from this comment
    //   let tempNum =_num
    // if(typeof isNaN(_num) ){
    //   tempNum = Number(_num)
    // }
    const tokenDecimals= await getTokenDecimal(_tokenAddress)
    const convertedToTokenDecimals = ethers.utils.formatUnits(_num,tokenDecimals);
    return convertedToTokenDecimals;
  }

  const approveSendersToken = async (spenderTokenAddress,spenderAddress,approveAmount) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const aprovalSigner = provider.getSigner()
    const aprovalContract = new ethers.Contract(spenderTokenAddress,IERC20Abi,aprovalSigner)
    const tx1 = await aprovalContract.approve(spenderAddress,approveAmount)
    await tx1.wait()
    return tx1
}



const listenForMap3Events = async () => {

     const Map3 = new ethers.Contract(Map3address,Map3Abi,provider)

    // Receive an event when ANY transfer occurs
    console.log("listening for map3 events.......")
    Map3.on("Paid", (sender, to, amount, event) => {
    console.log("map3 emitted .......")

        console.log(`Paid event emited: ${ sender } sent ${ ethers.utils.formatEther(amount) } to ${ to}`);
        console.log("event object: ", event)
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
    });
    
    Map3.on("FilledSwapOrder", (sellToken, buyToken, boughtAmount, event) => {
        console.log(` FilledSwapOrder event emited: map3 converted  ${ ethers.utils.formatEther(boughtAmount) } of sell token: ${ sellToken }  to buy token: ${ buyToken}`);
        // The event object contains the verbatim log data, the
        // EventFragment and functions to fetch the block,
        // transaction and receipt and event functions
    });
    
    }






const map3Pay = async (_tokenamount,  _to,  _tokenIn,User) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
     const PaySigner = provider.getSigner()
    //  const Map3 = new ethers.Contract(Map3address,Map3Abi.abi,PaySigner) // local dev

    //  const Map3 = new ethers.Contract(Map3address,Map3Abi,PaySigner)
     const tokenContract = new ethers.Contract(_tokenIn,IERC20Abi, provider)
    
    console.log("trying out new function1......")
    // const returnOfFunctionBytesEncoder = await functionBytesEncoder(Map3Abi,"SameTokenPay", [_tokenamount,_to,_tokenIn])
    const returnOfFunctionBytesEncoder = functionBytesEncoder(Map3Abi,"SameTokenPay", [_tokenamount,_to,_tokenIn,false]) // added false for new implimentation
    console.log("returnOfFunctionBytesEncoder: ", returnOfFunctionBytesEncoder)
    console.log("typeOf returnOfFunctionBytesEncoder: ", typeof returnOfFunctionBytesEncoder)
    console.log("completed new function1......")
    
     const abiCoder = ethers.utils.defaultAbiCoder
     console.log("abiCoder.encode SOLO: ",abiCoder.encode([ "bytes" ], [ returnOfFunctionBytesEncoder ]))


     console.log("abiCoder.encode JOINED: ",
     ethers.utils.hexConcat([
        returnOfFunctionBytesEncoder, 
        ethers.utils.defaultAbiCoder.encode(['string', 'string'], ['0xAddr1', '0xAddr2'])
      ])
     )

     console.log("abiCoder.encode MULTI-JOINED: ",
     ethers.utils.hexConcat([
        ethers.utils.defaultAbiCoder.encode(['string'], ['returnOfFunctionBytesEncoder']), 
        ethers.utils.defaultAbiCoder.encode(['string', 'string'], ['0xAddr1', '0xAddr2']),
        returnOfFunctionBytesEncoder
      ])
     )

    console.log("trying out new function2......")
    const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(PaySigner,Map3address, returnOfFunctionBytesEncoder)
    // const returnOfFunctionBytesEncoderAndImplementorReciept = await returnOfFunctionBytesEncoderAndImplementor.wait()
    await returnOfFunctionBytesEncoderAndImplementor.wait()
    console.log("returnOfFunctionBytesEncoderAndImplementor: ", returnOfFunctionBytesEncoderAndImplementor)
    console.log("completed new function2......")


     const sendersBal = await tokenContract.balanceOf(User)
     const reciversBal = await tokenContract.balanceOf(_to)
     console.log("senders Final Balance, is: ",ethers.utils.formatEther(sendersBal))
     console.log("Recivers Final Balance, is: ",ethers.utils.formatEther(reciversBal))
     console.log("payment successful!")
    //  return tx1
     return returnOfFunctionBytesEncoderAndImplementor
 }

 const OxPay = async (
    sellTokenAddress,
      buyTokenAddress,
      allowanceTargetquote,
      OxDelegateAddress,
      allowanceBalance,
      buyAmount,
      reciversAddress,
      User,
      data


    ) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const oxPaySigner = provider.getSigner()
        const Map3 = new ethers.Contract(Map3address,Map3Abi,oxPaySigner)
        // const Map3 = new ethers.Contract(Map3address,Map3Abi.abi,oxPaySigner)
        const sellContract = new ethers.Contract(sellTokenAddress,IERC20Abi,provider)
        const buyContract = new ethers.Contract(buyTokenAddress,IERC20Abi, provider)

        console.log("concatinating Map3SwapData from oxPay ....")
        const fillSwapData =  [
          sellTokenAddress, // sellToken
              buyTokenAddress, // buyToken
              allowanceTargetquote,// spender
              OxDelegateAddress,// swapTarget
              allowanceBalance,// _tokenamount
              buyAmount, // _sendAmount
              reciversAddress,// _toAddress
              data // swapCallData
        ]
        const Map3SwapData =    functionBytesEncoder(Map3Abi,"fillQuote",fillSwapData)
        
      console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        console.log("Map3SwapData from oxPay : ", Map3SwapData)

        console.log("trying out new function2......")
        const returnOfFunctionBytesEncoderAndImplementor = await bytesEncodedBytesImplementor(oxPaySigner,Map3address, Map3SwapData)
        const receipt= await returnOfFunctionBytesEncoderAndImplementor.wait()
        console.log("completed new function2......")

      const map3BuyBal = await buyContract.balanceOf(Map3address)
      const map3FinalSellBal = await sellContract.balanceOf(Map3address)
      const feeCollectorBuyBal = await buyContract.balanceOf(testAccount)
      const feeCollectorFinalSellBal = await sellContract.balanceOf(testAccount)
      const signerBuyBal = await buyContract.balanceOf(User)
      const signerFinalSellBal = await sellContract.balanceOf(User)
      const reciverBuyBal = await buyContract.balanceOf(reciversAddress)
      const reciverFinalSellBal = await sellContract.balanceOf(reciversAddress)
      const contactAllowanceBalance = await sellContract.allowance(Map3address,allowanceTargetquote)

      console.log('left over Map3.0 allowance for target spennder:',ethers.utils.formatEther(contactAllowanceBalance))
      console.log("signer Final Sell and Buy Balance, are: ",ethers.utils.formatEther(signerFinalSellBal),ethers.utils.formatEther(signerBuyBal))
      console.log("Map3 Final Sell and Buy Balance, are: ",ethers.utils.formatEther(map3FinalSellBal),ethers.utils.formatEther(map3BuyBal))
      console.log("fee collector Final Sell and Weth Buy, are: ",ethers.utils.formatEther(feeCollectorFinalSellBal),ethers.utils.formatEther(feeCollectorBuyBal))
      console.log("Recivers Final Sell and Buy Balance, are: ",ethers.utils.formatEther(reciverFinalSellBal),ethers.utils.formatEther(reciverBuyBal))
return(receipt)

    }

// USABLE ENCODER!
// test1 READ parameters Map3address, Map3Abi, "checkIsVendor" [Map3address]
// test2 WRITE parameters: Map3Abi,"SameTokenPay", [_tokenamount,_to,_tokenIn]

const bytesEncodedBytesImplementor = async (signer, contractAddress, encodedData) => {
            let returnData = await signer.sendTransaction({
                to: contractAddress,
                data: encodedData
              })
              await returnData.wait()
        console.log("bytesEncodedBytesImplementor returnData: ", returnData)

        return returnData

}
const readFunctionBytesEncoderAndImplementor = async (signer, contractAddress, encodedData) => {
    let returnData = await signer.call({
        to: contractAddress,
        data: encodedData
      })
console.log("readFunctionBytesEncoderAndImplementor returnData: ", returnData)

return returnData

}
const functionBytesEncoder =  (contractAbi, functionName, functionParameters) => {
    let iface = new ethers.utils.Interface(contractAbi);
    let encodedData = iface.encodeFunctionData(functionName, functionParameters)
    console.log("functionBytesEncoder encodedData: ", encodedData)
    return encodedData

}
const getFunctionSignatureHash =  (contractAbi, functionName) => {
    let iface = new ethers.utils.Interface(contractAbi);
    let encodedData = iface.getSighash(functionName);
    return encodedData;

}
//SAMPLE CODE!


// simple function encoder and data encoder
// const Map3SwapData =  ethers.utils.hexConcat([
        //   getFunctionSignatureHash(Map3Abi,"fillQuote"),
        //   ethers.utils.defaultAbiCoder.encode(['address'], [sellTokenAddress]),....etc 
        // ])
        // console.log("typeOf Map3SwapData: ", typeof Map3SwapData)
        // console.log("Map3SwapData from oxPay : ", Map3SwapData)



//  const __POSTS = [ 
// 	{ id: 1, title: 'Apple', description: 'Description of post 1' }, 
// 	{ id: 2, title: 'Orange', description: 'Description of post 2' }, 
// 	{ id: 3, title: 'Guava', description: 'Description of post 3' }, 
// 	{ id: 4, title: 'Banana', description: 'Description of post 4' }
// ];

// const __FOUND = __POSTS.find(function(post, index) {
// 	if(post.title == 'Guava')
// 		return true;
// });

// // On success __FOUND will contain the complete element (an object)
// // On failure it will contain undefined  
// console.log(__FOUND);

//  abiCoder = ethers.utils.defaultAbiCoder
// abiCoder.encode([ "bytes" ], [ "0x095ea7b3000000000000000000000000d38b508e98b092fa7babefc30652f1affa8c857c0000000000000000000000000000000000000000000000000de0b6b3a7640000" ]);



// const returnData = await provider.call({
//     to: '0xAddress',
//     data: ethers.utils.hexConcat([
//       '0x9f4f2a33', 
//       ethers.utils.defaultAbiCoder.encode(['address', 'address'], ['0xAddr1', '0xAddr2'])
//     ])
//   })


// let ABI = [
//     "function transfer(address to, uint amount)"
// ];
//  let iface = new ethers.utils.Interface(ABI);
//  iface.encodeFunctionData("transfer", [ "0x1234567890123456789012345678901234567890", parseEther("1.0") ])

// iface.getSighash("balanceOf");

module.exports = {
    testAccount,
    etherToWei,
    weiToEther,
    // createWeb3,
    createQueryString,
    waitForTxSuccess,
    // createProvider,
    getTokenDecimal,
    numberExponentToLarge,
    WeiToWholeDecimals,
    WholeTOWeiDecimals,
    IERC20Abi,
    Map3address,
    Map3VendorAddress,
    approveSendersToken,
    map3Pay,
    vendorSignUpFee,
    getTokenSymbol,
    slippage,
    API_QUOTE_URL,
    Ox_POLYGON_API_PRICE_URL,
    API_PRICE_URL,
    provider,
    Map3Abi,
    Map3VendorsABi,
    getSendersAllowanceBalance,
    getSendersAllowanceBalanceInWei,
    getUserErc20Balance,
    getUserNativeBalance,
    Map3WebsiteUrl,
    listenForMap3Events,
    functionBytesEncoder,
    readFunctionBytesEncoderAndImplementor,
    bytesEncodedBytesImplementor,
    getFunctionSignatureHash,
    PaymentHandlerEndpoint,
    map3OxMap3SwapERC20ToEthEndpoint,
    map3SameTokenTransferEndpoint,
    map3SwapAndTransferEndpoint,
    map3ApproveEndpoint,
    mapDataFetcherEndpoint,
    findProfilesDataFetcherEndpoint,
    payProfileDataFetcherEndpoint,
    map3SignUpEndpoint,
    EthAddress,
    WethAddress,
    getCurrentWalletAddress,
    getSigner,
    ReciversCoinList,
    SendersCoinList,
    PolygonCoinList,
    getUserErc20BalanceInWei,
    getUserNativeBalanceInWei,
    TypoEffectTexts,
    ValidateIfAddressIsErc20,
    ValidateIfStringIsAddress,
    GetCUrrencyDetails,
    U256MAXVALUE,
    ethers,
    dummyHexData,
    vendorsData,
    MAPSTYLE,
    MAPBOXACCESSTOKEN,
    web3StorageToken,
    // getKeyWordArray,

};

//enableSlippageProtection
//tx hash 0xb8f6de1f679c80396acbe38527fa52a0c5f1fe98f022d093ae77f3ee052a14f9 