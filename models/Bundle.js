const mongoose = require(`mongoose`)

const bundleSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, `Name is required.`],
    },
    description: {
        type: String,
        required: [true, `Description is required.`]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    gamesIncluded: [
        {
            productId: {
                type: String,
                required: [true, `ProductId is required.`]
            },
            name: {
                type: String,
                required: [true, `Name is required.`]
            },
            price: {
                type: Number,
                required: [true, `Price is required.`]
            }
        }
    ],
    subTotal: {
        type: Number,
        required: [true, `Subtotal is required.`]
    }
}, {timestamps: true})