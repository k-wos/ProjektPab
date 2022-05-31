import { Decimal128 } from 'mongodb'
import mongoose from 'mongoose'
import {Event} from './Event'

const ticketSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    price:{
        type: Decimal128
    },
    
    row:{
        type: Number
    },
    place:{
        type: Number
    },
    forWhatEvent:{
        type:Array
    }
})

const Ticket = mongoose.model('Ticket', ticketSchema)

export {Ticket}


