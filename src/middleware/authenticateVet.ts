import { Request, Response, NextFunction } from "express"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import Veterinario from "../models/Veterinario"

dotenv.config()

declare global {
    namespace Express {
        interface Request {
            vet? : Veterinario
        }
    }
}

export const authenticateVet = async(req : Request, res: Response, next : NextFunction) => {
    const bearer = req.headers.authorization

    if(!bearer) {
        const error = new Error('No Autorizado')
        res.status(401).json({error : error.message})
        return
    }

    const [, token] = bearer.split(' ')

    if(!token) {
         const error = new Error('Token No Válido')
        res.status(401).json({error :  error.message})
        return
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(typeof decoded === 'object' && decoded.id) {
            const veterinario = await Veterinario.findByPk(decoded.id, {
                attributes : ['id', 'name', 'lastname', 'email']
            })
            req.vet = veterinario
            next()
        }


    } catch (error) {
        console.log(error)
        res.status(500).json({error : 'Token no válido'})
    }

}