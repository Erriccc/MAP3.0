const { testAccount,Map3address,Map3Abi,createQueryString,getTokenDecimal,WeiToWholeDecimals,IERC20Abi,WholeTOWeiDecimals} = require('./utils');
const  ethers  = require("ethers");

const OxPay = async (
    sellTokenAddress,
      buyTokenAddress,
      allowanceTargetquote,
      OxDelegateAddress,
      data,
      allowanceBalance,
      buyAmount,
      reciversAddress,
      User

    ) => {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const oxPaySigner = provider.getSigner()
        const Map3 = new ethers.Contract(Map3address,Map3Abi,oxPaySigner)
        // const Map3 = new ethers.Contract(Map3address,Map3Abi.abi,oxPaySigner)
        const sellContract = new ethers.Contract(sellTokenAddress,IERC20Abi,provider)
        const buyContract = new ethers.Contract(buyTokenAddress,IERC20Abi, provider)
 const Map3Swap = await Map3.fillQuote(
    sellTokenAddress, // sellToken
    buyTokenAddress, // buyToken
    allowanceTargetquote,// spender
    OxDelegateAddress,// swapTarget
    data, // swapCallData
    allowanceBalance,// _tokenamount
    buyAmount, // _sendAmount
    reciversAddress// _toAddress
    // {
    //     from:User
    // }
      )
      const receipt = await Map3Swap.wait()

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
// return([map3BuyBal,map3FinalSellBal,feeCollectorBuyBal,feeCollectorFinalSellBal,signerBuyBal,signerFinalSellBal])
return(receipt)

    }
    
module.exports = {OxPay}
