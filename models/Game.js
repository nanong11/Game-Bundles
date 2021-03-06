const mongoose = require(`mongoose`)

const gameSchema = mongoose.Schema({
    gameName: {
        type: String,
        required: [true, `Name is required.`],
        unique: [true, `The Game Name must be unique.`]
    },
    description: {
        type: String,
        required: [true, `Description is required.`]
    },
    price: {
        type: Number,
        required: [true, `Price is required.`]
    },
    stock: {
        type: Number,
        required: [true, `Stock is required.`]
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true})

module.exports = mongoose.model(`Game`, gameSchema)