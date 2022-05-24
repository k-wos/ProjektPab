import express from 'express'

const cateringFunctions = require('./../functions/cateringFunctions')
const router = express.Router()

router.use(express.json())

router.post('/catering', cateringFunctions.addCatering)
router.get('/catering', cateringFunctions.getAllCaterings)
router.get('/catering:name', cateringFunctions.getCateringByName)
router.put('/catering/:name', cateringFunctions.updateCatering)
router.put('/catering/:name', cateringFunctions.deleteCatering)
export default router