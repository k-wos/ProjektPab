import Joi from 'joi'
import { join } from 'path'

export const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true
}

export const hallValidator = Joi.object({
    name: Joi.string().required(),
    address: Joi.string(),
    phone: Joi.string().min(9).max(9),
    nip: Joi.string(),
    regon: Joi.string(),
    email:Joi.string().email(),
    www: Joi.string()
})

export const eventValidator = Joi.object({
    name: Joi.string().required(),
    artist: Joi.string(),
    numberOfPeople: Joi.number().default(0),
    date:Joi.string()
})

export const employeeValidator = Joi.object({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    position: Joi.string().required()


})

export const registerValidation = Joi.object({
    first_name: Joi.string().required(),
    surname: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(9)
})

export const loginValidation = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
})


