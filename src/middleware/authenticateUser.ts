import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { Request, Response , NextFunction} from 'express'
import User from '../models/User'

dotenv.config()

declare global {
    namespace Express {
        interface Request {
            user? : User
        }
    }
}

export const authenticateUser = async (req : Request, res :  Response, next : NextFunction) => {

    const bearer = req.headers.authorization

    if(!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({error :  error.message})
        return
    }

    const [, token] = bearer.split(' ')

    if(!token) {
        const error = new Error('Token no válido')
        res.status(401).json({error : error.message})
        return
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(typeof decoded === 'object' && decoded.id) {
        const user = await User.findByPk(decoded.id, {
            attributes : ['id', 'name', 'lastname', 'email']
        })
        req.user = user
        next()
    }

}
