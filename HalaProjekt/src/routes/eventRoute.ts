import express, {Request, Response} from 'express'
import { Event } from '../models/Event'
import { MongoClient } from 'mongodb' 
import * as dotenv from 'dotenv'
import * as mongoose from 'mongoose'
import { appendFile } from 'fs'
import { verify } from 'crypto'

const userAuth = require('./../functions/userFunctions')
const eventFunctions = require('./../functions/eventFuntions')
const router = express.Router()

router.use(express.json())

router.post('/event',eventFunctions.addEvent)
router.get('/event', eventFunctions.getAllEvents)
router.get('/event/:id', eventFunctions.getEventById)
router.put('/event/:id',  eventFunctions.editEvent)
router.delete('/event/:id', eventFunctions.deleteEvent)


export default router