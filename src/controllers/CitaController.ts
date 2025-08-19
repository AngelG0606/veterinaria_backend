import type { Request, Response } from "express";
import { format } from 'date-fns'
import Cita from "../models/Cita";
import User from "../models/User";
import Pet from "../models/Pet";

export class CitaController {

    static createCita = async (req : Request, res : Response) => {
        const { petId, veterinarioId } = req.params
        const {fecha, hora} = req.body
        try {
            const dateFormat = format(new Date(fecha), 'yyyy-MM-dd')
            const timeFormat = format(new Date(`1970-01-01T${hora}`), "HH:mm:ss");

            const veterinario = await User.findByPk(veterinarioId)
            if(!veterinario || veterinario.rol !== "veterinario") {
                const error = new Error('Veterinario no encontrado')
                res.status(404).json({error : error.message})
                return
            }

            const pet = await Pet.findByPk(petId)

            if(!pet || pet.userId !== req.user.id) {
                const error = new Error('Mascota no encontrada')
                res.status(404).json({error : error.message})
                return
            }

            const cita = await Cita.create({
                fecha : dateFormat,
                hora : timeFormat,
                userId : req.user.id,
                veterinarioId : veterinario.id,
                petId : pet.id
            })
            res.send('Cita creada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static accepCita = async(req : Request, res : Response) => {
        try {
            const { citaId } = req.params
            const cita = await Cita.findByPk(citaId)
            if(!cita) {
                const error = new Error('Cita no encontrada')
                res.status(404).json({error : error.message})
                return
            }
            cita.status = true
            await cita.save()
            res.send('Cita aceptada correctamente')
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updateCita = async (req : Request, res : Response) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static deleteCita = async (req :Request, res : Response) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static cancelCita = async (req : Request, res : Response) => {
        try {
            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

}