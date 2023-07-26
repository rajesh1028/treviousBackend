const { mongoose, Schema } = require("mongoose");

const cartSchema = mongoose.Schema({
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
    }]
})

const CartModel = mongoose.model("cart", cartSchema);

module.exports = { CartModel }