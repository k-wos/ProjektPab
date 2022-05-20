import express from 'express'
import mongoose, { ConnectOptions } from 'mongoose'
//import * as hallRouter from './routes/hallRoute'
import {Hall} from './models/Hall'

require('./models/Hall.ts')
const hallRouter = require('./routes/hallRoute')


const app = express()

app.use(express.json())

const mongoDB = 'mongodb://admin:projekt@cluster0-shard-00-00.ka3wh.mongodb.net:27017,cluster0-shard-00-01.ka3wh.mongodb.net:27017,cluster0-shard-00-02.ka3wh.mongodb.net:27017/?ssl=true&replicaSet=atlas-10z0sl-shard-0&authSource=admin&retryWrites=true&w=majority'



mongoose.connect(mongoDB,).then(()=>{
    console.log(`successfully connected`);
    }).catch((e)=>{
    console.log(`not connected`);
    });



//app.get('/hall', hallRouter.getHall)
app.use('/',hallRouter)

app.listen(3000)