const apiUtils = require('../../../Utilities/apiUtils');

export default async function form(req, res) {
  const body  = req.body

  

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (
    !body.sellTokenAddress ||
    //  !body.buyTokenAddress ||
      !body.allowanceTargetquote ||
       !body.OxDelegateAddress ||
        !body.allowanceBalance ||
         !body.buyAmount ||
          !body.reciversAddress ||
           !body.data) {
      console.log("incomplete required parameters: ERC20-ETH SWAP FAILED",body )
       // Sends a HTTP bad request error code
       return res.status(100).json({ data: 'please pass in all required parameters' })
     }
  console.log("running server function from OxErc20ToEthPayTxData... " )


  
const  tempResponsePaymentData = apiUtils.OxErc20ToEthPayTxData(
                                              body.sellTokenAddress,
                                              // body.buyTokenAddress,
                                              body.allowanceTargetquote,
                                              body.OxDelegateAddress,
                                              body.allowanceBalance,
                                              body.buyAmount,
                                              body.reciversAddress,
                                              body.data
                                              )

const responsePaymentData = {
  txdata:tempResponsePaymentData
}
console.log("completed server function from map3SameTokePay responce:  ", responsePaymentData )


    res.status(200).json(responsePaymentData)
  }
