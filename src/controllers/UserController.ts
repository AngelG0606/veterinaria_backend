import type { Request, Response } from "express"
import User from "../models/User"
import { hashPassword } from "../utils/password"

export class UserController {

    static createAccount = async(req : Request, res : Response) => {
        const userExist = await User.findOne({
            where: { email: req.body.email }
        });

        if(userExist) {
            const error = new Error('Usuario ya registrado')
            res.status(404).json({error : error.message})
            return
        }
        try {
            const user = new User(req.body)
            user.password = await hashPassword(req.body.password)
            user.save()
            res.send('Cuenta creada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static login =async(req : Request, res : Response) => {
        try {
            const user = await User.findOne({where : {email : req.body.email }})
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(403).json({error : error.message})
                return
            }
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

}