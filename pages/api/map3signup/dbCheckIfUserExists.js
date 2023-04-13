
import { getAll, createOne, getOneById, deleteOneById, updateOneById,checkIfOneExistById } from '@/0xProfileModel'
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
      const {exists,one} = await checkIfOneExistById(body.id)

        res.status(200).json({exists})
    }
  
    
  }