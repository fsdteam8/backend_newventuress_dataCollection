import { Router } from 'express'
import createWaitlist from '../controllers/createWaitlist.js'

const router = Router()

router.route('/waitlist').post(createWaitlist)

export default router
