const mongoose = require(`mongoose`)

const bundleSchema = mongoose.Schema({
    bundleName: {
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
            _id: {
                type: String,
                ref: `Game`,
                required: [true, `ProductId is required.`]
            },
            gameName: {
                type: String,
                required: [true, `Name is required.`]
            },
            price: {
                type: Number,
                required: [true, `Price is required.`]
            }
        }
    ],
    discount: {
        type: Number,
        required: [true, `Discount is required.`]
    },
    subTotal: {
        type: Number,
        default: 0,
        required: [true, `Subtotal is required.`]
    },
    userId: {
        type: String,
    }
}, {timestamps: true})

module.exports = mongoose.model(`Bundle`, bundleSchema)