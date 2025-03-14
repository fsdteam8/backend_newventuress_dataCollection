import express from 'express'
import cors from 'cors'
import wishListRouter from './routes/waitListRoutes.js'
import newsLetterRouter from './routes/newsLetterRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

// routes
app.use('/api/v1', wishListRouter)
app.use('/api/v1', newsLetterRouter)

export default app
