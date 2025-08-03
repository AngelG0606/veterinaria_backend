import { Router } from "express";
import { VeterinarioController } from "../controllers/VeterinarioController";
import { body, param} from 'express-validator'
import { handleInputErrors } from "../middleware/validation";
import { authenticateVet } from "../middleware/authenticateVet";

const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('El Nombre del veterinario es obligatorio'),
    body('lastname').notEmpty().withMessage('El Apellido del veterinario es obligatorio'),
    body('especialidad').notEmpty().withMessage('La Especialidad del veterinario es obligatorio'),
    body('rfc').notEmpty().withMessage('El RFC del veterinario es obligatorio'),
    body('telefono').notEmpty().withMessage('El Telefono del veterinario es obligatorio'),
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').isLength({min : 8}).withMessage('El Password es minimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Passwords no Coinciden')
        }
        return true
    }),
    handleInputErrors,
    VeterinarioController.createVetAccount
)

router.post('/login',
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').notEmpty().withMessage('El Password es obligatorio'),
    handleInputErrors, 
    VeterinarioController.loginVet
)

router.get('/veterinarios',
    authenticateVet, 
    VeterinarioController.getAll
)

router.get('/veterinarios/:veterinarioId',
    param('veterinarioId').isInt().withMessage('ID no Válido').custom(value => value > 0 ).withMessage('ID No Válido'),
    handleInputErrors,
    VeterinarioController.getById
)

router.put('/veterinarios/:veterinarioId',
    authenticateVet,
    body('name').notEmpty().withMessage('El Nombre del veterinario es obligatorio'),
    body('lastname').notEmpty().withMessage('El Apellido del veterinario es obligatorio'),
    body('especialidad').notEmpty().withMessage('La Especialidad del veterinario es obligatorio'),
    body('rfc').notEmpty().withMessage('El RFC del veterinario es obligatorio'),
    body('telefono').notEmpty().withMessage('El Telefono del veterinario es obligatorio'),
    handleInputErrors, 
    VeterinarioController.updateVeterinario
)

router.delete('/veterinarios/:veterinarioId/delete',
    authenticateVet, 
    param('veterinarioId').isInt().withMessage('ID no Válido').custom( value => value > 0).withMessage('ID no válido'),
    VeterinarioController.deleteVeterinario
)

router.post('/update-password',
    authenticateVet,
    body('current_password').notEmpty().withMessage('El Password Actual no puede ir vacío'),
    body('password').isLength({min : 8}).withMessage('El Password es minimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Passwords no Coinciden')
        }
        return true
    }),
    handleInputErrors,
    VeterinarioController.updatePassword
)

router.get('/veterinario',
    authenticateVet, 
    VeterinarioController.getVeterinario
)

export default router