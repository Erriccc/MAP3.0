const fetch = require('node-fetch');
import { payProfileDataFetcherEndpoint,dbGetUserEndPoint} from'/Utilities/utils';
import Utils from'/Utilities/utils';
const apiUtils = require('../apiUtils');


// ValidateIfStringIsAddress
// findProfilesDataFetcherRelayer

//  mapDataFetcherEndpoint,
//  findProfilesDataFetcherEndpoint,
//  payProfileDataFetcherEndpoint,
 

const payProfileDataFetcherRelayer = async (account) => {

  // }else if(userSearchInput.string == null || userSearchInput.string.length <1){
  if(account == undefined) {
    console.log('undefined caught ')
    return
  }else if(await Utils.ValidateIfStringIsAddress(account) == false){
    console.log('invalid address..')
    console.log("return data",{vendorData:{}, isVendor:false})
    return {vendorData:{}, isVendor:false} 
  }else{
      const mapProfileData = {
          id: account
        }
          console.log("User input for ProfilesData: from findProfilesDataFetcherRelayer", mapProfileData)
          const JSONdata = JSON.stringify(mapProfileData)
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
          const response = await fetch(endpoint, options)
          console.log("response..... from mapDataFetchingRelayer: ", await response)
  
          const result = await response.json()
      // console.log(result.one,'223333221111111111111111')
      // console.log("response..... from findProfilesDataFetcherRelayer: ",result)
          const isVendor = (result.one.vendorsLat !== null || result.one.vendorsLat !== undefined && result.vendorsLong !== null || result.vendorsLong !== undefined)
        // const result = await apiUtils.fetchVendorProfileData(account);

          // console.log(isVendor, 'isVendorrrrrrorrrroroooorrrrrr')
          // setTempDataInfo(result)
          // dispatchather({type:"FOUND"})
          
          return ({isVendor,vendorsData:result.one})
      }
  }
  
  module.exports = {payProfileDataFetcherRelayer}