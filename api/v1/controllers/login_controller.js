import { validateUserLogin } from '../services/user_services.js'
import { signJwt } from '../auth/JWT_services.js'
import ApiResponse from '../utils/ApiResponse.js'

// POST /api/v1/login
const loginUser = async (req, res) => {
    const { login, senha } = req.body
    const [user, error] = await validateUserLogin(login, senha)

    if (!user && error == 404) {
        // Login incorreto
        return ApiResponse.NOTFOUND(res, "Login incorreto.")
    } else if (!user && error == 401) {
        // Senha incorreta
        return ApiResponse.UNAUTHORIZED(res, "Senha incorreta.")
    }

    const token = signJwt(user)

    return ApiResponse.OK(res, { token, user })

}

export { loginUser }