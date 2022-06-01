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
              id:Date.now(),
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
    async editHall(req:Request, res:Response){
      const findHall = await Hall.findOne({id: req.params.id})

      if(findHall){
          try {
              const updateEvent = await Hall.updateOne({id: req.params.id},req.body)
              return res.send("Hala została pomyślnie zaktualizowana")
          } catch(err){
              return res.status(400).send(err)
          }
      }
      else
          return res.status(404).send("Nie istnieje wydarzenie o takim id")
  }
  async deleteHall(req:Request, res:Response){
      const findHall = await Hall.findOne({id: req.params.id})

      if(findHall){
          try {
              const updateEvent = await Hall.deleteOne({id: req.params.id},req.body)
              return res.send("Hala została pomyślnie usunięta")
          } catch(err){
              return res.status(400).send(err)
          }
      }
      else
          return res.status(404).send("Nie istnieje hala o takim id")
  }
}

module.exports = new hallFunctions()