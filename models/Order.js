const mongoose = require(`mongoose`)

const orderSchema = mongoose.Schema({
    userId: {
        type: String,
        required: [true, `UserID is required.`]
    },
    transactionDate: {
        type: Date,
        default: new Date()
    },
    complete: {
        type: Boolean,
        default: false,
    },
    gamesIncluded: [
        {
            gameId: {
                type: String
            },
        }
    ],
    bundlesIncluded: [
        {
            bundleId: {
                type: String,
            },
        }
    ],
    total: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model(`Order`, orderSchema)