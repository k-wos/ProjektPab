import express, {Request, Response} from 'express'
import {Arena} from './../models/Hall'

const newHall = new Arena({
    name: 'Hala Widowiskowo-Sportowa xxx',
    address: 'ul. xxxxxxxx x 00-000 xxxxxx',
    phone: '000000000',
    nip: '8321732663321',
    regon: '829316732',
    email:'xxxxxxxxx@xx.xx',
    www: 'xxx.xxxxxxx.xxx'

})

newHall.save()

export let getHall = ((req:Request, res:Response) => {
    console.log(newHall)
    
    
})

export let createHall = ((req: Request, res: Response) => {
    
    return res.send('hall')
})


