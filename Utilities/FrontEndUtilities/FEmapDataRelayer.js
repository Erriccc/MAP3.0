const fetch = require('node-fetch');
import { mapDataFetcherEndpoint} from'/Utilities/utils';


//  mapDataFetcherEndpoint,
//  findProfilesDataFetcherEndpoint,
//  payProfileDataFetcherEndpoint,




const mapDataRelayer = async (userSearchInput) => {

if(userSearchInput.string == undefined) {console.log('undefined caught ')
return
}else if(userSearchInput.string == null || userSearchInput.string.length <1){
    console.log('invalid input..')

    return {map3Vendors:[]}
}else{
    const map3SearchData = {
        string: userSearchInput.string
      }

        console.log("User input for mapData: from mapDataRelayer", map3SearchData)

        const JSONdata = JSON.stringify(map3SearchData)
        // API endpoint where we send form data.
        const endpoint = mapDataFetcherEndpoint // "api/paymentHandler"
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
        console.log("response..... from mapDataFetchingRelayer: ",result)

        // setTempDataInfo(result)
        // dispatchather({type:"FOUND"})
        
        return (result)
    }
}

module.exports = {mapDataRelayer}






