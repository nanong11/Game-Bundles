const mongoose = require(`mongoose`)

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, `First name is required.`],
        minLength: 3,
    },
    lastName: {
        type: String,
        required: [true, `Last name is required.`],
        minLength: 3,
    },
    email: {
        type: String,
        required: [true, `Email is required.`],
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, `Password is required.`]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    gameBundles: []
}, {timestamps: true})

module.exports = mongoose.model(`User`, userSchema)