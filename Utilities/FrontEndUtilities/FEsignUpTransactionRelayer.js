const fetch = require('node-fetch');
import { map3SignUpEndpoint, dbSignUpEndPoint,dbGetUserEndPoint,dbCheckIfUserExistsEndPoint} from'/Utilities/utils';
import  Utils from'/Utilities/utils';
import {map3SignUpExecutor} from '/Utilities/apiUtils'
import { Web3Storage, File } from 'web3.storage'
 

// userImage: Array(1)
// 0: File {path: 'benefit-two.png', preview: 'blob:http://localhost:3000/f609e4cd-5d1d-4794-9a80-3c4688a5b3af', name: 'benefit-two.png', lastModified: 1655080987124, lastModifiedDate: Sun Jun 12 2022 19:43:07 GMT-0500 (Central Daylight Time), …}
// length: 1

const checkUserFromDb = async (id ) => {
  console.log('userId from signup relayer..', id)
  const JSONdata = JSON.stringify({id})
  // API endpoint where we send form data.
  const endpoint = dbCheckIfUserExistsEndPoint // "api/paymentHandler"
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
  let response
      try{
        response = await fetch(endpoint, options)
    }catch(e){
      console.log('ran into error while running test web3Storage Upload..', e)
    }
     // expected output
    // // {one} || {OXProfile}
    const jsonResponse = await response.json()
    console.log('response from db Checking to see if user already exists...............',jsonResponse)
   return  await jsonResponse.exists;
}






const getUserFromDb = async (id ) => {
  console.log('userId from signup relayer..', id)
  const JSONdata = JSON.stringify({id})
  // API endpoint where we send form data.
  const endpoint = dbGetUserEndPoint // "api/paymentHandler"
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
  let response
      try{
        response = await fetch(endpoint, options)
    }catch(e){
      console.log('ran into error while running test web3Storage Upload..', e)
    }
     // expected output
    // // {one} || {OXProfile}
    const jsonResponse = await response.json()
    console.log('response from db Checking to see if user already exists...............',jsonResponse)
   return  await jsonResponse.one;
}





const dbSignUp = async (UserInput ) => {
  console.log('userInput from signup relayer..', UserInput)
  const JSONdata = JSON.stringify(UserInput)
  // API endpoint where we send form data.
  const endpoint = dbSignUpEndPoint // "api/paymentHandler"
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
  let response
      try{
        response = await fetch(endpoint, options)
        console.log("response..... from dbSignUpRelayer: ", response)

    }catch(e){
      console.log('ran into error while running test web3Storage Upload..', e)

    }

    // expected output
    // {OXProfile,error: error?error:false}
    // const {OXProfile, error} = response;
    return response.json()
}

const dbUpdate = async (UserInput ) => {
  console.log('userInput from db signup relayer..', UserInput)
  const JSONdata = JSON.stringify(UserInput)
  // API endpoint where we send form data.
  const endpoint = dbSignUpEndPoint // "api/paymentHandler"
  // Form the request for sending data to the server.
  const options = {
    // The method is POST because we are sending data.
    method: 'PUT',
    // Tell the server we're sending JSON.
    headers: {
      'Content-Type': 'application/json',
    },
    // Body of the request is the JSON data we created above.
    body: JSONdata,
  }
  let response
      try{
        response = await fetch(endpoint, options)
        console.log("response..... from updateDBRelayer: ", response)
        console.log('// PUT REQUEST // PUT REQUESThefjbbfefeb;ffbfebedbedvdvdjlvdev')


    }catch(e){
      console.log('ran into error while running test web3Storage Upload..', e)
    }
    // expected output
    // {OXProfile,error: error?error:false}
    // const {OXProfile, error} = response;
    return response.json()
}




const signUpTransactionRelayer = async (wrappedProvider, UserInput, txValue ) => {

  const { vendorsStreetAddress, ...rest } = UserInput; // everything except the street address
  const map3SignUpUserInput = {...rest, keyWords:UserInput.keyWords.split(/[, ]+/)}
        console.log("map3SignUpUserInput: from map3PayTransactionRelayer", map3SignUpUserInput)

        const JSONdata = JSON.stringify(map3SignUpUserInput)
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
 

        if(response.status === 400){
            throw   new Error('invalid parameters!');
        }else{
            const result = await response.json()
            const txdata = result.txdata
     
        //  let gasPrice = undefined;
        //             try{
        //               // gasPrice = await wrappedProvider.getGasPrice()
        //               gasPrice = await wrappedProvider.getGasPrice() 
        //               alert(typeof gasPrice)
        //           }catch(e){
        //             console.log('error while getting gas price', e)
        //           }
        // return {txdata, gasPrice, txValue}
        return {txdata, txValue}
          
        }
}
function toNumberString(num) { 
  if (Number.isInteger(num)) { 
    return num + ".0"
  } else {
    return num.toString(); 
  }
}


const signUpTransactionSender = async (signer,txdata, txValue,UsertransactionInput ) => {

  const dbSignUpUserInput = {...UsertransactionInput, vendorsLat: toNumberString(UsertransactionInput.vendorsLat), vendorsLong:  toNumberString( UsertransactionInput.vendorsLong)}
  let dbUser = await dbUpdate(dbSignUpUserInput) 

  
  //Check if user already exists in the database
  if(
    await checkUserFromDb(UsertransactionInput.vendorsWalletAddress)&&
    await Utils.checkIfAddressIsVendor(UsertransactionInput.vendorsWalletAddress)
  ){
    console.log('dbUser......Already Exists both on chain and off chain', dbUser)
    return ({tx2:'user already exists', dbUser})
  }else{
    console.log('dbUser......Brand new User. Starting registration transaction')
    const tx2 = await map3SignUpExecutor(signer, txdata, txValue,UsertransactionInput)
    return ({tx2, dbUser}) 
  }
 
}























const getImageUrl = async (userImage) => {
  
        console.log('> 📦 creating web3.storage client')
        const imageLocalName =  encodeURIComponent(userImage[0].name.trim()) 
        const imageLocalPath =  encodeURIComponent(userImage[0].path.trim()) 
        console.log('imageLocalName...', imageLocalName)
        
        let token = Utils.web3StorageToken
        console.log('token...', token)
        const client = new Web3Storage({token})

        console.log('> 🤖 chunking and hashing the files (in your browser!) to calculate the Content ID')
        const cid = await client.put(userImage, {
          onRootCidReady: localCid =>{},
          onStoredChunk: bytes =>{}
        })
        console.log(`> ✅ web3.storage now hosting ${cid}`)
        // console.log(`https://dweb.link/ipfs/${cid}`)
        console.log(`https://dweb.link/ipfs/${cid}/${imageLocalName}`)
       
        let totalBytes = 0
        for await (const upload of client.list()) {
          totalBytes += upload.dagSize || 0
        } 
        console.log(`> ⁂ ${totalBytes.toLocaleString()} bytes stored!`)
        // return (`https://dweb.link/ipfs/${cid}`)
        return (`https://dweb.link/ipfs/${cid}/${imageLocalName}`)
}

function getKeyWordArray (UserInput){
        return UserInput.keyWords.split(/[, ]+/)
}

module.exports = {signUpTransactionRelayer,signUpTransactionSender, getImageUrl, getKeyWordArray, dbSignUp, getUserFromDb,dbUpdate, checkUserFromDb }//
