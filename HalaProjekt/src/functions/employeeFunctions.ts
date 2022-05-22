import express, {Request,Response} from "express"
import{Employee} from './../models/Employees'
class employeeFunctions{


    async addEmployee(req:Request, res:Response){
        const{name, surname, position} = req.body

        const employee = new Employee({
            name,
            surname,
            position
        })

        await employee.save()
        res.status(201).send(employee)
    }
    async getAllEmployees(req:Request, res:Response){
        const employee = await Employee.find({})
        res.send(employee)
    }

    async getEmployeesByPosition(req:Request, res:Response){
        const employee = await Employee.find({position: req.params.position}) 
        res.send(employee)
    }
}

module.exports = new employeeFunctions()