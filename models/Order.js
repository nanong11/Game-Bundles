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
    bundlesIncluded: [
        {
            bundleId: {
                type: String,
            },
            subTotal: {
                type: Number
            }
            
        }
    ],
    total: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

module.exports = mongoose.model(`Order`, orderSchema)