import express, { NextFunction, Request, Response } from 'express'
import { connect } from './db-connection/connection'
import clientrouter from './routers/client'
import carrouter from './routers/cars'
import { validations_middleware } from './middlewares/validations.middleware'
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.urlencoded({ extended: true }));
// Middleware to handle errors and respond with a status code and message
app.use(express.json())
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        next()
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})
app.use('/users', clientrouter)
app.use('/car', validations_middleware.validateUser, carrouter)

app.listen({ port: PORT }, () => {
    connect()
    console.log(`🚀 Server is Ready at ${PORT}`)
})



