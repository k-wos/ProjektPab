import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import * as hallRouter from './routes/hallRoute'
import {Arena} from './models/Hall'



const app = express()

app.use(express.json())

const mongoDB = 'mongodb+srv://admin:<Qwertyuiop>@cluster0.ka3wh.mongodb.net/?retryWrites=true&w=majority/HallDb'


mongoose.connect(mongoDB,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}as ConnectOptions, () => {
    console.log('connected to db')
})



app.get('/hall', hallRouter.getHall)

app.listen(3000)