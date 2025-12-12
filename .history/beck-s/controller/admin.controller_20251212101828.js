const { Admin, Card } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {validateAdmin} = require("../validation/admin.validation");

exports.createSuperAdmin = async (req, res) => {
   const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  try {
    const { phone, password, ad_name } = req.body;

    // Bazada super admin bormi tekshirish
    const superAdminExists = await Admin.findOne({
      where: { role: "super_admin" },
    });

    if (superAdminExists) {
      if (superAdminExists.is_used) {
        return res.status(400).json({
          success: false,
          message:
            "Super admin allaqachon tizimga kirgan. Qayta yaratib bo‘lmaydi.",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Super admin allaqachon mavjud",
        });
      }
    }

    // Passwordni hash qilish
    const hashedPassword = await bcrypt.hash(password, 10);

    // Super admin yaratish va is_used ni true qilish
    const admin = await Admin.create({
      ad_name,
      phone,
      password: hashedPassword,
      role: "super_admin",
      is_used: true,
    });

    // Token yaratish
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_TOKEN
    );

    // Barcha ma'lumotlarni frontendga qaytarish
    return res.status(201).json({
      success: true,
      token,
      message: "Super admin muvaffaqiyatli yaratildi",
      admin: {
        id: admin.id,
        ad_name: admin.ad_name,
        phone: admin.phone,
        role: admin.role,
        is_used: admin.is_used,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: " + error.message,
    });
  }
};

exports.getSuperAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({ where: { role: "super_admin" } });

    if (admin) {
      return res.status(200).json({
        exists: true,
        status: "found",
        admin: {
          id: admin.id,
          ad_name: admin.ad_name,
          phone: admin.phone,
          role: admin.role,
          is_used: admin.is_used,
        },
      });
    } else {
      return res.status(200).json({
        exists: false,
        status: "not_found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: " + error.message,
    });
  }
};

exports.createAdminBySuperAdmin = async (req, res) => {
   const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  try {
    // headerdan tokenni olish
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Token not provided" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // faqat super_admin ruxsat
    if (decoded.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only super admin can create admins",
      });
    }

    // phone tekshirish
    const oldAdmin = await Admin.findOne({ where: { phone: req.body.phone } });
    if (oldAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "This phone already exists" });
    }

    // yangi admin yaratish (hashlashni xavfsizlik uchun qayta yoqish kerak!)
    const newAdmin = await Admin.create({
      ad_name: req.body.ad_name,
      phone: req.body.phone,
      password: req.body.password, // ⚠️ xavfsiz emas!
      role: req.body.role || "admin",
      is_used: false,
    });

    return res.status(201).json({
      success: true,
      message: "New admin successfully created",
      password: req.body.password, // original parolni qaytarayapti
      data: {
        id: newAdmin.id,
        ad_name: newAdmin.ad_name,
        phone: newAdmin.phone,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};


exports.loginAdmin = async (req, res) => {
  try {
    const { ad_name, password } = req.body;

    const admin = await Admin.findOne({ where: { ad_name } });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin nomi yoki parol noto‘g‘ri",
      });
    }

    // AGAR OLDIN LOGIN QILGAN BO'LSA — RUXSAT YO'Q
    if (admin.is_used) {
      return res.status(400).json({
        success: false,
        message: "Bu admin allaqachon tizimga kirgan.",
      });
    }

    // ❗ PAROL HASH QILINGMAGAN — ODDIY SOLISHTIRISH
    if (admin.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Admin nomi yoki parol noto‘g‘ri",
      });
    }

    // ❗ BIRINCHI LOGINDA PAROLNI HASHLAYMIZ
    const hashedPassword = await bcrypt.hash(password, 10);
    admin.password = hashedPassword;
    admin.is_used = true;
    await admin.save();

    // TOKEN YARATAMIZ
    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_TOKEN
    );

    // return res.status(200).json({
    //   success: true,
    //   token,
    //   message: "Admin tizimga muvaffaqiyatli kirdi",
    // });
return res.status(200).json({
  success: true,
  token,
  message: "Admin tizimga muvaffaqiyatli kirdi",
  admin: {
    id: admin.id,
    ad_name: admin.ad_name,
    phone: admin.phone,
    role: admin.role,
    is_used: admin.is_used,
  }
});

  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server xatosi: " + error.message });
  }
};

exports.getAllSuperAdmins = async (req, res) => {
  try {
    const superAdmins = await Admin.findAll({
      where: { role: "super_admin" },
    });

    return res.status(200).json({
      success: true,
      count: superAdmins.length,
      super_admins: superAdmins,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server xatosi: " + error.message });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Token yuborilmagan" });
    }

    const token = authHeader.split(" ")[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_TOKEN);
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token noto‘g‘ri yoki muddati tugagan",
      });
    }

    if (decoded.role !== "super_admin") {
      return res.status(403).json({
        success: false,
        message: "Ruxsat yo‘q. Faqat super_admin ko‘rishi mumkin",
      });
    }

    const admins = await Admin.findAll();
    return res.status(200).json({ success: true, data: admins });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Server xatosi: " + error.message });
  }
};

//update admin hamma ozini ozgartira oladi holos
exports.updateAdmin = async (req, res) => {
   const { error } = validateAdmin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Token mavjud emas" });

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    if (decoded.id != req.params.id)
      return res.status(403).json({
        success: false,
        message: "Faqat o‘zingizni o‘zgartira olasiz",
      });

    const admin = await Admin.findByPk(req.params.id);
    if (!admin)
      return res
        .status(404)
        .json({ success: false, message: "Admin topilmadi" });

    if (req.body.password) {
      admin.password = await bcrypt.hash(req.body.password, 10); // yangi parol hash qilinadi
    }

    await admin.update(req.body);

    return res.json({
      success: true,
      message: "Muvaffaqiyatli yangilandi",
      data: admin,
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: "Token berilmagan" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin topilmadi" });
    }

    // Super admin bo'lsa: hammani o'chira oladi va o'zini ham
    if (decoded.role === "super_admin") {
      await admin.destroy();
      return res.json({
        success: true,
        message: "Admin muvaffaqiyatli o'chirildi",
      });
    }

    // Oddiy admin: faqat o'zini o'chira oladi
    if (decoded.id !== admin.id) {
      return res
        .status(403)
        .json({ success: false, message: "Faqat o'zingizni o'chira olasiz" });
    }

    await admin.destroy();
    return res.json({
      success: true,
      message: "Siz muvaffaqiyatli o'chirildingiz",
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const admin = await Admin.findByPk(req.admin.id, {
      include: [{ model: Card, as: "card" }],
    });
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }
    return res.status(200).json({ success: true, admin });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const admin = await Admin.findAll();
    return res.status(200).send({ admin });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

exports.deleteAdminById = async (req, res) => {
  try {
    // URL orqali id olish
    const adminId = parseInt(req.params.id);
    if (!adminId) {
      return res.status(400).json({ success: false, message: "ID noto‘g‘ri" });
    }

    // Adminni id bo‘yicha topish
    const admin = await Admin.findByPk(adminId);
    if (!admin) {
      return res
        .status(404)
        .json({ success: false, message: "Admin topilmadi" });
    }

    // Adminni o‘chirish
    await admin.destroy();

    return res.status(200).json({
      success: true,
      message: `Admin (id: ${adminId}) muvaffaqiyatli o‘chirildi`,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server xatosi: " + error.message,
    });
  }
};
