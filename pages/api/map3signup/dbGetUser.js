
import { getAll, createOne, getOneById, deleteOneById, updateOneById,searchForManyByEmailOrAddress } from '@/0xProfileModel'
const apiUtils = require('../../../Utilities/apiUtils');
 
export default async function form(req, res) {
    // Get data submitted in request's body.
    const body = req.body
     
    // Optional logging to see the responses
    // in the command line where next.js app is running.
    console.log('running get one cmd: .......')

    if (req.method == "POST"){
      if (
        !body.id || body.id.legnth < 1 || body.id == '') {
      return res.status(400).json({ data: 'incomplete required parameters' })
    }
      const {one} = await getOneById(body.id)
      console.log(one,'1111111111111111')
      res.status(200).json({one})
    }else{ // PUT' REQUEST
      console.log('// PUT REQUEST // PUT REQUESThefjbbfefeb;ffbfebedbedvdvdjlvdev')
      const users = await searchForManyByEmailOrAddress(body.string)
        res.status(200).json(users)
    }
  

    // searchForManyByEmailOrAddress
    
  }