const apiUtils = require('../../../Utilities/apiUtils');
const Utils = require('../../../Utilities/utils');
// import { sendersCoinList } from '../constants/coinLists'; //
// import { DefaultCoinIcon } from '/components/icons/defaultCoinIcon';



// const fruits = ['🥝', '🍓', '🍑']
// console.log(fruits.includes('🍉')) // returns false
// console.log(fruits.includes('🍑')) // returns true



export default function form(req, res) {
    const body  = req.body
     // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.address ) {
        console.log("incomplete required parameters: ",body )
         // Sends a HTTP bad request error code
         return res.status(100).json({ data: 'please pass in all required parameters' })
       }

    console.log("running server function for payProfile Data" )


    

            // const Map3ReadOnly = new Utils.ethers.Contract(Utils.Map3VendorAddress,Utils.Map3VendorsABi,Utils.provider)
            // const checkIsVendor = await Map3ReadOnly.checkIsVendor(body.address)

            const vendorsData = Utils.vendorsData;
            const VendorsAddress = body.address.trim().toLowerCase();
            console.log("searchKeyword in lowercase", VendorsAddress);

                let mapProfileData = vendorsData.filter(function (item) {
                const walletAddress = item.walletAddress;

                return(
                    (walletAddress.toLowerCase().includes(VendorsAddress) && item))
            })

    // console.log("completed server function from payProfileDataFetcher: ",mapProfileData )

    if (mapProfileData.legnth = 0){
        res.status(200).json({vendorData:{}, isVendor:false})

    }else{

 

    //    let VendorsCurrencyInfo;
       (async function() {

        console.log(mapProfileData, '.. mapProfileData...')
        console.log(mapProfileData[0], 'mapProfileData[0]......................')
        
        let VendorsCurrencyInfo = await  Utils.GetCUrrencyDetails(mapProfileData[0].vendorsToken)
        console.log("VendorsCurrencyInfo..... from api", VendorsCurrencyInfo)

        let vendorData = {
            // reciver: mapProfileData[0].walletAddress,
            // reciversToken: mapProfileData[0].vendorsToken,
            vendorsDetails: mapProfileData,
            VendorsCurrencyInfo: VendorsCurrencyInfo,


        };
        console.log("vendorData.......................", vendorData)

        res.status(200).json({vendorData:vendorData, isVendor:true})

        })();
    }

  }


//   {vendorData:[], isVendor:false}

// {
//     "name": "Resturant on Georgia Avenue",
//     "city": "DC",
//     "description": "fries wings burgers burrito fast food",
//     "imgUrl":
//       "https://cdn.pixabay.com/photo/2015/09/21/14/24/supermarket-949913__340.jpg",
//     "lat": "42.011390",
//     "long": "-87.762960",
//     "walletAddress":"0xC1FbB4C2F4CE9eF87d42A0ea49683E0Cfb003f2F",
//     "distance": "5",
//     "vendorsToken":"0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
//     "email": "vendorsEmail@Email.com",
//     "websiteUrl":"testUrl.io",
//     "keyWords": ["Resturant", "DC", "digital", "GeorgiaAvenue", "food"]

// }