const { Swipper } = require("../models");
const swipperValidate = require("../validation/swipper.validation");

exports.createSwipper = async (req, res) => {
  const { error } = swipperValidate(req.body);
  if (error) return res.status(404).send(error.details[0].message);
  if (!req.file) return res.status(404).send({ message: "no img" });
  try {
    const newSwipper = await Swipper.create({
      img: req.file ? `/uploads/${req.file.filename}` : null,
      desc: req.body.desc,
    });
    res.status(201).send(newSwipper);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSwipper = async (req, res) => {
  try {
    const swippers = await Swipper.findAll();
    res.status(200).send(swippers);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.deleteSwipper = async (req, res) => {
  try {
    const swipper = await Swipper.findByPk(req.params.id);
    if (!swipper) return res.status(404).send("Swipper not found");

    const swipperData = swipper.toJSON();
    await swipper.destroy();
    res.status(200).send(swipperData);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.updateSwipper = async (req, res) => {
  try {
    const swipper = await Swipper.findByPk(req.params.id);
    if (!swipper) return res.status(404).send({ message: "Swipper not found" });

    // desc ni validatsiya qilish (form-data bo‘lgani uchun req.body to‘liq bo‘lmasligi mumkin)
    if (!req.body.desc || req.body.desc.trim() === "") {
      return res.status(400).send({ message: "Description majburiy" });
    }

    // Agar fayl kelgan bo‘lsa, img ni yangilaymiz
    if (req.file) {
      swipper.img = `/uploads/${req.file.filename}`;
    }

    swipper.desc = req.body.desc; // yangilash

    await swipper.save();
    res.status(200).send(swipper);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send({ message: err.message });
  }
};
