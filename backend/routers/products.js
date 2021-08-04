const express = require("express")
const mongoose = require("mongoose")
const Product = require('../models/Product')
const Category = require('../models/Category')
const router = express.Router()

router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.categories) filter = { category: req.query.categories.split(',') }
    const productList = await Product.find(filter).populate('category')

    if (!productList) {
        res.status(500).json({success: false})
    }
    res.send(productList)
} )

router.post(`/`, async (req, res) => {
    const category = await Category.findById(req.body.category)

    if (!category) res.status(400).send('Invalid Category')

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    })
    product = await product.save()

    if (!product) res.status(500).send('The product cannot be created')

    res.send(product)
} 
)
router.get(`/:id`, async (req, res) => {
    const { id } = req.params

    const product = await Product.findById(id).populate('category')

    if (!product) {
        res.status(500).json({success: false})
    }
    res.send(product)
} )

router.put('/:id', async (req, res) => {
    const { id } = req.params
    if(!mongoose.isValidObjectId(id)) res.status(400).send('Invalid Product Id')
    const category = await Category.findById(req.body.category)

    if (!category) res.status(400).send('Invalid Category')
    
        const product = await Product.findByIdAndUpdate(id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
    }, 
    {new: true})

    if (!product) res.status(500).send('The product cannot be updated!')

    res.send(product)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const deletedProduct = await Product.findByIdAndRemove(id)
        if (deletedProduct) res.status(200).json({success: true, message: 'The Product was deleted succesfully!'})
        if (!deletedProduct) res.status(404).json({success: false, message: 'The Product was not found!'})
    } catch(err) {
        res.status(500).json({success: false, error: err})
    }
})

router.get(`/get/count`, async (req, res) => {
    const productCount = await Product.countDocuments((count) => count)

    if (!productCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        productCount,
    })
})

router.get(`/get/featured/:count`, async (req, res) => {
    const count = req.params.count ? req.params.count : 0
    const products = await Product.find({ isFeatured: true }).limit(+count)

    if (!products) {
        res.status(500).json({ success: false })
    }
    res.send(products)
})

module.exports = router