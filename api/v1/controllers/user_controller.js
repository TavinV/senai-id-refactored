// Services
import { findUserById, findUserPFP, generateQRCODE, updateUser } from "../services/user_services.js";
import { createToken, verifyToken, deleteToken } from "../services/token_services.js";
import { createUpdateRequest, findUpdateRequestById, acceptUpdateRequest, denyUpdateRequest } from "../services/update_request_services.js";

//Utils
import sendMail from "../utils/Emails.js";
import ApiResponse from '../utils/ApiResponse.js'
import { minuteDiff } from "../utils/Horarios.js";

// Email Templates
import { email_verification_token_template } from "../templates/email_verification_token_template.js";
import { update_request_email_template } from "../templates/update_request_pending_template.js"


// GET api/v1/users/:id
const getUser = async (req, res) => {
    const id = req.params.id

    const [user, error] = await findUserById(id)

    if (!user && error != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.

        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (error == 404) {
        // Usuário não encontrado.

        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    // Retornando o usuário
    return ApiResponse.OK(res, user)
}


// GET api/v1/users/:id/foto-perfil
const getFotoPerfil = async (req, res) => {
    const id = req.params.id

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    // Após buscar o usuário, vamos encontrar a sua foto de perfil
    const userPrimaryKey = (user.cargo == "aluno") ? user.matricula : user.nif

    const [filePath, error] = await findUserPFP(userPrimaryKey)
    if (!filePath) {
        return ApiResponse.NOTFOUND(res, "Foto de perfil não encontrada.")
    } else {
        return res.sendFile(filePath)
    }
}


// GET api/v1/users/:id/primeiro-acesso
const primeiroAcesso = async (req, res) => {
    const id = req.params.id

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    return ApiResponse.OK(res, {
        nome: user.nome,
        login: user.login,
        senha: user.senha_padrao,
        rg: user.rg
    })
}


// GET api/v1/users/me/acesso
const acesso = async (req, res) => {
    const id = req.decoded.id
    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    const qrCodeURL = generateQRCODE(user)
    return ApiResponse.OK(res, { url: qrCodeURL })
}


// POST api/v1/users/:id/verify-email/request-token
const pedirToken = async (req, res) => {
    const id = req.params.id
    const { email } = req.body

    if (!id) {
        return ApiResponse.BADREQUEST(res, "ID do usuário não foi fornecido")
    }
    if (!email) {
        return ApiResponse.BADREQUEST(res, "Email não foi fornecido")
    }

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    // Criando o código de verificação

    const [token, createTokenError] = await createToken(user.id, email)

    if (createTokenError) {
        return ApiResponse.ERROR(res, `Erro ao criar Código de verificação: ${createTokenError}`)
    }

    // Enviando o código por email

    const emailHtml = email_verification_token_template(email, token)
    const [info, sendEmailError] = await sendMail(email, `Seu código de verificação é: ${token}`, emailHtml)

    if (!sendEmailError) {
        return ApiResponse.OK(res, null, "Código de verificação enviado com sucesso.")
    } else {
        return ApiResponse.ERROR(res, `Erro ao enviar email: ${sendEmailError}`)
    }

}


// POST api/v1/users/:id/verify-email/validate-token
const validarToken = async (req, res) => {
    const id = req.params.id
    const { token } = req.body

    if (!token) {
        return ApiResponse.BADREQUEST(res, "Código de verificação não foi fornecido")
    }

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    const [tokenData, findTokenError] = await verifyToken(token)

    if (!tokenData) {
        return ApiResponse.UNAUTHORIZED(res, "Código de verificação inválido")
    }

    const time_diff = minuteDiff(new Date(), tokenData.expires)

    if (time_diff > 10) {
        deleteToken(tokenData.token)
        return ApiResponse.UNAUTHORIZED(res, "Código de verificação expirado")
    }

    const email = tokenData.email
    const [sucess, updateError] = await updateUser(id, { email: email })

    if (updateError) {
        return ApiResponse.ERROR(res, `Erro ao atualizar o usuário: ${updateError}`)
    }

    deleteToken(tokenData.token)
    return ApiResponse.OK(res, null, "Email verificado com sucesso.")

}


// POST api/v1/users/:id/request-update
const pedirUpdate = async (req, res) => {
    const id = req.params.id

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.
        return ApiResponse.ERROR(res, `Erro interno do servidor. ${error}`)
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    const email = user.email
    const { tel, message } = req.body

    if (!tel) {
        return ApiResponse.BADREQUEST(res, "Telefone não informado.")
    }
    if (!message) {
        return ApiResponse.BADREQUEST(res, "Mensagem não informada.")
    }

    const [updateRequest, generateUpdateRequestError] = await createUpdateRequest(user.id, tel, message)

    if (generateUpdateRequestError) {
        return ApiResponse.ERROR(res, `Erro ao gerar pedido de atualização: ${generateUpdateRequestError}`)
    }

    const updateRequestId = updateRequest.request_id
    const updateRequestMessage = updateRequest.message

    // Enviando a confirmação por email

    const emailHtml = update_request_email_template(updateRequestId, updateRequestMessage, user.nome)
    const [info, sendEmailError] = await sendMail(email, `Seu pedido de correção de dados está em análise`, emailHtml)

    if (!sendEmailError) {
        return ApiResponse.OK(res, null, "Pedido de verificação criado com sucesso")
    } else {
        return ApiResponse.ERROR(res, `Erro ao enviar email: ${sendEmailError}`)
    }

}


export { getUser, getFotoPerfil, primeiroAcesso, acesso, pedirToken, validarToken, pedirUpdate }