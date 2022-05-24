import mongoose from "mongoose";



const cateringSchema = new mongoose.Schema({

    name:{
        type:String
    },
    owner:{
        type:String
    },
    dishes:{
        type:Array
    }
    
})

const Catering = mongoose.model('Catering', cateringSchema)

export {Catering}