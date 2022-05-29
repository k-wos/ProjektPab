import express, {Request,Response} from "express"
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
                const updateEmployee = await Employee.updateOne({id: req.params.id}, req.body)
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