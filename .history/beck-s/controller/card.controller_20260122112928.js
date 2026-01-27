const { Card, Category, Admin } = require("../models");
const validateCard = require("../validation/card.validation");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");



exports.createCard = async (req, res) => {
   const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  if (!req.file) {
    return res.status(400).json({ success: false, message: "no image" });
  }
  try {
    const card = await Card.create({
      ...req.body,
      admin_id: req.admin.id,
      img: "/uploads/" + req.file.filename,
    });

    return res.status(201).json({ success: true, card });
  } catch (error) {}
};



exports.getCradById = async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          as: "category",
        },
      ],
    });
    if (!card) res.status(404).send("Card not found");
    res.status(200).send(card);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getCardsByInfo = async (req , res) =>{
  try {
    const card = await Card.findAll()
    res.status(200).send(card)
  } catch (error) {
    res.status(500).send({message:error.message})
  }
}

//UPDATE
exports.updateCard = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card topilmadi" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id) {
      return res
        .status(403)
        .send({ message: "Faqat o‘zingiz yaratgan cardni o‘zgartira olasiz" });
    }

    await card.update({
      ...req.body,
      img: req?.file?.filename ? "/uploads/" + req?.file?.filename : card.img,
    });

    res.json({
      success: true,
      message: "Card yangilandi",
      data: card,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//DELETE
exports.deleteCard = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "Token yoq" });

    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).send({ message: "Mahsulot topilmadi" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id)
      return res
        .status(403)
        .send({ message: "Faqat ozingizniki ochira olasiz" });

    await card.destroy();
    return res.status(200).send({ card });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.searchCard = async (req, res) => {
  try {
    console.log("Query recived:", req.query.query);
    const { query } = req.query;

    if (!query) {
      return res.status(400).send("Search query is required");
    }

    const card = await Card.findAll({
      where: {
        [Op.or]: [{ title: { [Op.iLike]: `%${query}%` } }],
      },
    });

    res.json(card);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.updateCardImg = async (req, res) => {
   const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card topilmadi" });

    // faqat o‘zining mahsuloti yoki super_admin bo‘lsa update qilish mumkin
    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id) {
      return res.status(403).json({
        message: "Faqat o‘zingiz yaratgan card rasmini yangilay olasiz",
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Rasm fayl yuklanmadi" });
    }

    // yangi rasm yo‘li
    const newImg = "/uploads/" + req.file.filename;

    await card.update({ img: newImg });

    return res.json({
      success: true,
      message: "Card rasmi yangilandi ✅",
      img: newImg, // frontendga qaytadigan yo‘l
      fullUrl: `http://localhost:7070${newImg}`, // to‘liq URL
    });
  } catch (error) {
    console.error("updateCardImg error:", error);
    res.status(500).json({ message: error.message });
  }
};





exports.getCard = async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [
        {
          model: Admin,
          as: "admin", // bu `Card` modelida `belongsTo(Admin, { as: 'admin' })` bo‘lishi kerak
          attributes: ["id", "ad_name"], // faqat admin ismini (va id ni) chiqaramiz
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Barcha mahsulotlar ro‘yxati",
      cards,
    });
  } catch (error) {
    console.error("getCard error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


























const { Card, Category, Admin } = require("../models");
const validateCard = require("../validation/card.validation");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

// CREATE
exports.createCard = async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.file) {
      return res.status(400).json({ success: false, message: "Rasm yuklanmadi" });
    }

    const card = await Card.create({
      ...req.body,
      admin_id: req.admin.id,
      img: "/uploads/" + req.file.filename,
    });

    return res.status(201).json({ success: true, card });
  } catch (error) {
    console.error("createCard error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET BY ID
exports.getCardById = async (req, res) => {
  try {
    const card = await Card.findByPk(req.params.id, {
      include: [{ model: Category, as: "category" }],
    });

    if (!card) return res.status(404).send("Card topilmadi");

    res.status(200).json(card);
  } catch (error) {
    console.error("getCardById error:", error);
    res.status(500).send({ message: error.message });
  }
};

// GET ALL
exports.getCards = async (req, res) => {
  try {
    const cards = await Card.findAll({
      include: [
        { model: Category, as: "category" },
        { model: Admin, as: "admin", attributes: ["id", "ad_name"] },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Barcha mahsulotlar",
      cards,
    });
  } catch (error) {
    console.error("getCards error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE
exports.updateCard = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card topilmadi" });

    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id) {
      return res
        .status(403)
        .send({ message: "Faqat o‘zingiz yaratgan cardni o‘zgartira olasiz" });
    }

    await card.update({
      ...req.body,
      img: req?.file?.filename ? "/uploads/" + req.file.filename : card.img,
    });

    res.json({ success: true, message: "Card yangilandi", card });
  } catch (error) {
    console.error("updateCard error:", error);
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteCard = async (req, res) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).send({ message: "Token yo‘q" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).send({ message: "Card topilmadi" });

    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id) {
      return res
        .status(403)
        .send({ message: "Faqat o‘zingiz yaratgan cardni o‘chirishingiz mumkin" });
    }

    await card.destroy();
    return res.status(200).send({ success: true, message: "Card o‘chirildi", card });
  } catch (error) {
    console.error("deleteCard error:", error);
    res.status(500).send({ message: error.message });
  }
};

// SEARCH
exports.searchCard = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).send("Search query required");

    const cards = await Card.findAll({
      where: { title: { [Op.iLike]: `%${query}%` } },
      include: [{ model: Category, as: "category" }],
    });

    res.json({ success: true, cards });
  } catch (error) {
    console.error("searchCard error:", error);
    res.status(500).send({ message: error.message });
  }
};

// UPDATE CARD IMAGE
exports.updateCardImg = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Rasm yuklanmadi" });

    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token yo‘q" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const card = await Card.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card topilmadi" });

    if (decoded.role !== "super_admin" && decoded.id !== card.admin_id) {
      return res.status(403).json({ message: "Faqat o‘zingiz yaratgan card rasmini yangilay olasiz" });
    }

    const newImg = "/uploads/" + req.file.filename;
    await card.update({ img: newImg });

    res.json({
      success: true,
      message: "Card rasmi yangilandi",
      img: newImg,
      fullUrl: `http://localhost:7070${newImg}`,
    });
  } catch (error) {
    console.error("updateCardImg error:", error);
    res.status(500).json({ message: error.message });
  }
};

















