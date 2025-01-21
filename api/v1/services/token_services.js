import emailVerificationToken from '../models/email_verification_token_model.js'

const createToken = async (user_id, email) => {
    const expires = new Date(Date.now() + 10 * 60 * 1000)
    const tokenCode = Math.floor(100000 + Math.random() * 900000).toString()

    try {
        const token = await emailVerificationToken.create({ user_id, email, token: tokenCode, expires: expires })
        return [tokenCode, null]
    } catch (error) {
        console.log("TOKEN SERVICE")
        console.log(error)
        return [null, 500]
    }
}

const verifyToken = async (token) => {
    const tokenData = await emailVerificationToken.findOne({ token: token })

    if (!tokenData) {
        return [null, 404]
    } else {
        return [tokenData, null]
    }
}

const deleteToken = async (token) => {
    await emailVerificationToken.deleteMany({ token: token })
}

export { createToken, verifyToken, deleteToken }