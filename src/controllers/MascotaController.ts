import {Request, Response} from 'express'
import Mascota from '../models/Mascota'
import User from '../models/User'


export class MascotaController {

    static createPet = async (req : Request, res : Response) => {
        try {

            const {userId} = req.params
            const user = await User.findByPk(userId)
            if(!user) {
                const error = new Error('Usuario no encontrado')
                res.status(403).json({error :  error.message})
                return
            }

            const mascota = new Mascota(req.body)
            mascota.userId = req.user.id
            await mascota.save()
            res.status(201).json('Mascota agregada correctamente');
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getPets = async (req : Request, res : Response) => {
        const mascotas = await Mascota.findAll({
            where : {
                userId : req.user.id
            }
        })
        res.json(mascotas)
    }

    static getPetById = async (req : Request, res : Response) => {
        try {
            const { petId } = req.params
            const mascota = await Mascota.findByPk(petId)
            if(!mascota || mascota.userId !== req.user.id) {
                const error = new Error('Mascota no encontrada')
                res.status(403).json({error : error.message})
                return
            }
            res.json(mascota)

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updatePet = async (req : Request, res : Response) => {
        try {
            const { petId } = req.params
            const mascota = await Mascota.findByPk(petId)
            if(!mascota || mascota.userId !== req.user.id) {
                const error = new Error('Mascota no encontrada')
                res.status(403).json({error : error.message})
                return
            }
            mascota.update(req.body)
            res.json({message : 'Información actualizada correctamente'})

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static deletePet = async (req : Request, res : Response) => {
        try {
            const { petId } = req.params
            const mascota = await Mascota.findByPk(petId)
            if(!mascota || mascota.userId !== req.user.id) {
                const error = new Error('Mascota no encontrada')
                res.status(403).json({error : error.message})
                return
            }
            mascota.destroy()
            res.json({message : 'Mascota eliminada correctamente'})
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

}