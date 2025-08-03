import { json, Request, response, Response } from 'express'
import Cita from '../models/Citas'
import User from '../models/User'
import Veterinario from '../models/Veterinario'
import Mascota from '../models/Mascota'

export class CitaController {

    static getCitas = async (req : Request, res : Response) => {
        try {
            const user = await User.findByPk(req.user.id)
            if(!user || user.id !== req.user.id) {
                const error = new Error('Usuario no encontrado')
            }
            const citas = await Cita.findAll({
                where : {
                    userId : req.user.id
                }
            })
            res.json(citas)
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static getCitaById = async (req : Request, res : Response) => {
        try {
            const { citaId} = req.params
            const user = await User.findByPk(req.user.id)
            if(!user || user.id !== req.user.id) {
                const error = new Error('Usuario no encontrado')
                res.status(403).json({error : error.message})
                return
            }

            const cita = await Cita.findByPk(citaId)
            if(!cita) {
                const error = new Error('Cita no encontrada')
                res.status(409).json({error : error.message})
                return
            }

            res.status(201).json(cita)

        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static createCita = async (req: Request, res: Response) => {
        try {
            const { userId, veterinarioId, mascotaId } = req.params;

            // Validar usuario
            const user = await User.findByPk(userId);
            if (!user || user.id !== req.user.id) {
                return res.status(403).json({ error: 'Usuario no autorizado' });
            }

            // Validar veterinario
            const veterinario = await Veterinario.findByPk(veterinarioId);
            if (!veterinario) {
                return res.status(404).json({ error: 'Veterinario no encontrado' });
            }

            // Validar mascota
            const mascota = await Mascota.findByPk(mascotaId);
            if (!mascota) {
                return res.status(404).json({ error: 'Mascota no encontrada' });
            }
            if (mascota.userId !== req.user.id) {
                return res.status(403).json({ error: 'No tienes permiso sobre esta mascota' });
            }

            // Crear cita
            const cita = new Cita(req.body);
            cita.userId = req.user.id;
            cita.veterinarioId = veterinario.id;
            cita.mascotaId = mascota.id;

            await cita.save();
            res.status(201).json({ message: 'Cita creada correctamente' });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Hubo un error en el servidor' });
        }
    }


    static updateCita = async ( req : Request, res : Response) => {
        try {
            
        } catch (error) {
            
        }
    }

    static deleteCita = async (req : Request, res : Response) => {
        try {

            const {citaId} = req.params
            const cita = await Cita.findByPk(citaId)

            if(!cita || cita.userId !== req.user.id) {
                const error = new Error('Acción no válida')
                res.status(500).json({error : error.message})
                return
            }
            await cita.destroy()
            res.json({message : 'Cita eliminada correctamente'})
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    } 

    static cancelCita = async (req : Request, res: Response) => {

    }

}