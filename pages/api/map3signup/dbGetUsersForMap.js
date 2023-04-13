
import { getAll, createOne, getOneById, deleteOneById, updateOneById,searchForManyByEmailOrAddress,searchForManyByKeywordsOrBioOrName } from '@/0xProfileModel'
const apiUtils = require('../../../Utilities/apiUtils');
 
export default async function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
     
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('running get one cmd: .......')

    if (req.method == "POST"){
      if (
        !body.id ) {
      return res.status(400).json({ data: 'incomplete required parameters' })
    }
      const {one} = await getOneById(body.id)
      res.status(200).json({one})
    }
   
    else{ // PUT' REQUEST

      if (
        !body.string ){
        
        // || body.string.legnth < 1 || body.string == '') {
      return res.status(400).json({ data: 'incomplete required parameters' })
    }
      if(body.string.toLowerCase() == '*' || body.string.legnth < 1 || body.string == ''){
        console.log('every data was requested')
        // map3Vendors = vendorsData;
        // getAll
        console.log('// PUT REQUEST // PUT REQUESThefjbbfefeb;ffbfebedbedvdvdjlvdev')
        const users = await getAll()
          res.status(200).json(users)
  
    
  
      }
      console.log('// PUT REQUEST // PUT REQUESThefjbbfefeb;ffbfebedbedvdvdjlvdev')
      const users = await searchForManyByKeywordsOrBioOrName(body.string)
        res.status(200).json(users)
    }
  

    // searchForManyByEmailOrAddress
    
  }