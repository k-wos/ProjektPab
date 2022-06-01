import express, {Request, Response} from 'express'
import {Hall} from './../models/Hall'
import { MongoClient } from 'mongodb' 
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'

const userAuth = require('./../functions/userFunctions')
const hallFunctions =  require('../functions/hallFunctions')
const router = express.Router()



router.use(express.json())


    
    


router.get('/hall', hallFunctions.getHall)

router.post('/hall',userAuth.verifyUser, hallFunctions.addHall)
router.put('/hall/:id',userAuth.verifyUser, hallFunctions.editHall)
router.delete('/hall/:id',userAuth.verifyUser, hallFunctions.deleteHall)

export default router


