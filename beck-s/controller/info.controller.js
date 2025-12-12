const { Info } = require('../models');
const validateInfo  = require('../validation/info.validation');

// ======= CREATE =======
exports.createInfo = async (req, res) => {
   const { error } = validateInfo(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  try {
    const { desc } = req.body;
    if (!req.file || !desc) {
      return res.status(400).send("Rasm va desc majburiy");
    }

    const info = await Info.create({
      img: "/uploads/" + req.file.filename, // fayl serverga yuklangan joy
      desc,
    });

    res.status(201).send(info);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ======= GET ALL =======
exports.getInfo = async (req, res) => {
  try {
    const info = await Info.findAll();
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ======= GET BY ID =======
exports.getInfoById = async (req, res) => {
  try {
    const info = await Info.findByPk(req.params.id);
    if (!info) return res.status(404).send("Info topilmadi");
    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ======= UPDATE =======
exports.updateInfo = async (req, res) => {
    const { error } = validateInfo(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
  try {
    const info = await Info.findByPk(req.params.id);
    if (!info) return res.status(404).send("Info topilmadi");

    const desc = req.body.desc || info.desc;
    const img = req.file ? "/uploads/" + req.file.filename : info.img;

    await info.update({ img, desc });

    res.status(200).send(info);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// ======= DELETE =======
exports.deleteInfo = async (req, res) => {
  try {
    const info = await Info.findByPk(req.params.id);
    if (!info) return res.status(404).send("Info topilmadi");

    const deletedInfo = info.toJSON();
    await info.destroy();

    res.status(200).send(deletedInfo);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
