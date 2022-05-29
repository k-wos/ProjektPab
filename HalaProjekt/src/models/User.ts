import exp from 'constants'
import {Request, Response} from 'express'
import { Db, ObjectId } from 'mongodb'
import mongoose, {Document, Model} from 'mongoose'
import * as mongo from 'mongodb'

const userSchema = new mongoose.Schema({
    first_name:{
        type: String
    },
    surname:{
        type:String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type:String
    },
    token:{
        type: String
    }

})
const User = mongoose.model("user", userSchema)

export {User}