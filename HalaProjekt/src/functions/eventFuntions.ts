import express, {Request, Response} from 'express'
import {Event} from './../models/Event'


class eventFunctions{

    async addEvent(req: Request, res: Response){
        const newDate = new Date().toISOString()
        
        
        
        const{ id, name, artist,date, numberOfPeople, status} = req.body

        const event = new Event({
           id: Date.now(),
           name,
           artist,
           date: newDate,
           numberOfPeople,
           status
            
        })

        await event.save()
        return res.status(201).send(event)
        }

    async getAllEvents(req:Request, res:Response){
        
        const event = await Event.find({})
        return res.status(200).send(event)
      
    }

    async getEventById(req:Request, res:Response){
        const event = await Event.findOne({id: req.params.id})
        if(event)
            return res.send(event)
        else
            return res.status(404).send("Nie istnieje wydarzenie o takim id")
    }

    async editEvent(req:Request, res:Response){
        const findEvent = await Event.findOne({id: req.params.id})

        if(findEvent){
            try {
                const updateEvent = await Event.updateOne({id: req.params.id},req.body)
                return res.send("Wydarzenie zostało pomyślnie zaktualizowane")
            } catch(err){
                return res.status(400).send(err)
            }
        }
        else
            return res.status(404).send("Nie istnieje wydarzenie o takim id")
    }
    async deleteEvent(req:Request, res:Response){
        const findEvent = await Event.findOne({id: req.params.id})

        if(findEvent){
            try {
                const updateEvent = await Event.deleteOne({id: req.params.id},req.body)
                return res.send("Wydarzenie zostało pomyślnie usunięte")
            } catch(err){
                return res.status(400).send(err)
            }
        }
        else
            return res.status(404).send("Nie istnieje wydarzenie o takim id")
    }

}
module.exports = new eventFunctions()