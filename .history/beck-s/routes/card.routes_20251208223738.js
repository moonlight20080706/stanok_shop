const express = require("express");
const card = express.Router();
const cardController = require("../controller/card.controller");
const { isAdminMiddleware } = require("../middleware/isAdmin.middleware");
const upload = require("../configs/multer");


/**
 * @swagger
 * tags:
 *   name: Card
 *   description: Card managment
 */

card.post(
  "/createCard",
  upload.single("img"),
  isAdminMiddleware,
  cardController.createCard
);
/**
 * @swagger
 * /api/card:
 *   post:
 *     tags: [Card]
 *     summary: Create a new card
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: string
 *               quantity:
 *                 type: string
 *               category_id:
 *                 type: number
 *               state
 *     responses:
 *       201:
 *         description: Card created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/card/search:
 *   get:
 *     tags: [Card]
 *     summary: Search card by name or email
 *     parameters:
 *       - in: query
 *         name: query
 *         schema:
 *           type: string
 *         required: true
 *         description: Search query for user name or email
 *     responses:
 *       200:
 *         description: List of card matching the search query
 *       400:
 *         description: Search query is required
 *       500:
 *         description: Server error
 */
card.get("/search", cardController.searchCard);

card.get("/get-all-products", cardController.getCard);
card.get("/get-all-card-info", cardController.getCardsByInfo);
/**
 * @swagger
 * /api/get-all-products:
 *   get:
 *     tags: [Card]
 *     summary: Get all admins
 *     responses:
 *       200:
 *         description: List of users
 *       500:
 *         description: Server error
 */

card.get("/card/:id", cardController.getCradById);
/**
 * @swagger
 * /api/card/{id}:
 *   get:
 *     tags: [Card]
 *     summary: get Card
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Card info
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */

card.put("/update-card/:id", cardController.updateCard);
/**
 * @swagger
 * /api/update-card/{id}:
 *   put:
 *     tags: [Card]
 *     summary: Update Card
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Card Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img:
 *                 type: string
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: number
 *               category_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: Card updated
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Card not found
 *       500:
 *         description: Server error
 */
card.delete("/delete-card/:id", cardController.deleteCard);
/**
 * @swagger
 * /api/card/{id}:
 *   delete:
 *     tags: [Card]
 *     summary: delete Card
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


card.put("/update-card-img/:id", upload.single("img"), cardController.updateCardImg);
card.get("/get-card-info-with-admins", cardController.getCard);
module.exports = card;
