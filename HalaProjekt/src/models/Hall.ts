import exp from 'constants'
import {Request, Response} from 'express'
import mongoose from 'mongoose'

/*
export interface Hall{
    name: string
    address: string
    phone: string
    nip: string
    regon: string
    email: string
    www: string

    
    }
*/

const hallSchema = new mongoose.Schema({
    name:{
        type: String
    },
    address:{
        type: String
    },
    phone:{
        type: String
    },
    nip:{
        type: String
    },
    regon:{
        type: String
    },
    email:{
        type: String
    },
    www:{
        type: String
    }
})

const Hall = mongoose.model('Hall', hallSchema)

export {Hall}