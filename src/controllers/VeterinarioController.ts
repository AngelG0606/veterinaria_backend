import { Request, Response } from 'express'
import Veterinario from '../models/Veterinario'
import { comparePassword, hashPassword } from '../utils/hashPassword'
import { generateToken } from '../utils/jwt'


export class VeterinarioController {

    static createVetAccount = async (req : Request, res : Response) => {

        const { email} = req.body

        const vetExist = await Veterinario.findOne({where : {email} })

        if(vetExist) {
            const error = new Error('Veterinario ya registrado') 
            res.status(409).json({error : error.message})
            return
        }

        try {

            const vet = new Veterinario(req.body)
            vet.password = await hashPassword(req.body.password)

            vet.save()
            res.json('Veterinario creado correctamente')
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'}) 
        }
    }

    static loginVet = async (req : Request, res : Response) => {
        try {
            const {email, password} = req.body

            const vet = await Veterinario.findOne({where : {email}})

            if(!vet) {
                const error = new Error('Veterinario no encontrado')
                res.status(403).json({error : error.message})
                return
            }

            const isPasswordCorrect = await comparePassword(password, vet.password)

            if(!isPasswordCorrect) {
                const error = new Error('Password incorrecto')
                res.status(401).json({error : error.message})
                return
            }
            const jwtToken = await generateToken(vet.id)
            res.send(jwtToken);

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getAll = async(req : Request, res : Response)  => {
        try {
            const veterinarios = await Veterinario.findAll({
                order : [
                    ['createdAt', 'DESC']
                ]
            })
            res.json(veterinarios)

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getById = async (req : Request, res : Response) => {
        try {
            const {veterinarioId} = req.params
            const veterinario = await Veterinario.findByPk(veterinarioId)

            if(!veterinario) {
                const error = new Error('Veterinario no encontrado')
                res.status(409).json({error : error.message})
                return
            }
            res.json(veterinario)
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updateVeterinario  = async (req : Request, res : Response) => {
        try {
            const { veterinarioId} = req.params
            const veterinario = await Veterinario.findByPk(veterinarioId)
            if(!veterinario) {
                const error = new Error('Veterinario no encontrado')
                res.status(409).json({error : error.message})
                return
            }

            await veterinario.update(req.body)
            res.json('Información Actualizada Correctamente')
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static deleteVeterinario = async (req : Request, res : Response) => {
        try {
            const { veterinarioId } = req.params
            const veterinario = await Veterinario.findByPk(veterinarioId)
            if(!veterinario) {
                const error = new Error('Veterinario no encontrado')
                res.status(409).json({error : error.message})
                return
            }
           await veterinario.destroy()
            res.status(201).json('Eliminado Correctamente')
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getVeterinario = async (req : Request, res :  Response) =>{
        console.log(req.vet)
        res.json(req.vet)
    }

    
    static updatePassword = async (req : Request, res : Response) => {
        try {
            const veterinario = await Veterinario.findByPk(req.vet.id)
            
            if(!veterinario) {
                const error = new Error('Veterinario no encontrado')
                res.status(409).json({error : error.message})
                return
            }

            const {current_password, password} = req.body

            const isValidPassword = await comparePassword(current_password, veterinario.password)

            if(!isValidPassword) {
                const error = new Error('El password actual es incorrecto')
                res.status(403).json({error :  error.message})
                return
            }

            veterinario.password = await hashPassword(password)
            veterinario.save()
    
            res.json('Password actualizado correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

}