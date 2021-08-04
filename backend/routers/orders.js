const express = require("express")
const mongoose = require("mongoose")
const Order = require('../models/Order')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const orderList = await Order.find()

    if (!orderList) {
        res.status(500).json({success: false})
    }
    res.send(orderList)
} )


module.exports = router