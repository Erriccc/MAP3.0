
import {map3SignUpData} from '/Utilities/apiUtils'
const  { ethers }=require( "ethers"); // from hardhat throws error "Can't resolve 'console'"

const UTILS = require('/Utilities/utils');
const apiUtils = require('/Utilities/apiUtils');
 
export default async function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body) 
    const newSignUpTuple = [
      body.vendorsWalletAddress,
      body.vendorsToken,
      0
    ]
    if (
      !body.vendorsWalletAddress || body.vendorsWalletAddress.legnth < 1 || body.vendorsWalletAddress == '' 
      || !body.vendorsToken || body.vendorsToken.legnth < 1 || body.vendorsToken == '' 
      // ||
      // !body.returnOfFunctionBytesEncoder
      ) {
    return res.status(400).json({ data: 'incomplete required parameters' })
  }
  
  // let privateKey = "0x741d27fd9adea1c7f15460bb9791016cffb8194e6a06845233cd5121480df1c2";
  let privateKey = process.env.SIGNER_PK;
  // let wallet = new ethers.Wallet(privateKey, UTILS.provider);
  const signer = new ethers.Wallet(privateKey, UTILS.provider);
  const signUpContract = new ethers.Contract( UTILS.Map3VendorAddress , UTILS.Map3VendorsABi , signer )
  // console.log( UTILS.Map3VendorAddress , UTILS.Map3VendorsABi )

  let adjustedGasPrice = ethers.BigNumber.from(Math.floor((await UTILS.provider.getGasPrice()).toNumber()*2))
  console.log(adjustedGasPrice, 'gas Price in big number')

  const  _tx = await signUpContract.addVendor(newSignUpTuple ,
   { 
          gasPrice: adjustedGasPrice,
          value: body.txValue,
          // gasPrice: encodedData.gasPrice,
          // gasLimit: 500000,
          // gas: 2400000,
        }
    
    // overrides 
    ) 
    ////////////////////////////////////////////////////
    //REMEMBER TO CHANGE CITY STATE AND ZIP T LONGITUTE AND LATITUDE
    ////////////////////////////////////////////////

console.log(_tx,'_tx.wait()_tx.wait()_tx.wait()_tx.wait()_tx.wait()')


  const  tempResponsePaymentData = await _tx.wait()

    console.log("running server function from map3SignUp... " )
    console.log("completed server function from map3SignUp: responsePaymentData" )
    console.log("completed server function from map3SignUp: responsePaymentData",tempResponsePaymentData )

    res.status(200).json(tempResponsePaymentData)
    // res.status(200).json(responsePaymentData)

  }