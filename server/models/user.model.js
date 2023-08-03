import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        firName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            require: true,
            min: 2,
            max: 50,
        },
        picture: {
            type: String,
            default: "",
        },
        friend: {
            type: Array,
            default: [],
        },
        location: String,
        occupation: String,
        viewedProfile: Number,
        impressions: Number,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Users", userSchema);