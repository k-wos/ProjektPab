import express, {Request, Response} from 'express'
import { Collection, mongo } from 'mongoose'
import{Hall} from '../models/Hall'

import { resolve } from 'path/posix'


class hallFunctions{

    async getHall(req: Request, res: Response){
         
      const hall = await Hall.find({})
      return res.send(hall)   

               
    }
    async addHall(req: Request, res: Response) {
        const{name, address, phone, nip, regon, email, www} = req.body
        const hall = new Hall({
            name,
             address,
              phone, 
              nip, 
              regon, 
              email, 
              www

            })
        await hall.save()
        return res.status(201).send(hall)
    }
}

module.exports = new hallFunctions()