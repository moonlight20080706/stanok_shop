const jwt = require("jsonwebtoken");
const { Admin } = require("../models");

exports.authAdmin = async (req, res, next) => {
  const [Bearer, token] = req.headers.authorization?.split(" ") || [];

  if (!token) return res.status(401).json({ message: "Token not provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const admin = await Admin.findByPk(decoded.id);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    req.admin = admin; // 🔑 shu orqali role ham, id ham o‘qiladi
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Ruxsatlarni tekshirish
exports.checkRole = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.admin.role)) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};



exports.isAdminMiddleware = async (req, res, next) => {
  try {
    const [bearer, token] = req.headers.authorization?.split(" ") || [];
    console.log("Headers:", req.headers);
console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_TOKEN, async (error, decoded) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const admin = await Admin.findByPk(decoded.id);
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      req.admin = admin; // 🔑 shu orqali getProfile ishlaydi
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
