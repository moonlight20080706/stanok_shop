const express = require('express')
const category = express.Router()
const categoryController = require('../controller/category.controller')

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category managment
 */

category.post('/create-category', categoryController.createCategory)

/**
 * @swagger
 * /api/create-category:
 *   post:
 *     tags: [Category]
 *     summary: Create a new category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cat_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */


category.get('/get-all-category', categoryController.getCategory)
/**
 * @swagger
 * /api/get-all-category:
 *   get:
 *     tags: [Category]
 *     summary: Get all categories
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */

category.get('/category/:id', categoryController.getCategoryById)
/**
 * @swagger
 * /api/category/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Get category by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Category id
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */

category.put('/update-category/:id', categoryController.updateCategory)
/**
 * @swagger
 * /api/category/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Update Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: integer
 *         required: true
 *         description: Category Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cat_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Category updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */


category.delete('/delete-category/:id', categoryController.deleteCategory)
/**
 * @swagger
 * /api/category/{id}:
 *   delete:
 *     tags: [Category]
 *     summary: delete Category
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Category deleted
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server error
 */




module.exports = category