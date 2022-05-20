import express, {Request, Response} from 'express'
import{Hall} from '../models/Hall'
class hallFunctions{

     getHall(req: Request, res: Response){
        res.send("działa")
    }

}

module.exports = new hallFunctions()