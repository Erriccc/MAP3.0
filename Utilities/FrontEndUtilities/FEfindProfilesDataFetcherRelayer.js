const fetch = require('node-fetch');
import { findProfilesDataFetcherEndpoint} from'/Utilities/utils';
import { Utils} from'/Utilities/utils';

// ValidateIfStringIsAddress
// findProfilesDataFetcherRelayer

//  mapDataFetcherEndpoint,
//  findProfilesDataFetcherEndpoint,
//  payProfileDataFetcherEndpoint,


const findProfilesDataFetcherRelayer = async (account) => {

  // }else if(userSearchInput.string == null || userSearchInput.string.length <1){
  if(account == undefined) {
    console.log('undefined caught ')
    return
  }else if(await Utils.ValidateIfStringIsAddress(account) == false ){
    console.log('invalid input..')
    return {vendorData:[], isVendor:false}
  }else{
      const mapProfileData = {
          address: account
        }
  
          console.log("User input for ProfilesData: from findProfilesDataFetcherRelayer", mapProfileData)
  
          const JSONdata = JSON.stringify(mapProfileData)
          // API endpoint where we send form data.
          const endpoint = findProfilesDataFetcherEndpoint // "api/paymentHandler"
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
          // console.log("response..... from mapDataFetchingRelayer: ", await response)
  
          const result = await response.json()
          console.log("response..... from findProfilesDataFetcherRelayer: ",result)
  
          // setTempDataInfo(result)
          // dispatchather({type:"FOUND"})
          
          return (result)
      }
  }
  
  module.exports = {findProfilesDataFetcherRelayer}