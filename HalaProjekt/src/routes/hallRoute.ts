import express, {Request, Response} from 'express'
import {Hall} from './../models/Hall'


const hallFunctions =  require('../functions/hallFunctions')
const router = express.Router()

/*export let getHall = ((req:Request, res:Response) => {
    console.log('ddd')
    
    
})*/

router.get('/hall', hallFunctions.getHall)

export let createHall = ((req: Request, res: Response) => {
    
    return res.send('hall')
})

module.exports = router


