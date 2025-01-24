import Joi from 'joi';
import { alunoSchema, funcionarioSchema } from '../validation/user_schemas.js'
import ApiResponse from '../utils/ApiResponse.js'


// Middleware para validar o corpo da requisição
export const validarAluno = async (req, res, next) => {

    // Validando os outros dados do corpo com o alunoSchema
    const { error } = alunoSchema.validate(req.body, { abortEarly: false })

    if (error) {
        // Retorna os erros de validação em formato mais amigável
        const errorMessages = error.details.map(err => err.message)
        return ApiResponse.BADREQUEST(res, errorMessages)
    }

    // Se tudo estiver correto, passa para o próximo middleware
    next()

};

export const validarFuncionario = async (req, res, next) => {

    // Validando o corpo utilziando o JOI e a schema de funcionario
    const { error } = funcionarioSchema.validate(req.body, { abortEarly: false })

    if (error) {
        // Retorna os erros de validação em formato mais amigável
        const errorMessages = error.details.map(err => err.message)
        return ApiResponse.BADREQUEST(res, errorMessages)
    }

    // Se tudo estiver correto, passa para o próximo middleware
    next()
}