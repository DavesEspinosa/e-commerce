const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderItemsSchema = new Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    quantity: NUmber,
})

const OrderItem = mongoose.model('OrderItems', orderItemsSchema)

module.exports = OrderItem