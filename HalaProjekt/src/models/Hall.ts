import exp from 'constants'
import {Request, Response} from 'express'
import { Db } from 'mongodb'
import mongoose, {Document, Model} from 'mongoose'

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

export interface IHall{
    name: string
    address: string
    phone: string
    nip: string
    regon: string
    email: string
    www: string
    }

const Arena = mongoose.model('Hall', hallSchema)


export {Arena}