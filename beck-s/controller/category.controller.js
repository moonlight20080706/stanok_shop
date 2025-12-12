const {Category} = require('../models')
const validateCategory = require('../validation/category.validation')

exports.createCategory = async(req ,res) =>{
    const {error} = validateCategory(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    try {
        const category = await Category.create(req.body)
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.getCategory = async(req, res) =>{
    try {
        const category = await Category.findAll()
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}



exports.getCategoryById = async(req, res) =>{
    try {
        const category = await Category.findByPk(req.params.id,)
        if(!category) res.status(400).send('Category not found')
        res.status(200).send(category)    
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}

exports.updateCategory = async (req, res) =>{
    const {error} = validateCategory(req.body)
    if(error) res.status(404).send(error.details[0].message)
    try {
        const category = await Category.findByPk(req.params.id)
        if(!category) res.status(400).send('Category not found')
        await category.update(req.body)
        res.status(200).send(category)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}


exports.deleteCategory = async (req, res) =>{
    try {
        const category = await Category.findByPk(req.params.id)
        if(!category) res.status(400).send('Category not found')
        const categoryData = category.toJSON()
        await category.destroy()
        res.status(200).send(categoryData)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
}