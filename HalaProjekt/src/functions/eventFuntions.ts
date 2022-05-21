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

}
module.exports = new eventFunctions()