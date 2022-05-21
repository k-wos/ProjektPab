import express, {Request, Response} from 'express'
import { Ticket } from '../models/Ticket'



class ticketFunctions{

    async genereTicket(req:Request, res:Response){

        
        
        const ticket = new Ticket({
            id: Date.now(),
            price: Math.floor(Math.random()*(200 - 0 +1)+0),
            sector:Math.floor(Math.random()*(200 - 0 +1)+0),
            row: Math.floor(Math.random()*(200 - 0 +1)+0),
            place: Math.floor(Math.random()*(200 - 0 +1)+0),


        })
        await ticket.save()
        return res.send(ticket)
    }
}

module.exports = new ticketFunctions()