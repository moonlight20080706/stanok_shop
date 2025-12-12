const express = require('express')
const carts = express.Router()
const cartsController = require('../controller/carts.controller')


/**
 * @swagger
 * tags:
 *   name: Carts
 *   description: Carts
 */

carts.post('/carts', cartsController.postCarts)
/**
 * @swagger
 * /api/carts:
 *   post:
 *     tags: [Carts]
 *     summary: Create carts
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               card_id:
 *                 type: number
 *     responses:
 *       201:
 *         description: Card created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */


carts.get('/carts', cartsController.getCarts)
/**
 * @swagger
 * /api/carts:
 *   get:
 *     tags: [Carts]
 *     summary: Get all carts
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */


carts.delete('/carts/:id', cartsController.deleteCarts)
/**
 * @swagger
 * /api/carts/{id}:
 *   delete:
 *     tags: [Carts]
 *     summary: Delete Cart
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Card deleted
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */


module.exports = carts