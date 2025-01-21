import express from 'express'
import validateSessionToken from '../middlewares/JWT_Auth.js'
import { getUser, getFotoPerfil, primeiroAcesso, acesso, pedirToken, validarToken, pedirUpdate } from '../controllers/user_controller.js'

const router = express.Router()

router.get('/:id', getUser)
router.get('/:id/profile-picture', getFotoPerfil)
router.get('/:id/first-access', primeiroAcesso)
router.get('/me/access', validateSessionToken(false), acesso)
router.post('/:id/verify-email/request-token', pedirToken)
router.post('/:id/verify-email/validate-token', validarToken)
router.post('/:id/request-update', pedirUpdate)

export default router