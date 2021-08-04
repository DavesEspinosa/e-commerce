const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema ({
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "OrderItems" }],
    shippingAddress1: String,
    shippingAddress2: String,
    city: String,
    zip: String,
    country: String,
    status: String,
    totalPrice: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    dateOrdered: Date
})

const Order = mongoose.model('Orders', orderSchema)

module.exports = Order