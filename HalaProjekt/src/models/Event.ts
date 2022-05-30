import exp from 'constants'
import {Request, Response} from 'express'
import mongoose from 'mongoose'

/*
export interface Event{
    name: string
    artist?: string
    numberOfPeople : number
    date: Date
    ticket: string
    status: string //nadchodzące/odbyte
    
}
*/
const eventSchema = new mongoose.Schema({
    id:{
        type: Number
    },
    name:{
        type: String,
        required: true

    },
    artist:{
        type: String,
        required: false
    },
    numberOfPeople:{
        type: Number,
        default:0
    },
    date:{
        type: String
    },
    
    status:{
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema)

export {Event}