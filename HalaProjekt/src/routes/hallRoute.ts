import express, {Request, Response} from 'express'
import {Hall} from './../models/Hall'
import { MongoClient } from 'mongodb' 
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'


const hallFunctions =  require('../functions/hallFunctions')
const router = express.Router()



router.use(express.json())


    
    


router.get('/hall', hallFunctions.getHall)

router.post('/hall',hallFunctions.addHall)

export default router


