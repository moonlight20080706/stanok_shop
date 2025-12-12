const express = require('express')
const footer = express.Router()
const footerController = require('../controller/footer.controller')

/**
 * @swagger
 * tags:
 *   name: Footer
 *   description: Footer management
 */

footer.post('/footer', footerController.createFooter)

/**
 * @swagger
 * /api/footer:
 *   post:
 *     tags: [Footer]
 *     summary: Create a new footer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - telegram_email
 *             properties:
 *               phone:
 *                 type: string
 *               telegram_email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Footer created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

footer.get('/footer', footerController.getAllFooter)
/**
 * @swagger
 * /api/footer:
 *   get:
 *     tags: [Footer]
 *     summary: Get all footers
 *     responses:
 *       200:
 *         description: List of footers
 *       500:
 *         description: Server error
 */

footer.get('/footer/:id', footerController.getFooterById)
/**
 * @swagger
 * /api/footer/{id}:
 *   get:
 *     tags: [Footer]
 *     summary: Get footer by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Footer id
 *     responses:
 *       200:
 *         description: Footer retrieved
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Footer not found
 *       500:
 *         description: Server error
 */

footer.put('/footer/:id', footerController.updateFooter)
/**
 * @swagger
 * /api/footer/{id}:
 *   put:
 *     tags: [Footer]
 *     summary: Update Footer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: integer
 *         required: true
 *         description: Footer Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *               telegram_email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Footer updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Footer not found
 *       500:
 *         description: Server error
 */

footer.delete('/footer/:id', footerController.deleteFooter)
/**
 * @swagger
 * /api/footer/{id}:
 *   delete:
 *     tags: [Footer]
 *     summary: Delete Footer
 *     parameters:
 *       - in: path
 *         name: id
 *         schema: 
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Footer deleted
 *       404:
 *         description: Footer not found
 *       500:
 *         description: Server error
 */

module.exports = footer
