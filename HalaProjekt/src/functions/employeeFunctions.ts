import express, {Request,Response} from "express"
import { employeeValidator, options } from "../validation/validation"
import{Employee} from './../models/Employees'
class employeeFunctions{


    async addEmployee(req:Request, res:Response){
        const{name, surname, position} = req.body

        const employee = new Employee({
            id: Date.now(),
            name,
            surname,
            position
        })
        const {error} = employeeValidator.validate(employee, options)
        if(error){
          return res.status(400).send(error.details[0].message)
        }

        await employee.save()
        res.status(201).send(employee)
    }
    async getAllEmployees(req:Request, res:Response){
        const employee = await Employee.find({})
        res.send(employee)
    }

    async getEmployeesByPosition(req:Request, res:Response){
        const employee = await Employee.find({position: req.params.position}) 
        if(employee){
        res.send(employee)
        }
        else{
            return res.status(404).send("Nie znaleziono takiego stanowiska")
        }
    }
    async getEmployeesById(req:Request, res:Response){
        const employee = await Employee.find({id: req.params.id}) 
        if(employee){
        res.send(employee)
        }
        else{
            return res.status(404).send("Nie znaleziono takiego pracownika")
        }
    }
    async editEmployee(req:Request, res: Response){
        const findEmployee = await Employee.findOne({id: req.params.id})

        if(findEmployee){
            try{
                const updateEmployee = await Employee.updateOne({id: req.params.id}, req.body)
                return res.send("Dane pracownika zostały zaktualizowane")
            }
            catch (err){
                return res.status(400).send(err)
            }
        }
        else   
            return res.status(404).send("Nie istnieje taki pracownik")
    }

    async deleteEmployee(req:Request, res:Response){
        const findEmployee = await Employee.findOne({id: req.params.id})

        if(findEmployee){
            try{
                const updateEmployee = await Employee.deleteOne({id: req.params.id}, req.body)
                return res.send("Dane pracownika zostały usunięte")
            }
            catch (err){
                return res.status(400).send(err)
            }
        }
        else   
            return res.status(404).send("Nie istnieje taki pracownik")
    }
}

module.exports = new employeeFunctions()