import { Request, Response} from 'express'
import User from '../models/User'
import { hashPassword } from '../utils/hashPassword'

export class UserController {
    

    static createUser = async (req : Request, res : Response) => {
        const {email } = req.body
        const userExist = User.findOne({
            where : email
        })
        if(userExist) {
            const error = new Error('Usuario ya existente')
            res.status(403).json({error : error.message})
            return
        }
        
        try {
            
            const user = new User(req.body)
            user.password = await hashPassword(req.body.password)


            await user.save()

            res.json('Usuario Creado Correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static login = async (req : Request, res : Response) => {
        try {
            const {email, password} = req.body

            const user = await User.findOne({where : {email} })

            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(404).json({error : error.message})
                return
            }

            const isPasswordCorrect = 

            


        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }


    }





}