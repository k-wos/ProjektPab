import express, {Request, Response} from 'express'

const router = express.Router()

router.get('/hall', (req, res) => {
    return res.send('Hall')
})

router.post('/hall', (req: Request, res: Response) => {
    return res.send('new hall created')
})

export {router as hallRouter}
