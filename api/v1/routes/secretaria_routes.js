import express from 'express'
import validateSessionToken from '../middlewares/JWT_Auth.js'
import upload from '../middlewares/multer.js'
import { validarAluno, validarFuncionario } from '../middlewares/validatebody.js'

import { deletarUsuario, registrarAluno, registrarFuncionario } from '../controllers/secretaria_controller.js'

const router = express.Router()

router.post('/register/student', validateSessionToken(true), upload.single("foto_perfil"), validarAluno, registrarAluno)
router.post('/register/employee', validateSessionToken(true), upload.single("foto_perfil"), validarFuncionario, registrarFuncionario)

router.delete('/:id', validateSessionToken(true), deletarUsuario)

export default router