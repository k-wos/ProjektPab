import express, {Request, Response} from 'express'
import { Ticket} from '../models/Ticket'
import{Event} from '../models/Event'
import fs from 'fs'




class ticketFunctions{

    

    async createTicket(req:Request, res:Response){

        const{place, row} = req.body
        
        const findEvent = await Event.findOne({id: req.params.id})
        if(!findEvent){
            return res.status(404).send("Nie mozna zakupic biletu na nieistniejace wydarzenie")
        }
        else{
        const findTicketPlace = await Ticket.findOne({place: place, row:row})
        
        if(findTicketPlace){
            res.status(400).send('Miejsce jest zajęte')
        }
        else{
        
        const ticket = new Ticket({
            id: Date.now(),
            price: Math.floor(Math.random()*(200 - 0 +1)+0),
            row,
            place,
            forWhatEvent: {
                id: findEvent.id,
                name: findEvent.name,
                artist: findEvent.artist,
                date: findEvent.date
                
            }
            
            

        })
        let noPeople = findEvent.numberOfPeople + 1
         await Event.updateOne({id: req.params.id}, {numberOfPeople: noPeople})
        
        await ticket.save()
        return res.send(ticket)
    }
    
        
    }
}

    async generateTicket(req:Request, res:Response){
        const findTicket = await Ticket.findOne({id: req.params.id})

         fs.writeFile(req.params.id + " ticket.txt", JSON.stringify(findTicket), function(err){
            if(err){
                return console.log("error")
            }
        })
       return  res.send(findTicket)
    }
}




module.exports = new ticketFunctions()