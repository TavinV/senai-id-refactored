import user_update_request_model from "../models/user_update_request_model.js"

const createUpdateRequest = async (user_id, tel, message) => {
    const request_id = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)).join('')

    try {
        const updateRequest = await user_update_request_model.create({ request_id, user_id, tel, message, status: "Em análise" })
        return [updateRequest, null]
    } catch (error) {
        return [null, 500]

    }
}

const findUpdateRequestById = async (request_id) => {
    try {
        const updateRequest = await user_update_request_model.findOne({ user_id: request_id })

        if (!updateRequest) {
            return [null, 404]
        }

        return [updateRequest, null]
    } catch (error) {
        return [null, 500]
    }

}

const acceptUpdateRequest = async (request_id) => {
    try {
        const result = await user_update_request_model.findOneAndUpdate({ request_id: request_id }, { status: "Aprovado" })

        if (!result) {
            return [null, 404]
        }

        user_update_request_model.deleteMany({ request_id: request_id })
        return [result, null]
    } catch (error) {
        return [null, 500]
    }
}

const denyUpdateRequest = async (request_id) => {
    try {
        const result = await user_update_request_model.findOneAndUpdate({ request_id: request_id }, { status: "Rejeitado" })

        if (!result) {
            return [null, 404]
        }

        user_update_request_model.deleteMany({ request_id: request_id })
        return [result, null]
    } catch (error) {
        return [null, 500]
    }
}

export { createUpdateRequest, findUpdateRequestById, acceptUpdateRequest, denyUpdateRequest }