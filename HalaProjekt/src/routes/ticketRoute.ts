import express, {Request, Response} from 'express'
import {Ticket} from './../models/Ticket'
import { MongoClient } from 'mongodb' 
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'


const ticketFunctions =  require('../functions/ticketFunctions')
const router = express.Router()



router.use(express.json())


    
    


router.get('/event/ticket', ticketFunctions.genereTicket)



module.exports = router