const {
    testAccount,
    etherToWei,
    weiToEther,
    createWeb3,
    createQueryString,
    waitForTxSuccess,
    createProvider,
    getTokenDecimal,
    numberExponentToLarge,
    WeiToWholeDecimals,
    WholeTOWeiDecimals,
    IERC20Abi,
    Map3address,
    vendorSignUpFee,
    getTokenSymbol,
    slippage,
    API_QUOTE_URL,
    provider,
    Map3Abi,
    getSendersAllowanceBalance,
    getUserErc20Balance,
    Map3WebsiteUrl,
    listenForMap3Events,
    functionBytesEncoder,
    readFunctionBytesEncoderAndImplementor,
    functionBytesEncoderAndImplementor,
    getFunctionSignatureHash,
    PaymentHandlerEndpoint,
    map3SameTokenTransferEndpoint,
    map3SwapAndTransferEndpoint,
    OxPayExecutor,
    OxPayTxData,
    map3PayExecutor,
    map3PayData,
    approveSendersTokenExecutor,
    approveSendersTokenData}= require('../../../Utilities/apiUtils');



export default function form(req, res) {
    const body  = req.body
     // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.amount || !body.contractAddress) {
        console.log("incomplete required parameters: ",body )
         // Sends a HTTP bad request error code
         return res.status(400).json({ data: 'please pass in all required parameters' })
       }

    console.log("running server function from map3approve... " )

   
  const  tempResponsePaymentData = approveSendersTokenData(body.contractAddress, body.amount)
//   const oxQuoteResult
const responsePaymentData = {
    txdata:tempResponsePaymentData
}

    console.log("completed server function from map3approve: ",responsePaymentData )

    res.status(200).json(responsePaymentData)
    // res.status(200).json(tempResponsePaymentData)
  }