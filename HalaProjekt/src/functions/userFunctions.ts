import express, {NextFunction, Request, Response} from 'express'
import { Collection, mongo } from 'mongoose'
import {User} from './../models/User'
import bcrypt, { hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerValidation,loginValidation, options } from '../validation/validation'


const TOKEN_KEY = 'secretToken'

class userFunctions{

    

    async register(req: Request, res: Response){
       /* const{first_name, surname, email, password} = req.body

        

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
        const {error} = registerValidation.validate(user, options)
        if(error){
          return res.status(400).send(error.details[0].message)
        }

        const token = jwt.sign({
            user_id: user._id, email },
            TOKEN_KEY,{
                expiresIn:"24h"
            }
        )
        user.token = token
        await user.save()
        res.status(201).send(user);
            */

        const {error} = registerValidation.validate(req.body, options)
        if(error) return res.status(400).send(error.details[0].message)

        const emailIsUsed = await User.findOne({email: req.body.email})
        if(emailIsUsed) return res.status(400).send("Ten email jest już wykorzystany")

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(req.body.password, salt)

        const user = new User({
            first_name: req.body.first_name,
            surname: req.body.surname,
            email: req.body.email,
            password: hashPass
        })
        try{
            const savedUser = await user.save()
            res.send(savedUser)
        }catch(err){
            res.status(400).send(err)
        }

        
    }

    async login(req:Request, res: Response){
       /* const {email, password} = req.body
        if(!(email && password)){
            res.status(400).send("Do zalogowania wymagane są wszystkie pola")
        }

        const user = await User.findOne({email})

        if(user && (await bcrypt.compare(password, user.password))){
            //res.status(200).send(user.token)
            const token = jwt.sign(req.body, TOKEN_KEY,{
                expiresIn: "24h"
            })
            return res.status(200).send(token)
        }
        else{
            res.status(409).send("Błędne hasło")
        }*/
        const {error} = loginValidation.validate(req.body, options)
        if(error) return res.status(400).send(error.details[0].message)

        const user = await User.findOne({email: req.body.email});
        if(!user) return res.status(400).send('Nie istnieje konto o takim adresie email')

        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).send("Niepoprawne hasło")

        const token  = jwt.sign({first_name: user.first_name}, TOKEN_KEY);
        res.header('authorization', token).send(token)

        


    }

    verifyUser(req: Request,res: Response,next: NextFunction){
        const token = req.headers.authorization?.split(' ')[1]

        if(!token){
            return res.status(401).send('Brak Dostępu')
        }
         try{
            const verified = jwt.verify(token, TOKEN_KEY)
            res.locals.verified = verified
            next()
         }catch(err){
            return res.status(400).send('Niepoprawny token')
         }
         
       
    }
}
module.exports = new userFunctions()