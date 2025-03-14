import { Router } from 'express'
import { addNewsLetter } from '../controllers/newsLetterController.js'

const router = Router()

router.post('/newsletter', addNewsLetter)

export default router
