const fetch = require('node-fetch');
import { mapDataFetcherEndpoint,dbGetUsersForMapEndPoint} from'/Utilities/utils';
const apiUtils = require('../apiUtils');


//  mapDataFetcherEndpoint,
//  findProfilesDataFetcherEndpoint,
//  payProfileDataFetcherEndpoint,

 


const mapDataRelayer = async (userSearchInput) => {

if(userSearchInput.string == undefined) {console.log('undefined caught ')
return
}
// else if(userSearchInput.string == null || userSearchInput.string.length <1){
//     console.log('invalid input..')

//     return {map3Vendors:[]}
// }
else{

    const map3SearchData = {
        string: userSearchInput.string == '*' || userSearchInput.string.legnth < 1 || userSearchInput.string == '' ? "*":userSearchInput.string
      } 
 
        console.log("User input for mapData: from mapDataRelayer", map3SearchData)

        const JSONdata = JSON.stringify(map3SearchData)
        // API endpoint where we send form data.
        const endpoint = dbGetUsersForMapEndPoint // "api/paymentHandler"
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
        const response = await fetch(endpoint, options)
        console.log("response..... from mapDataFetchingRelayer: ", await response)
 
        const result = await response.json()
        console.log("response..... from mapDataFetchingRelayer: ",result)
        // const result = await apiUtils.fetchDataForMap(userSearchInput.string);// new implimentation from moralis database
 

        // setTempDataInfo(result)
        // dispatchather({type:"FOUND"})
        
        return (result)
    }
}

module.exports = {mapDataRelayer}






