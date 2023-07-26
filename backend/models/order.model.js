const { mongoose, Schema } = require("mongoose");

const orderSchema = mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            default: 1 // You can set a default quantity if necessary
        }
    }],
    date: {
        type: Date,
        default: Date.now()
    }
})

const OrderModel = mongoose.model("order", orderSchema);

module.exports = { OrderModel }