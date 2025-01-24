// Services
import { findUserById, updateUser, createUser, deleteUser, findUserPFP } from "../services/user_services.js";
import { createUpdateRequest, findUpdateRequestById, acceptUpdateRequest, denyUpdateRequest } from "../services/update_request_services.js";

//Utils
import sendMail from "../utils/Emails.js";
import ApiResponse from '../utils/ApiResponse.js'
import { minuteDiff } from "../utils/Horarios.js"
import { cripografarSenhaUsuario } from "../utils/Criptografar.js";

import fs from 'fs'

const registrarAluno = async (req, res) => {
    let usuario = req.body

    usuario.id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    usuario.senha_foi_alterada = false // O usuário acabou de ser criado, portanto está com a senha padrão
    usuario.email = ``
    usuario.cargo = "aluno"

    usuario = cripografarSenhaUsuario(req.body)

    try {
        const [novoAluno, error] = await createUser(usuario)
        if (error == 409) {
            return ApiResponse.ALREADYEXISTS(res, "Este aluno já está cadastrado!")
        } else if (error == 500) {
            return ApiResponse.ERROR(res, "Erro ao cadastrar o aluno")
        }

        return ApiResponse.CREATED(res, { id_aluno: novoAluno.id }, `Aluno ${novoAluno.nome} criado com sucesso!`)
    } catch (error) {
        return ApiResponse.ERROR(res, "Erro ao cadastrar o funcionario", error)
    }
}

const registrarFuncionario = async (req, res) => {
    let usuario = req.body

    usuario.cargo = "funcionario"
    usuario.senha_foi_alterada = true
    usuario.id = Math.random().toString(36).substring(2) + Date.now().toString()

    usuario = cripografarSenhaUsuario(req.body)

    try {
        const [novoFuncionario, error] = await createUser(usuario)
        if (error == 409) {
            return ApiResponse.ALREADYEXISTS(res, "Este funcionário já está cadastrado!")
        } else if (error == 500) {
            return ApiResponse.ERROR(res, "Erro ao cadastrar o funcionário")
        }

        return ApiResponse.CREATED(res, { id_aluno: novoFuncionario.id }, `${novoFuncionario.descricao} ${novoFuncionario.nome} criado com sucesso!`)
    } catch (error) {
        return ApiResponse.ERROR(res, "Erro ao cadastrar o funcionario", error)
    }

}

const deletarUsuario = async (req, res) => {
    const id = req.params.id
    const nome = req.body.nome

    if (!nome) {
        return ApiResponse.BADREQUEST(res, "O nome do usuário é obrigatório")
    }

    const [user, findUserError] = await findUserById(id)

    if (!user && findUserError != 404) {
        // Erro interno do servidor, algum problema com o banco de dados.

        return ApiResponse.ERROR(res, `Erro interno do servidor.`, { "error": findUserError })
    } else if (findUserError == 404) {
        // Usuário não encontrado.
        return ApiResponse.NOTFOUND(res, "Usuário não foi encontrado.")
    }

    if (nome !== user.nome) {
        return ApiResponse.BADREQUEST(res, "O nome do usuário não corresponde ao nome do usuário encontrado.")
    }
    const [deletado, error] = await deleteUser(id)

    if (error) {
        return ApiResponse.ERROR(res, "Erro ao deletar o usuário")
    } else {

        const [filePath, findPfpError] = await findUserPFP(user)
        if (filePath) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log("SECRETARIA CONTROLLER")
                    console.error(err)
                }
            })
        }

        return ApiResponse.DELETED(res, "Usuário deletado com sucesso!")
    }

}

export { registrarAluno, registrarFuncionario, deletarUsuario }