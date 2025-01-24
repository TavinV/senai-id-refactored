import User from '../models/user_model.js'
import { criarHash } from '../utils/Criptografar.js'

import path from "path"
import { fileURLToPath } from 'url';
import fs from 'fs'

// Para utilizar o __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const findUserById = async (id) => {
    try {
        const user_found = await User.findOne({ id: id }); // Busca pelo campo id
        if (!user_found) {
            return [null, 404];
        }
        return [user_found, null];
    } catch (error) {
        return [null, error];
    }
};


const validateUserLogin = async (loginFornecido, senha) => {
    try {
        const alunoComLogin = await User.findOne({ login: loginFornecido });
        if (alunoComLogin) {
            const senhaCriptografada = criarHash(senha, alunoComLogin.salt)

            if (senhaCriptografada === alunoComLogin.senha) {
                return [alunoComLogin, null]
            }
            return [null, 401]
        }
        return [null, 404]

    } catch (error) {
        return [null, error]
    }
}

const findUserPFP = async (user) => {
    // Diretório aonde estão as fotos de perfil

    let filename = ''

    switch (user.cargo) {
        case "aluno":
            filename = user.matricula
            break
        case "funcionario":
            filename = user.nif
            break
    }

    const basePath = path.join(__dirname, '../../../db/fotos_perfil/')
    const filePath = path.join(basePath, `${filename}_pfp.png`)

    // Verificando se o arquivo nomeArquivo existe
    if (fs.existsSync(filePath)) {
        return [filePath, null]
    } else {
        return [null, 404]
    }
}

const generateQRCODE = (user) => {
    let accessKey = ""

    switch (user.cargo) {
        case "aluno":
            accessKey = user.matricula.toString().padStart(20, '0');
            break;
        case "funcionario":
            accessKey = user.nif.toString().padStart(20, '0');
            break;

    }

    return `https://api.qrserver.com/v1/create-qr-code/?data=${accessKey}&amp;size=100x100`
}

const updateUser = async (user_id, data) => {
    const user_found = await User.findOne({ id: user_id }); // Busca pelo campo id

    if (!user_found) {
        return [null, 404];
    }
    try {
        const result = await User.findOneAndUpdate({ id: user_id }, data)

        return [true, null]
    } catch (error) {
        return [false, 500]
    }
}

const createUser = async (user) => {
    try {
        const result = await User.create(user)
        return [result, null]
    } catch (error) {

        if (error.code === 11000) {
            return [null, 409]
        } else {
            return [null, 500]
        }
    }

}

const deleteUser = async (user_id) => {
    try {
        const result = await User.deleteOne({ id: user_id })
        return [result, null]
    } catch (error) {
        return [null, 500]
    }
}


export { findUserById, validateUserLogin, findUserPFP, generateQRCODE, updateUser, createUser, deleteUser }