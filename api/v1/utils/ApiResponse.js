class ApiResponse {
    static OK(res, data = null, message = "Sucesso") {
        return res.status(200).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    static CREATED(res, data = null, message = "Recurso criado com sucesso") {
        return res.status(201).json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }


    static BADREQUEST(res, message = "Bad request", data = null) {
        return res.status(400).json({
            success: false,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    static NOTFOUND(res, message = "Recurso não encontrado", data = null) {
        console.log(data)
        return res.status(404).json({
            success: false,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    static ERROR(res, message = "Erro interno do servidor", data = null) {
        return res.status(500).json({
            success: false,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }

    static FORBIDDEN(res, message = "Acesso negado", data = null) {
        return res.status(403).json({
            success: false,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }
    static UNAUTHORIZED(res, message = "Credenciais Inválidas", data = null) {
        return res.status(403).json({
            success: false,
            message,
            data,
            timestamp: new Date().toISOString(),
        })
    }
}

export default ApiResponse
