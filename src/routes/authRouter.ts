import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware/validation'

const router = Router()

router.post('/create-account',
    body('name').notEmpty().withMessage('El Nombre del Usuario es obligatorio'),
    body('lastname').notEmpty().withMessage('Los Apellidos del Usuario es obligatorio'),
    body('telefono').notEmpty().withMessage('El Telefono del Usuario es obligatorio'),
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').isLength({min : 8}).withMessage('El Password es minimo de 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password) {
            throw new Error('Los Passwords no Coinciden')
        }
        return true
    }),
    handleInputErrors,
    UserController.createUser
)

router.post('/login',
    body('email').isEmail().withMessage('E-mail no válido'),
    body('password').notEmpty().withMessage('El Password del usuario es obligatorio'),
    handleInputErrors, 
    UserController.login
)

export default router