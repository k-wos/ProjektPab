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

new Hall({
    name: 'Hala Widowiskowo-Sportowa xxx',
    address: 'ul. xxxxxxxx x 00-000 xxxxxx',
    phone: '000000000',
    nip: '8321732663321',
    regon: '829316732',
    email:'xxxxxxxxx@xx.xx',
    www: 'xxx.xxxxxxx.xxx'

})


export {Hall}