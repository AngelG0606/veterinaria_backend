import { Request, Response} from 'express'
import User from '../models/User'
import { comparePassword, hashPassword } from '../utils/hashPassword'
import { generateToken } from '../utils/jwt'

export class UserController {
    

    static createUser = async (req : Request, res : Response) => {
        const { email } = req.body
        const userExist = await User.findOne({
            where : {
                email
            }
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
                res.status(403).json({error : error.message})
                return
            }

            const isPasswordCorrect = await comparePassword(password, user.password)

            if(!isPasswordCorrect) {
                const error = new Error('Password Incorrect')
                res.status(401).json({error : error.message})
                return
            }
            const token = await generateToken(user.id)
            res.send(token)

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getAll = async (req : Request, res : Response) => {
        const users = await User.findAll()
        res.json(users)
    }

    static getById = async (req : Request, res : Response) => {
        try {
            const { userId } = req.params

            const user = await User.findByPk(userId)
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(401).json({error : error.message})
                return
            }
            res.json(user)

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static editUser = async (req : Request, res : Response) => {
        const {email } = req.body

        const userExist = await User.findOne({where : {email}})
        if(userExist && userExist.id !== req.user.id) {
            const error = new Error('Email ya registrado')
            res.status(409).json({error : error.message})
            return
        }

        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(401).json({error : error.message})
                return
            }

            user.update(req.body)
            res.status(201).json('Información actualizada correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static deleteUser = async (req :  Request, res : Response) => {
        try {
            const { userId } = req.params
            const user = await User.findByPk(userId)
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(401).json({error : error.message})
                return
            }

            user.destroy()
            res.status(201).json('Usuario Eliminado Correctamente')

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static user = async (req : Request, res : Response) => {
        res.json(req.user)
    }

    static updatePassword = async (req : Request, res : Response) => {
        try {
            const user = await User.findByPk(req.user.id)
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(401).json({error : error.message})
                return
            }
            const {} = req.body


        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }


}