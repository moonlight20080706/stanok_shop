const express = require("express");
const multer = require("multer");
const footerController = require("../controller/info.controller");
const info = express.Router();

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

// ======= CREATE Footer =======
info.post("/info", upload.single("img"), footerController.createInfo);

// ======= GET ALL Footer =======
info.get("/info", footerController.getInfo);

// ======= GET Footer BY ID =======
info.get("/info/:id", footerController.getInfoById);

// ======= UPDATE Footer =======
info.put("/info/:id", upload.single("img"), footerController.updateInfo);

// ======= DELETE Footer =======
info.delete("/info/:id", footerController.deleteInfo);

module.exports = info;
