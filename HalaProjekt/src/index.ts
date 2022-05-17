import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import { hallRouter } from './routes/hallRoute'


const app = express()

app.use(express.json())
app.use(hallRouter)

mongoose.connect('mongodb://localhost:27017/Hall',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}as ConnectOptions, () => {
    console.log('connected to db')
})

app.listen(3000)