const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
    },
    images: [{
        type: String,
        default: ''
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
})

//To avoid the _id Underscore, but you get to ids on mongo
// productSchema.method('toJSON', function(){
//     const { __v, ...object } = this.toObject()
//     const { _id:id, ...result } = object
//     return { ...result, id }
// })

const Product = mongoose.model('Product', productSchema)

module.exports = Product