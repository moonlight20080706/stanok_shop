const express = require('express')
const like = express.Router()
const likeController = require('../controller/like.controller')


/**
 * @swagger
 * tags:
 *   name: Like
 *   description: Like
 */

like.post('/like', likeController.postLike)
/**
 * @swagger
 * /api/like:
 *   post:
 *     tags: [Like]
 *     summary: Create like
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


like.get('/like', likeController.getLikes)
/**
 * @swagger
 * /api/like:
 *   get:
 *     tags: [Like]
 *     summary: Get all like
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */


like.delete('/like/:id', likeController.deleteLike)
/**
 * @swagger
 * /api/like/{id}:
 *   delete:
 *     tags: [Like]
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


module.exports = like