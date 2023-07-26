const { mongoose, Schema } = require("mongoose");

const productSchema = mongoose.Schema({
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    title: String,
    price: Number,
    description: String,
    availability: Boolean
})

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel }


