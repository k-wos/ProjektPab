import {Request, Response} from 'express'

export class Hall{
    name: string
    address: string
    phone: string
    nip: string
    regon: string
    email: string
    www: string

    constructor(h: Hall){
        this.name = h.name
        this.address = h.address
        this.phone = h.phone
        this.nip = h.nip
        this.regon = h.regon
        this.email = h.email
        this.www = h.www
    }
}