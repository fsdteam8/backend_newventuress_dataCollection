import express from 'express'
import cors from 'cors'
import waitList from './routes/waitListRoutes.js'
import newsLetterRouter from './routes/newsLetterRoutes.js'

const app = express()

// middlewares
app.use(express.json())
app.use(express.static('./data'))
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: '*' }))

// routes
app.use('/api/v1', waitList)
app.use('/api/v1', newsLetterRouter)

//
app.get('/', (req, res) => {
  return res
    .status(200)
    .json({ status: 'success', message: 'api hit successfully' })
})

export default app
