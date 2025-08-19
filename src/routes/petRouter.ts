import { body, param } from 'express-validator'
import { Router } from 'express'
import { PetController } from '../controllers/PetController'
import { authenticate } from '../middleware/authenticate'
import { handleInputErrors } from '../middleware/validation'
import { CitaController } from '../controllers/CitaController'

const router = Router()

router.post('/pets',
    authenticate,
    body("name").notEmpty().withMessage('El nombre de la mascota es obligatorio'),
    body("especie").notEmpty().withMessage('La especie de la mascota es obligatoria'),
    body("raza").notEmpty().withMessage('La raza de la mascota es obligatoria'),
    body("color").notEmpty().withMessage('El color de la mascota es obligatoria'),
    body("peso").notEmpty().withMessage('El peso de la mascota es obligatoria'),
    body("edad").notEmpty().withMessage('La edad de la mascota es obligatoria'),
    handleInputErrors,
    PetController.createPet
)

router.get('/pets',
    authenticate,
    PetController.getPets
)

router.get('/pets/:petId',
    param('petId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    authenticate,
    PetController.getPetById
)

router.put('/pets/:petId',
    authenticate,
    param('petId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    body("name").notEmpty().withMessage('El nombre de la mascota es obligatorio'),
    body("especie").notEmpty().withMessage('La especie de la mascota es obligatoria'),
    body("raza").notEmpty().withMessage('La raza de la mascota es obligatoria'),
    body("color").notEmpty().withMessage('El color de la mascota es obligatoria'),
    body("peso").notEmpty().withMessage('El peso de la mascota es obligatoria'),
    body("edad").notEmpty().withMessage('La edad de la mascota es obligatoria'),
    handleInputErrors,
    PetController.updatePet
)

router.delete('/pets/:petId',
    authenticate,
    param('petId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    handleInputErrors,
    PetController.deletePet
)


//Routes for citas
router.post('/pets/:petId/veterinarios/:veterinarioId/citas',
    authenticate,
    param('petId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    param('veterinarioId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    body('fecha').notEmpty().withMessage('La fecha es obligatoria'),
    body('hora').notEmpty().withMessage('La hora es obligatoria'),
    handleInputErrors,
    CitaController.createCita
)

router.post('/citas/:citaId',
    param('citaId').isInt().custom(value => value > 0).withMessage('ID No Válido'),
    handleInputErrors,
    CitaController.accepCita
)


export default router

