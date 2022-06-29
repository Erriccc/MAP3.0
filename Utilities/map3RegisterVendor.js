const { testAccount,Map3Abi,Map3address,vendorSignUpFee,createQueryString,getTokenDecimal,WeiToWholeDecimals,IERC20Abi,WholeTOWeiDecimals} = require('./utils');
// const Map3Abi = require( '../artifacts/contracts/Map3.sol/Map3Pay.json')
const  ethers  = require("ethers");

const map3RegisterVendor = async (newVendorRegistrationData ) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const newVendorSigner = provider.getSigner()
        const Map3 = new ethers.Contract(Map3address,Map3Abi,newVendorSigner)
        const Map3ReadOnly = new ethers.Contract(Map3address,Map3Abi,provider)
        // const sellContract = new ethers.Contract(sellTokenAddress,IERC20Abi,provider)
        // const buyContract = new ethers.Contract(buyTokenAddress,IERC20Abi, provider)

 const Map3AddVendor = await Map3.addVendor(newVendorRegistrationData,
      {
          value:vendorSignUpFee
      })
      const receipt = await Map3AddVendor.wait()
      const newVendorsId = receipt.events[1].args.vendorsId
// return([map3BuyBal,map3FinalSellBal,feeCollectorBuyBal,feeCollectorFinalSellBal,signerBuyBal,signerFinalSellBal])
console.log("reciept from new vendor registration: ", receipt)
console.log("events from signUp: ", receipt.events)
console.log("vendorsId: ", newVendorsId)
console.log("formarted vendor id",newVendorsId.toString())

const checkIsVendor = await Map3ReadOnly.checkIsVendor(newVendorRegistrationData[0])

console.log("checkIsVendor: ", checkIsVendor)


return(receipt)

    }
    
module.exports = {map3RegisterVendor}
