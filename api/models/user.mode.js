import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        requried: true,
    }
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);

export default User;