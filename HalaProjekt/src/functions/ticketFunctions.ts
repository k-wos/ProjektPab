import express, {Request, Response} from 'express'
import { Ticket} from '../models/Ticket'
import{Event} from '../models/Event'

function randomSector(): number{
    return Math.floor(Math.random()*(200 - 0 +1)+0)
}

class ticketFunctions{

    

    async genereTicket(req:Request, res:Response){

        const eventId = req.params.id
        const eventName = req.params.name
        let sectorForTicket 
        const findEvent = await Event.findOne({id: req.params.id, name:req.params.name})
       
        
        
        if(findEvent){
        
        const ticket = new Ticket({
            id: Date.now(),
            price: Math.floor(Math.random()*(200 - 0 +1)+0),
            sector: randomSector(),
            row: Math.floor(Math.random()*(200 - 0 +1)+0),
            place: Math.floor(Math.random()*(200 - 0 +1)+0),
            forWhatEvent: {
                id: req.params.id,
                name: req.params.name
                
            }
            

        })
        
        await ticket.save()
        return res.send(ticket)
    }
    else 
        return res.status(404).send("Nie mozna zakupic biletu na nieistniejace wydarzenie")
    }
}

module.exports = new ticketFunctions()