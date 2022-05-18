import express, {Request, Response} from 'express'
import {Hall} from './../models/Hall'



export let getHall = ((req:Request, res:Response) => {
    let hall = JSON.stringify(Hall)
    return res.send(hall)
})

export let createHall = ((req: Request, res: Response) => {
    
    return res.send('hall')
})


