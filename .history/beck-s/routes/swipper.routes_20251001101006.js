
// const express = require('express');
// const multer = require('multer');
// const swipper = express.Router();
// const swipperController = require('../controller/swipper.controller');

// // Multer storage config
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads'); // uploads papkasi project root ichida
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname); // Fayl asl nomida saqlanadi
//   }
// });

// const upload = multer({ storage });

// /**
//  * @swagger
//  * tags: Swipper
//  * description: Swipper management
//  */

// swipper.post('/swipper', upload.single('img'), swipperController.createSwipper);
// /**
//  * @swagger
//  * /api/swipper:
//  *   post:
//  *     tags: [Swipper]
//  *     summary: Create swipper
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               img:
//  *                 type: string
//  *                 format: binary
//  *               desc:
//  *                 type: string
//  *     responses:
//  *       201:
//  *         description: Card created
//  *       400:
//  *         description: Invalid input
//  *       500:
//  *         description: Server error
//  */

// swipper.get('/swipper', swipperController.getSwipper);
// /**
//  * @swagger
//  * /api/swipper:
//  *   get:
//  *     tags: [Swipper]
//  *     summary: Get swipper
//  *     responses:
//  *       200:
//  *         description: List of swippers
//  *       500:
//  *         description: Server error
//  */

// swipper.delete('/swipper/:id', swipperController.deleteSwipper);
// /**
//  * @swagger
//  * /api/swipper/{id}:
//  *   delete:
//  *     tags: [Swipper]
//  *     summary: Delete swipper
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         schema:
//  *           type: integer
//  *         required: true
//  *     responses:
//  *       204:
//  *         description: Card deleted
//  *       404:
//  *         description: Card not found
//  *       500:
//  *         description: Server error
//  */

// module.exports = swipper;










const express = require("express");
const multer = require("multer");
const swipper = express.Router();
const swipperController = require("../controller/swipper.controller");

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // uploads papkasi project root ichida
  },
  filename: function (req, file, cb) {
    // Fayl nomini noyob qilish uchun vaqt qo‘shildi
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

/**
 * @swagger
 * tags:
 *   - name: Swipper
 *     description: Swipper management
 */

// CREATE Swipper
swipper.post('/swipper', upload.single('img'), swipperController.createSwipper);

/**
 * @swagger
 * /api/swipper:
 *   post:
 *     tags: [Swipper]
 *     summary: Create swipper
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
 *               desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: Swipper created
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

// GET Swippers
swipper.get("/swipper", swipperController.getSwipper);
/**
 * @swagger
 * /api/swipper:
 *   get:
 *     tags: [Swipper]
 *     summary: Get swippers
 *     responses:
 *       200:
 *         description: List of swippers
 *       500:
 *         description: Server error
 */

// DELETE Swipper
swipper.put("/swipper/:id",  upload.single("img"), swipperController.updateSwipper);
swipper.delete("/swipper/:id", swipperController.deleteSwipper);
/**
 * @swagger
 * /api/swipper/{id}:
 *   delete:
 *     tags: [Swipper]
 *     summary: Delete swipper
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       204:
 *         description: Swipper deleted
 *       404:
 *         description: Swipper not found
 *       500:
 *         description: Server error
 */

module.exports = swipper;
