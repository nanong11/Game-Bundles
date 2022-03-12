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
    status: {
        type: String,
        dafault: `Pending`
    },
    total: {
        type: Number
    }
}, {timestamps: true})