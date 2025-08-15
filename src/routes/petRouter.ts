import { body, param } from 'express-validator'
import { Router } from 'express'
import { PetController } from '../controllers/PetController'
import { authenticate } from '../middleware/authenticate'
import { handleInputErrors } from '../middleware/validation'

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


export default router

