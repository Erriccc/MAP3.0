
import {map3SignUpData} from '../../../Utilities/apiUtils'
const apiUtils = require('../../../Utilities/apiUtils');
 
export default async function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)
    if (
      !body.vendorsWalletAddress || body.vendorsWalletAddress.legnth < 1 || body.vendorsWalletAddress == '' ||
       !body.vendorsName || body.vendorsName.legnth < 1 ||  body.vendorsName == ''||
        !body.vendorsToken || body.vendorsToken.legnth <1 || body.vendorsToken == '') {
    return res.status(400).json({ data: 'incomplete required parameters' })
  }
    ////////////////////////////////////////////////////
    //REMEMBER TO CHANGE CITY STATE AND ZIP T LONGITUTE AND LATITUDE
    ////////////////////////////////////////////////

      // TUPLE MODEL FOR SIGNING UP VENDORS
    // Make sure there is no whitespace in address arguments
    const sampleVendorTuple = [
      "0x6fe4668722E3195Fa897217A4Bdd6ee1d289543f", // wallet address
    "OG Account", // name
     "Jozizuke@gmail.com", //email
    "any tips will be much appreciated", // bio
    ["dev", "map3 Pay","map3","Chicago", "osborn"], // keyWords
    "41.881832", //lat
    "-87.623177", //long
    "https://pbs.twimg.com/profile_images/1461343110215225349/oxAN3Dve_400x400.jpg",//imageUrl
    "https://github.com/Erriccc", //websiteUrl
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270" //token
    ]

    const signUpTuple = [
      body.vendorsWalletAddress,
      body.vendorsName,
      body.vendorsEmail ? body.vendorsEmail : 'user email not set',
      body.vendorsBio? body.vendorsBio : '',
      body.keyWords? body.keyWords : ['','','',''],
      body.vendorsLat ? body.vendorsLat.toString() : "" ,
      body.vendorsLong ? body.vendorsLong.toString() : "" ,
      body.vendorsImageUrl ? body.vendorsImageUrl : '',
      body.vendorsWebsiteUrl ? body.vendorsWebsiteUrl : '',
      body.vendorsToken,
    ]
  
  
    console.log("running server function from map3SignUp... " )
    console.log("tuple to be sent ... ", signUpTuple )

   
      const  tempResponsePaymentData = await apiUtils.map3SignUpData(signUpTuple)
        const responsePaymentData = {
            txdata:tempResponsePaymentData
        }

    console.log("completed server function from map3SignUp: ",responsePaymentData )

    res.status(200).json(responsePaymentData)

  }