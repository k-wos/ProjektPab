import express, {Request, Response} from 'express'
import { Collection, mongo } from 'mongoose'
import{Hall} from '../models/Hall'
import { hallValidator,options } from '../validation/validation'
import { resolve } from 'path/posix'
import Joi from 'joi'


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
            const {error} = hallValidator.validate(hall, options)
            if(error){
              return res.status(400).send(error.details[0].message)
            }
        
        await hall.save()
        return res.status(201).send(hall)
    }
}

module.exports = new hallFunctions()