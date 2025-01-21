// Services
import { findUserById, findUserPFP, generateQRCODE, updateUser, createUser } from "../services/user_services.js";
import { createUpdateRequest, findUpdateRequestById, acceptUpdateRequest, denyUpdateRequest } from "../services/update_request_services.js";

//Utils
import sendMail from "../utils/Emails.js";
import ApiResponse from '../utils/ApiResponse.js'
import { minuteDiff } from "../utils/Horarios.js"
import { cripografarSenhaUsuario } from "../utils/Criptografar.js";

const registrarAluno = async (req, res) => {
    // Validando os dados do body
    const usuario = cripografarSenhaUsuario(req.body)

    usuario.id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    usuario.senha_foi_alterada = false // O usuário acabou de ser criado, portanto está com a senha padrão
    usuario.email = ``
    usuario.cargo = "aluno"

    try {
        const novoAluno = await createUser(usuario)
        return ApiResponse.CREATED(res, { id_aluno: novoAluno.id }, `Aluno ${novoAluno.nome} criado com sucesso!`)
    } catch (error) {
        // return res.status(500).json(error.code)
        if (error.code === 11000) {
            // Há uma tentativa de ou criar uma conta com o mesmo Rg, Id, email, ou matricula que outra já existente.
            return ApiResponse.ERROR(res, `Já há um usuário com esses dados.`, error)
        }
    }
}

export { registrarAluno }