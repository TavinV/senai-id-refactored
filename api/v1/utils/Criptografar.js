import { createHash } from "crypto"

export function criarHash(conteudo, salt) {
    return createHash('sha256').update(`${conteudo};${salt}`).digest('base64')
}

export function criarSalt() {
    return Math.random().toString(36).substring(2, 18)
}

export function cripografarSenhaUsuario(usuario) {
    const senha = usuario.senha
    const salt = criarSalt()
    const senhaSegura = criarHash(senha, salt)

    usuario.senha = senhaSegura
    usuario.salt = salt
    if (usuario.cargo != 'funcionario') {
        usuario.senha_padrao = senha
    }

    return usuario
}
