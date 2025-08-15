import express from 'express'
import morgan from 'morgan'
import colors from 'colors'
import { db } from './config/db'
import authRouter from './routes/authRouter'
import petRouter from './routes/petRouter'

async function connectDB () {
    try {
        await db.authenticate()
        db.sync()
        console.log(colors.green.bold("Conexion exitosa a la base de datos"))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("Hubo un error al conectarse a la base de datos"))
    }
}
connectDB()

const app = express()


app.use(morgan('dev'))
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/vet', petRouter)

export default app