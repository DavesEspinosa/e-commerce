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
})

router.post('/', async (req, res) => {
    let category = new Category ({
        name: req.body.name,
        icon:req.body.icon,
        color: req.body.color
    })
    category = await category.save()

    if (!category) res.status(404).send('The category cannot be created!')

    res.send(category)
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
        const category = await Category.findByIdAndUpdate(id, {
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color
    }, 
    {new: true})

    if (!category) res.status(404).send('The category cannot be updated!')

    res.send(category)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedCategory = await Category.findByIdAndRemove(id)
        if (deletedCategory) res.status(200).json({success: true, message: 'The category was deleted succesfully!'})
        if (!deletedCategory) res.status(404).json({success: false, message: 'The category was not found!'})
    } catch(err) {
        res.status(500).json({success: false, error: err})
    }
})

module.exports = router


