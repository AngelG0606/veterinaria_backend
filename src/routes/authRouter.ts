import {  Router } from 'express'
import { UserController } from '../controllers/UserController'
import { body } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'


const router = Router()


router.post('/create-account',
    body('name').notEmpty().withMessage('El Nombre no puede ir vacío'),
    body('lastname').notEmpty().withMessage('El Apellido no puede ir vacío'),
    body('email').isEmail().withMessage('Email no válido'),
    body('password').isLength({min : 8}).withMessage('El password son minimo 8 caracteres'),
    body('password_confirmation').custom((value, {req}) => {
        if(value !== req.body.password){
            throw new Error('Los passwords no son iguales')
        }
        return true
    }),
    body('telefono').notEmpty().withMessage('El Télefono es obligatorio'),
    handleInputErrors,
    UserController.createAccount
)


router.post('/login',
    body('email').isEmail().withMessage('Email no válido'),
    body('password').notEmpty().withMessage('El password no puede ir vacío'),
    handleInputErrors,
    UserController.login
)

export default router