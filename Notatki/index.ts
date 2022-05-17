import { time } from 'console'
import express from 'express'
import {Request, Response} from 'express'
import { title } from 'process'
import { json } from 'stream/consumers'

const app = express()

app.use(express.json())



interface Note{
    title: string
    content: string
    createDate?: string
    tags?: string[]
    id?: number

    

}
const notesArray: Note[] = []

app.post('/note', function(req: Request, res:Response){
    
    const date = new Date().toISOString()

    const generateId = Date.now()

    const note: Note ={
        title: req.body.title,
        content: req.body.content,
        createDate: date,
        tags: req.body.tags,
        id: generateId

    }
    notesArray.push(note)

    res.send(note)
    
})

app.get('/note/:id', function(req:Request, res:Response){
    
    const id = +req.params.id
    if(notesArray.find(note => note.id==id))
    res.send(notesArray.find(note=>note.id==id))
    else
    res.status(404).send("no exist")
         
})

app.put('/note/:id', function(req: Request, res:Response){
    const id = +req.params.id
    if(notesArray.find(note=> note.id==id)){
        notesArray[id] = req.body
        res.send(req.body)
    }
    else    
        res.send("Note with this id doesn't exists")
})
app.delete('/note/:id', function(req: Request, res:Response){
    const id = +req.params.id
    if(notesArray.find(note=> note.id==id)){
        res.send(notesArray.find(note=>note.id==id))
        notesArray.splice(notesArray.findIndex(note=>note.id==id),1)
    }
    else
    res.send("Note with this id doesn't exists")
})

app.listen(3000)