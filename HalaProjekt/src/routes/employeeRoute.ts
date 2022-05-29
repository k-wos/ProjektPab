import e from 'express'
import express from 'express'
import { appendFile } from 'fs'

const employeeFunctions = require('../functions/employeeFunctions')
const router = express.Router()

router.use(express.json())

router.post('/employee', employeeFunctions.addEmployee)
router.get('/employee',employeeFunctions.getAllEmployees)
router.get('/employee/:position', employeeFunctions.getEmployeesByPosition)
router.put('/employee/:id', employeeFunctions.editEmployee)
router.delete('/employee/:id', employeeFunctions.deleteEmployee)

export default router