import { time } from 'console'
import express from 'express'
import {Request, Response} from 'express'
import { title } from 'process'
import { json } from 'stream/consumers'
import fs, { read } from 'fs'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

async function readStorage(): Promise<void> {
    try {
        notesArray = JSON.parse(await fs.promises.readFile("./storage/notes.json", 'utf-8'))
        tagsArray = JSON.parse(await fs.promises.readFile("./storage/tags.json", 'utf-8'))
        usersArray = JSON.parse(await fs.promises.readFile("./storage/users.json", 'utf-8'))
        
    } catch (err) {
        console.log(err)
    }
}

async function updateStorage(): Promise<void> {
    try {
        await fs.promises.writeFile("./storage/notes.json", JSON.stringify(notesArray))
        await fs.promises.writeFile("./storage/tags.json", JSON.stringify(tagsArray))
        await fs.promises.writeFile("./storage/users.json", JSON.stringify(usersArray))
       
    } catch (err) {
        console.log(err)
    }
}



interface Note{
    title: string
    content: string
    createDate?: string
    tags?: Tag[]
    id?: number

    

}

interface Tag{
    id?: number
    name: string
}

interface User{
    login: string
    password: string
    token: string
}

let notesArray: Note[] = []
let tagsArray: Tag[] = []
let usersArray: User[] = []

readStorage()

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
    updateStorage()
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

app.get('/notes', function(req:Request, res:Response){
    res.send(notesArray);
})

app.get('/tag/:id',function(req:Request, res:Response){
    const id = +req.params.id
    if(tagsArray.find(tag => tag.id==id))
    res.send(notesArray.find(tag=>tag.id==id))
    else
    res.status(404).send("no exist")
})
app.get('/tags', function(req:Request, res:Response){
    res.send(tagsArray);
})

app.listen(3000)