const {testAccount,
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
    bytesEncodedBytesImplementor,
    getFunctionSignatureHash,
    PaymentHandlerEndpoint,
    map3SameTokenTransferEndpoint,
    map3SwapAndTransferEndpoint,
    OxPayExecutor,
    OxPayTxData,
    map3PayExecutor,
    map3PayData,
    approveSendersTokenExecutor,
    approveSendersTokenData}= require('../../Utilities/apiUtils');
  


// export default function handler(req, res) {
//     res.status(200).json({ name: 'John Doe' })
//   }
export default async function form(req, res) {
    const body  = req.body
    const reqPaymentData = {}
    console.log("from payment handler reqPaymentData: ",reqPaymentData )

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.amount || !body.reciver || !body.sender) {
     console.log("incomplete required parameters: ",body )
      // Sends a HTTP bad request error code
      return res.status(400).json({ data: 'please pass in all required parameters' })
    }
  const  responsePaymentData = await OxQuote()

    console.log("from payment handler responsePaymentData: ",responsePaymentData )

    res.status(200).json(responsePaymentData)
  }