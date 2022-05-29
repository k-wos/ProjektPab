import exp from 'constants'
import express from 'express'

const userFunctions = require('./../functions/userFunctions')
const router = express.Router()


router.use(express.json())

router.post('/register', userFunctions.register)
router.post('/login', userFunctions.login)
export default router