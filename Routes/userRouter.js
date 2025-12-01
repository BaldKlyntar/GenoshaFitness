import { Router } from 'express'
import {
    getCurrentUser,
    updateUser
} from '../Controllers/userControllers.js'
import { validateUpdateUserInput } from '../Middleware/validationMiddleware.js'
import { deleteRoutine } from '../Controllers/routineControllers.js'

const router = Router()

router.get('/profile', getCurrentUser)
router.patch('/edit-profile', validateUpdateUserInput, updateUser)
router.post('/removeroutine/:id', deleteRoutine)

export default router