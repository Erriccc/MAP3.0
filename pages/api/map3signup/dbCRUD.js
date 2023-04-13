
import { getAll, createOne, getOneById, deleteOneById, updateOneById } from '@/0xProfileModel'
const apiUtils = require('../../../Utilities/apiUtils');
export default async function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
    
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('body: ')

    if (req.method == "POST" || req.method == "PUT"){
            if (
              !body.vendorsWalletAddress || body.vendorsWalletAddress.legnth < 1 || body.vendorsWalletAddress == '' ||
              !body.vendorsName || body.vendorsName.legnth < 1 ||  body.vendorsName == ''                ) {
            return res.status(400).json({ data: 'incomplete required parameters' })
          }
            ////////////////////////////////////////////////////
            //REMEMBER TO CHANGE CITY STATE AND ZIP T LONGITUTE AND LATITUDE
            ////////////////////////////////////////////////
        
            
            const signUpObject = {
              vendorsWalletAddress:body.vendorsWalletAddress,
              vendorsName:body.vendorsName,
              vendorsEmail:body.vendorsEmail,
              
            }
            console.log("running server function from dbSignUp... " )
            console.log("tuple to be sent ... ", signUpObject )
        
            if (req.method == "POST"){

              const { OXProfile, error } = await createOne(signUpObject)

              if (error) {
                throw error
              }else{
                res.status(200).json(OXProfile)
              }
            }else{ // PUT' REQUEST
              console.log('// PUT REQUEST // PUT REQUESThefjbbfefeb;ffbfebedbedvdvdjlvdev')
              const { OXProfile, error } = await updateOneById(body.vendorsWalletAddress, body)
              if (error) {
                // throw error
                return res.status(400).json({ data: error  })
              }else{
                res.status(200).json(OXProfile)
              }
              
            }
           
  
    }
  
    
  }