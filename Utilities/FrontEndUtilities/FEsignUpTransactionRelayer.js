const fetch = require('node-fetch');
import { map3SignUpEndpoint} from'/Utilities/utils';
import  Utils from'/Utilities/utils';
import {map3SignUpExecutor} from '/Utilities/apiUtils'
import { Web3Storage, File } from 'web3.storage'

const newSampleVendor = [
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




// userImage: Array(1)
// 0: File {path: 'benefit-two.png', preview: 'blob:http://localhost:3000/f609e4cd-5d1d-4794-9a80-3c4688a5b3af', name: 'benefit-two.png', lastModified: 1655080987124, lastModifiedDate: Sun Jun 12 2022 19:43:07 GMT-0500 (Central Daylight Time), …}
// length: 1





const signUpTransactionRelayer = async (UserInput, txValue ) => {

    
let testImageUrl;
try{
     testImageUrl = await getImageUrl(UserInput)
    console.log('running test web3Storage Upload..', testImageUrl)
}catch(e){
    console.log('ran into error while running test web3Storage Upload..', e)

}



const manp3SignUpUserInput = {
    vendorsWalletAddress: UserInput.userWallet,
    vendorsName: UserInput.userName,
    vendorsEmail: UserInput.email,
    vendorsBio: UserInput.aboutVendor,
    keyWords: Utils.getKeyWordArray(UserInput),// testing split function
    // keyWords: UserInput.vendorKeywords.split(/[, ]+/),
    // vendorsLat: get(lat), // UserInput.geoAddress
    // vendorsLong: get(long), // UserInput.geoAddress
    vendorsLat: "41.881832",
    vendorsLong: "-87.623177",
    // vendorsImageUrl: get(imageUrl), // UserInput.imageUrl || UserInput.userImage[0]
    vendorsImageUrl: testImageUrl ? testImageUrl :"https://pbs.twimg.com/profile_images/1461343110215225349/oxAN3Dve_400x400.jpg",
    vendorsWebsiteUrl: UserInput.websiteUrl,
    vendorsToken: UserInput.userCurrency


}

        console.log("manp3SignUpUserInput: from map3PayTransactionRelayer", manp3SignUpUserInput)

        const JSONdata = JSON.stringify(manp3SignUpUserInput)
        // API endpoint where we send form data.
        const endpoint = map3SignUpEndpoint // "api/paymentHandler"
        // Form the request for sending data to the server.
        const options = {
          // The method is POST because we are sending data.
          method: 'POST',
          // Tell the server we're sending JSON.
          headers: {
            'Content-Type': 'application/json',
          },
          // Body of the request is the JSON data we created above.
          body: JSONdata,
        }
        const response = await fetch(endpoint, options)
        console.log("response..... from signUpTransactionRelayer: ", response)


        if(response.staus === 400){
            throw   new Error('invalid parameters!');
        }else{
            const result = await response.json()
            const txdata = result.txdata
            console.log("txdata..... from signUpTransactionRelayer: ", txdata)
            const tx2 = await  map3SignUpExecutor(txdata, txValue) // New Implementation of backend transact    ions
            // const tx2 = await  map3SignUpExecutor(txdata, 0) // New Implementation of backend transact    ions
            return (tx2)
        }
}


const getImageUrl = async (UserInput) => {
 
    if (UserInput.imageUrl){
        return(UserInput.imageUrl)
    }else if (UserInput.userImage){
        console.log('> 📦 creating web3.storage client')
    let token = Utils.web3StorageToken
    console.log('token...', token)
    const client = new Web3Storage({token})

    console.log('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
    const cid = await client.put(UserInput.userImage, {
      onRootCidReady: localCid =>{},
      onStoredChunk: bytes =>{}
    })
    console.log(`> ✅ web3.storage now hosting ${cid}`)
    console.log(`https://dweb.link/ipfs/${cid}`)

    let totalBytes = 0
    for await (const upload of client.list()) {
      totalBytes += upload.dagSize || 0
    }
    console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
    return (`https://dweb.link/ipfs/${cid}`)
    }else{
        return("https://pbs.twimg.com/profile_images/1461343110215225349/oxAN3Dve_400x400.jpg")
    }


}

module.exports = {signUpTransactionRelayer,getImageUrl }//
