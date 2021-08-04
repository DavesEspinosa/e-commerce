const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    name: String,
    email: String,
    passwordHash: String,
    street: String,
    apartment: String ,
    city: String,
    zip: String,
    country: String,
    phone: Number,
    isAdmin: Boolean,
})

const User = mongoose.model('Users', userSchema)

module.exports = User