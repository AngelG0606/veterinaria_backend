import { Router } from 'express'
import { UserController } from '../controllers/UserController'
import {body, param} from 'express-validator'
import { handleInputErrors } from '../middleware/validation'
import { authenticateUser } from '../middleware/authenticateUser'
import { MascotaController } from '../controllers/MascotaController'
import { CitaController } from '../controllers/CitaController'

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

router.get('/users', 
    UserController.getAll
)

router.get('/user/:userId',
    param('userId').isInt().withMessage('ID no válido').custom(value  => value > 0).withMessage('ID no válido'),
    UserController.getById
)

router.get('/user',
    authenticateUser,
    UserController.user
)

router.put('/user/:userId',
    authenticateUser,
    body('name').notEmpty().withMessage('El Nombre del Usuario es obligatorio'),
    body('lastname').notEmpty().withMessage('Los Apellidos del Usuario es obligatorio'),
    body('telefono').notEmpty().withMessage('El Telefono del Usuario es obligatorio'),
    body('email').isEmail().withMessage('E-mail no válido'),
    handleInputErrors,
    UserController.editUser
)


//Routes for pets
router.post('/pets/:userId',
    authenticateUser,
    param('userId').isInt().withMessage('ID no válido').custom(value => value > 0 ).withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre de la mascota es obligatorio'), 
    body('especie').notEmpty().withMessage('La especie de la mascota es obligatorio'), 
    body('raza').notEmpty().withMessage('La raza de la mascota es obligatorio'), 
    body('color').notEmpty().withMessage('El color de la mascota es obligatorio'), 
    body('weight').notEmpty().withMessage('El peso de la mascota es obligatorio'),
    handleInputErrors,
    MascotaController.createPet
)

router.get('/pets',
    authenticateUser,
    MascotaController.getPets
)

router.get('/pets/:petId',
    authenticateUser,
    param('petId').isInt().withMessage('ID no válido').custom(value => value > 0 ).withMessage('ID no válido'),
    MascotaController.getPetById
)

router.put('/pets/:petId',
    authenticateUser,
    param('petId').isInt().withMessage('ID no válido').custom(value => value > 0 ).withMessage('ID no válido'),
    body('name').notEmpty().withMessage('El nombre de la mascota es obligatorio'), 
    body('especie').notEmpty().withMessage('La especie de la mascota es obligatorio'), 
    body('raza').notEmpty().withMessage('La raza de la mascota es obligatorio'), 
    body('color').notEmpty().withMessage('El color de la mascota es obligatorio'), 
    body('weight').notEmpty().withMessage('El peso de la mascota es obligatorio'),
    handleInputErrors,
    MascotaController.updatePet
)

router.delete('/pets/:petId',
    authenticateUser,
    param('petId').isInt().withMessage('ID no válido').custom(value => value > 0 ).withMessage('ID no válido'),
    MascotaController.deletePet
)


//Route for citas

router.get('/citas',
    CitaController.getCitas
)

router.get('/citas/:citaId', 
    CitaController.getCitaById
)

router.post('/citas', 
    CitaController.createCita
)

router.put('/citas/:citaId',
    CitaController.updateCita
)

router.delete('/citas/:citaId',
    CitaController.deleteCita
)

router.post('/citas/:citaId',
    CitaController.cancelCita
)

export default router