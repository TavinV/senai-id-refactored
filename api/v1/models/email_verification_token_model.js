import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema(
    {
        user_id: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        },
        expires: {
            type: Date,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    {
        collection: "emailTokens"
    }
)

const emailVerificationToken = mongoose.model("EmailVerificationToken", tokenSchema)

export default emailVerificationToken