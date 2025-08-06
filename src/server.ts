import express from 'express'
import morgan from 'morgan'
import { db } from './config/db'
import colors from  'colors'
import authRouter from './routes/authRouter'
import vetRouter from './routes/vetRouter'
import cors from 'cors'
import { corsConfig } from './config/cors'
import dotenv from 'dotenv'

dotenv.config()

async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.blue.bold('CONEXION EXITOSA A LA BASE DE DATOS')) 
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold('CONEXION FALLIDA A LA BASE DE DATOS'))
    }
}

connectDB()

const app = express()

app.use(cors(corsConfig))

app.use(morgan('dev'))

app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/vet', vetRouter)

export default app
