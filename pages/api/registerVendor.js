

export default function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ', body)


    ////////////////////////////////////////////////////


    //REMEMBER TO CHANGE CITY STATE AND ZIP T LONGITUTE AND LATITUDE

    ////////////////////////////////////////////////
    const responsePaymentData = {
        vendorsToken:body.vendorsToken,
        vendorsName:body.vendorsName,
        vendorsWebsiteUrl:body.vendorsWebsiteUrl,
        vendorsImageUrl:body.vendorsImageUrl,
        vendorsPhone:body.vendorsPhone,
        vendorsWalletAddress:body.vendorsWalletAddress,
        vendorsStreetAddress:body.vendorsStreetAddress,
        vendorsCity:body.vendorsCity,
        vendorsState:body.vendorsState,
        vendorsZip:body.vendorsZip,
        vendorsBio:body.vendorsBio
      } = body

      // TUPLE MODEL FOR SIGNING UP VENDORS
    // Make sure there is no whitespace in address arguments
    const sampleVendor =[
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    "Testing tupple formart",
   "Living on cloud 9",
   "chicago",
   "IL",
   "60622",
   "123-456-7890",
   "Connect vendors in map3.0",
   "40.716862",
   "-73.999005",
   "https://ipfs.moralis.io:2053/ipfs/QmS3gdXVcjM72JSGH82ZEvu4D7nS6sYhbi5YyCw8u8z4pE/media/3",
   "https://github.com/Erriccc",
   "0xd9145CCE52D386f254917e481eB44e9943F39138"
]

    // Guard clause checks for first and last name,
    // and returns early if they are not found
    // if (!body.first || !body.last) {
    //   // Sends a HTTP bad request error code
    //   return res.status(400).json({ data: 'First or last name not found' })
    // }
  
    // Found the name.
    // Sends a HTTP success code
    // res.status(200).json({ data: `${body.first} ${body.last}` })
    res.status(200).json(responsePaymentData)
  }