import type { Request, Response } from "express";
import { format } from 'date-fns'
import Cita from "../models/Cita";

export class CitaController {

    static createCita = async (req : Request, res : Response) => {
        const { petId, veterinarioId } = req.params
        const {fecha, hora} = req.body
        try {
            const dateFormat = format(new Date(fecha), 'yyyy-mm-dd')
            const timeFormat = format(new Date(`1970-01-01T${hora}`), "HH:mm:ss");

            console.log(dateFormat)
            console.log(timeFormat)

            
        } catch (error) {
            console.log(error)
            res.status(500).json({error : 'Hubo un error'})
        }
    }

    static updateCita = async (req : Request, res : Response) => {

    }

    static deleteCita = async (req :Request, res : Response) => {

    }

    static cancelCita = async (req : Request, res : Response) => {

    }

}