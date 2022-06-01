import e from 'express'
import express from 'express'
import { appendFile } from 'fs'

const userAuth = require('./../functions/userFunctions')
const employeeFunctions = require('../functions/employeeFunctions')
const router = express.Router()

router.use(express.json())

router.post('/employee',userAuth.verifyUser, employeeFunctions.addEmployee)
router.get('/employee',employeeFunctions.getAllEmployees)
router.get('/employee/:position', employeeFunctions.getEmployeesByPosition)
router.get('/employeee/:id', employeeFunctions.getEmployeesById)
router.put('/employee/:id',userAuth.verifyUser, employeeFunctions.editEmployee)
router.delete('/employee/:id',userAuth.verifyUser, employeeFunctions.deleteEmployee)

export default router