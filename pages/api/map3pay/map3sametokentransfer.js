  const apiUtils = require('../../../Utilities/apiUtils');

// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }

export default async function form(req, res) {
    const body  = req.body
    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.amount || !body.addressTo || !body.tokenIn) {
        console.log("incomplete required parameters: ",body )
         // Sends a HTTP bad request error code
         return res.status(100).json({ data: 'please pass in all required parameters' })
       }
    console.log("running server function from map3SameTokePay... " )

  
    
  const  tempResponsePaymentData = await apiUtils.map3PayData(body.amount, body.addressTo, body.tokenIn, body._sendAsWeth)

  const responsePaymentData = {
    txdata:tempResponsePaymentData
}
  console.log("completed server function from map3SameTokePay responce:  ", responsePaymentData )


    res.status(200).json(responsePaymentData)
  }