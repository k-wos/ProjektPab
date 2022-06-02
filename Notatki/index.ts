import { notStrictEqual } from 'assert'
import { Console } from 'console'
import express from 'express'
import { Request, Response } from 'express'
import { normalize } from 'path'
import { Note } from './models/note'
import { storagee } from './storage/storage'
import { Tag } from './models/tag'
import { User } from './models/user'

let storage = new storagee

const app = express()
app.use(express.json())
const date = new Date()



function auth(token:string):boolean
{
  console.log(token)
  const user = storage.users.find(user => user.token == token)
  console.log(user)
  console.log(token)
  if(user){return true}
  else{return false}
    
}


app.get('/notes', function (req: Request, res: Response) 
{
  
  try {
    
    
    res.status(200).send(storage.notes)

  } catch {
    res.status(400).send("Wymagane pola notatki są puste")
  }
  
  
})
app.get('/note', function (req: Request, res: Response) {
  if(auth(req.headers.authorization ?? "123")){
  var x = storage.notes.find(function (note: Note) {
    if (note.title == 'TestTitle') {
      console.log("test note was found")
      return true
    }
    else {
      console.log("test note wan't found")
      return false
    }
  })
  res.send(x)
}
else{
  res.send(401).send("Token wygasł lub nie istnieje")
}
})

app.get('/note/:id', function (req: Request, res: Response) { 
  if(auth(req.headers.authorization ?? "123")){
  var thisNoteId: number = +req.params.id
  const note = storage.notes.find(note => note.id == thisNoteId)
  note ?? res.send(404)
  res.status(200).send(note)
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})
app.post('/note', function (req: Request, res: Response) { 
  if(auth(req.headers.authorization ?? "123")){
  if (req.body.title && req.body.content) {

    const date = new Date()
    const thisnote: Note = new Note
      ({
        title: req.body.title,
        content: req.body.content,
        createDate: date.toISOString(),
        tags: storage.tags,  //temp
        id: Date.now()
      })
      storage.Store(thisnote)
    res.status(200).send(thisnote)
  }
  else {
    res.status(400).send("Wymagane pola notatki są puste")
  }
}
else{
  res.send(401).send("Token wygasł lub nie istnieje")
}

})
app.put('/note/:id', function (req: Request, res: Response)

{
  if(auth(req.headers.authorization ?? "123")){
  var thisNoteId: number = +req.params.id
  let note = storage.notes.find(note => note.id == thisNoteId)
  if (!note)
    return res.status(404)
  note.title = req.body.newtitle

  res.status(200).send(note)
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})
app.delete('/note/:id', function (req: Request, res: Response) 
{
  if(auth(req.headers.authorization ?? "123")){
  var thisNoteId: number = +req.params.id
  let note = storage.notes.find(note => note.id == thisNoteId)
  if (!note)
    return res.status(404)
  try {
    const index = storage.notes.map(object => object.id).indexOf(note.id)
    storage.notes.splice(index, 1)
    res.status(200).send('notatka została usunięta')
  }
  catch
  {
    console.log("nie udało się znaleźć indexu notatki")
    note ?? res.status(400).send('Notatka nie istnieje')
  }
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})




app.get('/tags', function (req: Request, res: Response) 
{
  if(auth(req.headers.authorization ?? "123")){
  try {
    const alltags: Tag[] = []
    storage.tags.forEach(function (Tag) {
      alltags.push(Tag)
    })
    res.status(200).send(alltags)

  } catch {
    res.status(400).send("Wymagane pola notatki są puste")
  }
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})
app.get('/tag', function (req: Request, res: Response) { 
  if(auth(req.headers.authorization ?? "123")){
  var x = storage.tags.find(function (tag: Tag) {
    if (tag.name == 'TestName') {
      console.log("test tag was found")
      return true
    }
    else {
      console.log("test tag wasn't found")
      return false
    }
  })
  res.send(x)
}
else{
  res.send(401).send("Token wygasł lub nie istnieje")
}
})

app.get('/tag/:id', function (req: Request, res: Response) { 
  if(auth(req.headers.authorization ?? "123")){
  var thisTagId: number = +req.params.id
  const tag = storage.tags.find(tag => tag.id == thisTagId)
  tag ?? res.send(404)
  res.status(200).send(tag)
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})
app.post('/tag', function (req: Request, res: Response) { 
  if(auth(req.headers.authorization ?? "123")){
  if (req.body.name) {

    const date = new Date()
    const thistag: Tag = new Tag(req.body.name)
    storage.tags.push(thistag)
    res.status(200).send(thistag)
  }
  else {
    res.status(400).send("Wymagane pola tagu są puste")
  }
}
else{
  res.send(401).send("Token wygasł lub nie istnieje")
}

})
app.put('/tag/:id', function (req: Request, res: Response)
{
  if(auth(req.headers.authorization ?? "123")){
  var thisTagId: number = +req.params.id
  let tag = storage.tags.find(tag => tag.id == thisTagId)
  if (!tag)
    return res.status(404)
  tag.name = req.body.newname
  
  res.status(200).send(tag)
  }
  else{
    res.send(401).send("Token wygasł lub nie istnieje")
  }
})
app.delete('/tag/:id', function (req: Request, res: Response) 
{
  if(auth(req.headers.authorization ?? "123")){
  var thisTagId: number = +req.params.id
  let tag = storage.tags.find(tag => tag.id == thisTagId)
  if (!tag)
    return res.status(404)
  try {
    const index = storage.tags.map(object => object.id).indexOf(tag.id)
    storage.notes.splice(index, 1)
    res.status(200).send('tag został usunięty')
  }
  catch
  {
    console.log("nie udało się znaleźć indexu tagu")
    tag ?? res.status(400).send('Tag nie istnieje')
  }
}
else{
  res.send(401).send("Token wygasł lub nie istnieje")
}
})

app.post('/login', function(req: Request, res: Response){ 
  if(req.body.login && req.body.password){
  let pass:string = req.body.password
  let login:string = req.body.login
  let token:string = User.tokengenerator(login,pass)
  const newuser: User = new User(token)
  storage.users.push(newuser)
  res.status(200).send(token)
  }
  else{
    return res.status(400)
  }
})
app.listen(3000)