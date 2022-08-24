  const apiUtils = require('../../../Utilities/apiUtils');




export default function form(req, res) {
    const body  = req.body
     // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.amount || !body.contractAddress) {
        console.log("incomplete required parameters: ",body )
         // Sends a HTTP bad request error code
         return res.status(100).json({ data: 'please pass in all required parameters' })
       }

    console.log("running server function from map3approve... " )

   
  const  tempResponsePaymentData = apiUtils.approveSendersTokenData(body.contractAddress, body.amount)
//   const oxQuoteResult
const responsePaymentData = {
    txdata:tempResponsePaymentData
}

    console.log("completed server function from map3approve: ",responsePaymentData )

    res.status(200).json(responsePaymentData)
    // res.status(200).json(tempResponsePaymentData)
  }