import express, {Request, Response} from 'express'
import { Collection, mongo } from 'mongoose'
import {User} from './../models/User'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

const TOKEN_KEY = 'secretToken'

class userFunctions{

    

    async register(req: Request, res: Response){
        const{first_name, surname, email, password} = req.body

        if(!(first_name && surname && email && password)){
            res.status(400).send("Wszystkie pola są wymagane")
        }

        const userIsExist = await User.findOne({email})

        if(userIsExist){
            return res.status(409).send("Użytkownik jest już zarejestrowany")
        }

        const encryptedPassword = await bcrypt.hash(password,10)

        const user = new User({
            first_name,
            surname,
            email: email.toLowerCase(),
            password: encryptedPassword
        })

        const token = jwt.sign({
            user_id: user._id, email },
            TOKEN_KEY,{
                expiresIn:"24h"
            }
        )
        user.token = token
        await user.save()
        res.status(201).send(user);


        
    }

    async login(req:Request, res: Response){
        const {email, password} = req.body
        if(!(email && password)){
            res.status(400).send("Do zalogowania wymagane są wszystkie pola")
        }

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            res.status(200).send(user.token)
        }
    }

    verifyUser(req: Request, res: Response){
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(403).send('Token jest wymagany')
        }
         jwt.verify(token, TOKEN_KEY)
       
    }
}
module.exports = new userFunctions()