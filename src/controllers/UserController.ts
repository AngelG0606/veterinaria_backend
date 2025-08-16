import type { Request, Response } from "express"
import User from "../models/User"
import { checkHashPassword, hashPassword } from "../utils/password"
import { generateJWT } from "../utils/jwt"

export class UserController {

    static createAccount = async (req: Request, res: Response) => {
        const { email , password}  = req.body
        const userExist = await User.findOne({where : {email}})
        if(userExist) {
            const error = new Error('Usuario ya registrado')
            res.status(404).json({error : error.message})
            return
        }
        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)

            await user.save()

            res.send('Cuenta creada correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

    static login = async(req : Request, res : Response) => {
        try {
            const user = await User.findOne({where : {email : req.body.email }})
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(403).json({error : error.message})
                return
            }

            const isPasswordCorrect = await checkHashPassword(req.body.password, user.password)
            if(!isPasswordCorrect) {
                const error = new Error('Password incorrecto')
                res.status(409).json({error : error.message})
                return
            }
            const jwt = await generateJWT(user.id)
            res.send(jwt)


        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updateProfile = async(req : Request, res : Response ) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static changePassword = async(req : Request, res : Response) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static user = async(req : Request, res : Response) => {
        res.json(req.user)
    }

    static createVet = async (req : Request, res : Response) => {
        const { email , password}  = req.body
        const vetExists = await User.findOne({where : {email}})
        if(vetExists) {
            const error = new Error('Veterinario ya registrado')
            res.status(404).json({error : error.message})
            return
        }

        try {
            const user = new User(req.body)
            user.password = await hashPassword(password)
            user.rol = "veterinario"
            await user.save()

            res.send('Cuenta de veterinario creada correctamente');
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Hubo un error' });
        }
    }

}