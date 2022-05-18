import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
import * as hallRouter from './routes/hallRoute'



const app = express()

app.use(express.json())


mongoose.connect('mongodb://localhost:27017/Hall',{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}as ConnectOptions, () => {
    console.log('connected to db')
})
app.get('/hall', hallRouter.getHall)

app.listen(3000)