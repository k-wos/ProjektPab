import { captureRejections } from 'events'
import express, {Request, Response} from 'express'
import { Catering } from '../models/Catering'

class cateringFunctions{
    async addCatering(req:Request, res:Response){
        const{name, owner, dishes } = req.body


        const catering = new Catering({
        name,
        owner,
        dishes
})
    await catering.save()
    res.send(catering)
}

async getAllCaterings(req:Request, res:Response){
    const catering = await Catering.find({})
    return res.send(catering)
}
async getCateringById(req:Request, res:Response){
    const catering = await Catering.findOne({name: req.params.name})
    if(catering)
        return res.send(catering)
    else
        return res.status(404).send("Nie istnieje catering o takiej nazwie")
}
async editCatering(req:Request, res:Response){
    const findCatering = await Catering.findOne({name: req.params.name})

    if(findCatering){
        try {
            const updateCatering = await Catering.updateOne({name: req.params.name},req.body)
            return res.send("Dane cateringu  zostały pomyślnie zaktualizowane")
        } catch(err){
            return res.status(400).send(err)
        }
    }
    else
        return res.status(404).send("Nie istnieje Catering o takiej nazwie")
}
async deleteCatering(req:Request, res:Response){
    const findCatering = await Catering.findOne({name: req.params.name})

    if(findCatering){
        try {
            const updateCatering = await Catering.deleteOne({name: req.params.name},req.body)
            return res.send("Catering został pomyślnie usunięty")
        } catch(err){
            return res.status(400).send(err)
        }
    }
    else
        return res.status(404).send("Nie istnieje catering o takiej nazwie")
}
}

module.exports = new cateringFunctions()