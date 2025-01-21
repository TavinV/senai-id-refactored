import express from 'express'
import validateSessionToken from '../middlewares/JWT_Auth.js'
import upload from '../middlewares/multer.js'
import { validarAluno, validarFuncionario } from '../middlewares/validatebody.js'

import { registrarAluno } from '../controllers/secretaria_controller.js'

const router = express.Router()

const test = (req, res, next) => {
    console.log(req.body)
    next()
}

router.post('/register/student', validateSessionToken(true), upload.single("foto_perfil"), validarAluno, registrarAluno)

export default router