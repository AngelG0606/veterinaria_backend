import express from 'express'
import morgan from 'morgan'
import colors from 'colors'

async function connectDB () {
    try {
        
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold("Hubo un error al conectarse a la base de datos"))
    }
}
connectDB()

const app = express()


app.use(morgan('dev'))
app.use(express.json())

export default app