import mongoose from "mongoose";



const employeeSchema = new mongoose.Schema({
    id:{
        type: String
    },
     name:{
         type: String
     },
     surname:{
         type: String
     },
     position:{
         type:String
     }

})

const Employee = mongoose.model('Employee',employeeSchema)

export {Employee}