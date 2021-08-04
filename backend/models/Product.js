const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: String,
    image: String,
    description: String,
    richDescription: String,
    images: [{ type: String }],
    brand: String,
    price: Number,
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    countInStock: {
        type: Number,
        required: true
    },
    rating: Number,
    isFeatured: Boolean,
    dateCreated: Date
})

const Product = mongoose.model('Products', productSchema)

module.exports = Product