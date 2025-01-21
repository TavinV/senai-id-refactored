import mongoose from "mongoose";

const user_update_request_schema = new mongoose.Schema(
    {
        request_id: {
            type: String,
            required: true
        },
        user_id: {
            type: String,
            required: true
        },
        tel: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: "userUpdateRequests",
    }
)

const user_update_request_model = mongoose.model("UserUpdateRequest", user_update_request_schema);
export default user_update_request_model