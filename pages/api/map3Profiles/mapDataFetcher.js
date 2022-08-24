const apiUtils = require('../../../Utilities/apiUtils');
const Utils = require('../../../Utilities/utils');





export default function form(req, res) {
    const body  = req.body
     // Guard clause checks for first and last name,
    // and returns early if they are not found
    if (!body.string || !body.string) {
        console.log("incomplete required parameters: ",body )
         // Sends a HTTP bad request error code
         return res.status(100).json({ data: 'please pass in all required parameters' })
       }

    console.log("running server function for map data" )

            const vendorsData = Utils.vendorsData;
            const searchKeyword = body.string.trim().toLowerCase();
            console.log("searchKeyword in lowercase", searchKeyword);
   
            let map3Vendors ;
            if(body.string.toLowerCase() == '*'){
                console.log('every data was requested')
                map3Vendors = vendorsData;

            }else{
            map3Vendors = vendorsData.filter(function (item) {
                const name = item.name;
                const walletAddress = item.walletAddress;
                const KeyWords = item.keyWords
                const websiteUrl = item.websiteUrl
                const bio = item.description;

                return(
                    (name.toLowerCase().includes(searchKeyword) && item) ||
                    (walletAddress.toLowerCase().includes(searchKeyword) && item)||
                    (websiteUrl.toLowerCase().includes(searchKeyword) && item)||
                    (bio.toLowerCase().includes(searchKeyword) && item)
                    ||(KeyWords.some((keyWord) => {
                        return keyWord.toLowerCase().includes(searchKeyword);
                    }
                    ) && item)
                  )
            })
        }

    console.log("completed server function from mapDataFether: ",map3Vendors )

    res.status(200).json({map3Vendors:map3Vendors})
  }

   // return(
                //     (name.toLowerCase().match(searchKeyword) && name) ||
                //     (walletAddress.toLowerCase().match(searchKeyword) && walletAddress)||
                //     (websiteUrl.toLowerCase().match(searchKeyword) && websiteUrl)||
                //     (bio.toLowerCase().match(searchKeyword) && bio)
                //     // ||
                //     // (KeyWords.map(keyWord => keyWord.match(searchKeyword) )&& KeyWords) 
                //   )

                
// const fruits = ['🥝', '🍓', '🍑']
// console.log(fruits.includes('🍉')) // returns false
// console.log(fruits.includes('🍑')) // returns true

// const ages = [25, 41, 37, 12, 10, 18, 14]
// const canDrive = ages.filter(age => age >= 16)
// console.log(canDrive) // returns [25,41,37,18]

// name.toLowerCase().match(searchKeyword)

// coinListData = coinList.filter(function (item) {
//     const name = item.name;
//     const walletAddress = item.address;
//     return(
//         name.match(searchKeyword) ||
//         walletAddress.match(searchKeyword) ||
//         (name.toLowerCase().match(searchKeyword) && name) ||
//         (walletAddress.toLowerCase().match(searchKeyword) && walletAddress) 
//       )
// })
