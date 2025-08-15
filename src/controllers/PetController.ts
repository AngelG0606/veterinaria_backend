import type { Request, Response } from 'express'
import Pet from '../models/Pet'

export class PetController {

    static createPet = async (req : Request, res : Response) => {
        try {
            const pet = new Pet(req.body)
            pet.userId = req.user.id
            await pet.save()
            res.send('Mascota creada correctamente')         
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getPets = async(req : Request, res : Response) => {
        try {
            const pets = await Pet.findAll({
                where : {
                    userId : req.user.id
                }
            })

            res.json(pets)
        } catch (error) {
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getPetById = async(req : Request, res : Response) => {
        const { petId } = req.params
        try {
            const pet = await Pet.findByPk(petId)
            if(!pet) {
                const error = new Error('Mascota no encontrada')
                res.status(401).json({error : error.message})
                return
            }
            
            if(pet.userId !== Number(req.user.id)) {
                const error = new Error('Accion no válida')
                res.status(403).json({error : error.message})
                return
            }
            await pet.destroy()
            res.send('Mascota Eliminada correctamente')
        } catch (error) {
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updatePet = async (req : Request, res : Response) => {
        try {
            const { petId } = req.params

            const pet = await Pet.findByPk(petId)
            if(!pet) {
                const error = new Error('Mascota no encontrada')
                res.status(401).json({error : error.message})
                return
            }
            
            if(pet.userId !== Number(req.user.id)) {
                const error = new Error('Accion no válida')
                res.status(403).json({error : error.message})
                return
            }

            await pet.update(req.body)
            await pet.save()
        } catch (error) {
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static deletePet = async(req : Request, res : Response) => {
        try {
            const { petId } = req.params
            const pet = await Pet.findByPk(petId)

            if(!pet) {
                const error = new Error('Mascota no encontrada')
                res.status(401).json({error : error.message})
                return
            }
            if(pet.userId !== req.user.id) {
                const error = new Error('Accion no válida')
                res.status(403).json({error : error.message})
                return
            }
            res.send('Mascota eliminada correctamente')
        } catch (error) {
            res.status(500).json({error : 'Hubo un error'})
        }
    }
}