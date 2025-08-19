import {  Router } from 'express'
import { UserController } from '../controllers/UserController'
import { body, param } from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { authenticate } from '../middleware/authenticate'


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

router.put('/update-profile/:userId',
    authenticate,
    body('email').isEmail().withMessage('Email no válido'),
    body('name').notEmpty().withMessage('El Nombre no puede ir vacío'),
     body('telefono').notEmpty().withMessage('El Télefono es obligatorio'),
     handleInputErrors,
    UserController.updateProfile
)



//Routes for vets
router.post('/create-vet',
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
    UserController.createVet
)

router.get('/vets',
    authenticate, 
    UserController.getVets
)

router.get('/user/:userId',
    authenticate,
    param('userId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    handleInputErrors, 
    UserController.getUserById
)

router.delete('/delete-vet/:vetId',
    authenticate,
    param('vetId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    handleInputErrors,
    UserController.deleteVet
)

router.get('/user',
    authenticate, 
    UserController.user
)


export default router