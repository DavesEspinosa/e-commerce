const express = require("express")
const mongoose = require("mongoose")
const Category = require('../models/Category')
const router = express.Router()

router.get(`/`, async (req, res) => {
    const categoriesList = await Category.find()

    if (!categoriesList) {
        res.status(500).json({success: false})
    }
    res.send(categoriesList)
} )


module.exports = router