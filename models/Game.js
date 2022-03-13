const mongoose = require(`mongoose`)

const gameSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name is required.`],
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