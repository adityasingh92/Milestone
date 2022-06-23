import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 255
    },
    email: {
        type: String, 
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String, 
        required: true,
        max: 1024,
        min: 8
    },
    createdDate: {
        type: Date,
        default: new Date()
    }
});

export const User = mongoose.model('User', UserSchema);