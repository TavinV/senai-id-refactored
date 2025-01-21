import jwt from "jsonwebtoken";
import { verifyJwt } from "../auth/JWT_services.js";
import ApiResponse from "../utils/ApiResponse.js";

// Middleware para verificar a validade de um Token JWT, e pode verificar permissões.
const validateSessionToken = (deveSerSecretaria = false) => (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return ApiResponse.BADREQUEST(res, "Token não fornecido.")
    }
    const token = authHeader.split(' ')[1]


    const [decoded, validationError] = verifyJwt(token)

    switch (validationError) {
        case 401:
            return ApiResponse.UNAUTHORIZED(res, "Token inválido.")
            break
        case 500:
            return ApiResponse.ERROR(res, "Erro ao verificar token.")
            break
        case null:
            const cargo = decoded.cargo

            if (deveSerSecretaria) {
                // Realizar a verificação de permissões

                if (cargo != "secretaria") {
                    return ApiResponse.FORBIDDEN(res)
                } else {
                    req.decoded = decoded
                    return next()
                }
            } else {

                req.decoded = decoded
                return next()
            }
    }

};

export default validateSessionToken;
