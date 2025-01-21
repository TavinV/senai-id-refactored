import express from 'express'
const router = express.Router()

import validateSessionToken from '../middlewares/JWT_Auth.js'
import sendMail from '../utils/Emails.js'

import { updateUser } from '../services/user_services.js'

router.get('/auth/protected', validateSessionToken(true), (req, res) => {
    res.json({ message: 'You are authenticated!' })
})

router.get('/auth/unprotected', validateSessionToken(false), (req, res) => {
    res.json({ message: 'You are authenticated!' })
})

router.post('/email/send', async (req, res) => {
    const { to, subject } = req.body
    const html = `
        <h1>Email de teste!</h1>
    <hr>
    <p>Ola mundo!</p>

    `
    sendMail(to, subject, html).then(() => {
        return res.json({ message: 'Email sent successfully' })
    }).catch((error) => {
        return res.status(500).json({ message: 'Error sending email', error })
    })

})

router.put('/user/:id/email', async (req, res) => {
    const { id } = req.params
    const { email } = req.body

    if (!email) {
        return res.status(400).json({ message: 'Email is required' })
    }

    const [sucess, updateError] = await updateUser(id, { email: email })
    console.log(sucess)
    console.log(updateError)
    if (sucess) {
        return res.json({ message: 'User email updated successfully' })
    }
    return res.status(500).json({
        message: 'Error updating user email', error: updatError

    })
})
export default router