const { Router } = require("express");
const admin = Router();

const { validateAdmin } = require("../validation/admin.validation");
const adminController = require("../controller/admin.controller");
const {
  authAdmin,
  checkRole,
  isAdminMiddleware,
} = require("../middleware/isAdmin.middleware");
const { validateSchema } = require("../middleware/validate.middleware");

admin.post(
  "/first-super-admin",
  validateSchema(validateAdmin),
  adminController.createSuperAdmin
);

// super_admin boshqa admin yaratadi
admin.post(
  "/create-admin-by-super-admin",
  authAdmin,
  checkRole("super_admin"),
  validateSchema(validateAdmin),
  adminController.createAdminBySuperAdmin
);

// login qilish
admin.post("/login", validateSchema(validateAdmin), adminController.loginAdmin);

// faqat o‘zini yoki super_admin boshqalarni update qila oladi
admin.put("/updateAdmin/:id", authAdmin, adminController.updateAdmin);

// super_admin barcha adminlarni ko‘ra oladi
admin.get(
  "/getAll",
  authAdmin,
  checkRole("super_admin"),
  adminController.getAllAdmins
);

// super_admin bor yoki yo‘qligini tekshirish
admin.get("/get-super-admin", adminController.getSuperAdmin);

// barcha super adminlarni olish
// admin.get("/all-super-admins", adminController.getAllSuperAdmins);
admin.get("/all", adminController.getAll);

admin.get("/profile", isAdminMiddleware, adminController.getProfile);

// super_admin boshqalarni o‘chiradi, adminlar faqat o‘zini o‘chira oladi
admin.delete("/deleteAd/:id", authAdmin, adminController.deleteAdmin);
admin.delete("/deleteId/:id", adminController.deleteAdminById);

module.exports = admin;
