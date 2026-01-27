// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560; // forum supergroup
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot + Server ishga tushdi");

// /* ================== SESSION ================== */
// const sessions = {}; // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /* ================== /start ================== */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;

//   await bot.sendMessage(
//     userId,
//     `👋 Xush kelibsiz!

// 🆔 Sizning Telegram ID:
// <code>${userId}</code>

// 👉 Saytga qaytib shu ID ni kiriting va buyurtma yuboring.`,
//     { parse_mode: "HTML" },
//   );
// });

// /* ================== USER → ADMIN ================== */
// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.type !== "private") return;
//     if (!msg.text || msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];
//     if (!threadId) return;

//     await bot.sendMessage(ADMIN_GROUP_ID, msg.text, {
//       message_thread_id: threadId,
//     });
//   } catch (e) {
//     console.error("USER ERROR:", e.message);
//   }
// });

// /* ================== ADMIN → USER ================== */
// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;
//     if (!msg.text) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];
//     if (!userId) return;

//     if (msg.text === "/close") {
//       delete reverseSessions[threadId];
//       Object.keys(sessions).forEach(
//         (u) => sessions[u] === threadId && delete sessions[u],
//       );

//       await bot.sendMessage(ADMIN_GROUP_ID, "🟢 Suhbat yopildi", {
//         message_thread_id: threadId,
//       });
//       return;
//     }

//     await bot.sendMessage(userId, `🧑‍💼 ADMIN:\n${msg.text}`);
//   } catch (e) {
//     console.error("ADMIN ERROR:", e.message);
//   }
// });

// /* ================== CART → BOT ================== */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     if (!telegramId || !Array.isArray(products) || products.length === 0) {
//       return res.json({
//         success: false,
//         message: "Telegram ID yoki cart bo‘sh",
//       });
//     }

//     const cartText = `🛒 <b>Yangi buyurtma</b>

// ${products.map((p, i) => `${i + 1}. ${p.name}`).join("\n")}`;

//     /* ===== USERGA ===== */
//     await bot.sendMessage(telegramId, cartText, { parse_mode: "HTML" });

//     let threadId = sessions[telegramId];

//     /* ===== BIRINCHI BUYURTMA ===== */
//     if (!threadId) {
//       const user = await bot.getChat(telegramId);
//       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

//       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
//       threadId = topic.message_thread_id;

//       sessions[telegramId] = threadId;
//       reverseSessions[threadId] = telegramId;

//       const profile = `👤 <b>Haridor profili</b>

// 📛 Ism: ${user.first_name || "yo‘q"}
// 👤 Username: ${user.username ? "@" + user.username : "yo‘q"}
// 🆔 ID: ${telegramId}
// 🔗 <a href="tg://user?id=${telegramId}">Profilni ochish</a>`;

//       await bot.sendMessage(ADMIN_GROUP_ID, profile, {
//         message_thread_id: threadId,
//         parse_mode: "HTML",
//       });
//     }

//     /* ===== CART ADMIN GROUPGA ===== */
//     await bot.sendMessage(ADMIN_GROUP_ID, cartText, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });

//     res.json({
//       success: true,
//       message: "✅ Buyurtma adminga yuborildi",
//     });
//   } catch (e) {
//     console.error("SEND CART ERROR:", e.message);
//     res.json({
//       success: false,
//       message: "❌ Botga /start bosilmagan yoki ID noto‘g‘ri",
//     });
//   }
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlayapti`);
// });
















































































//ISHLAYDI FAQAT IMG YUBORILMITTI
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560; // forum supergroup
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot va Server muvaffaqiyatli ishga tushdi");

// /* ================== SESSION MANAGEMENT ================== */
// const sessions = {}; // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// /**
//  * Telegram topic title uchun xavfsiz matn yaratish
//  */
// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /**
//  * Rasm URL ini validatsiya qilish
//  */
// function isValidImageUrl(url) {
//   if (!url || typeof url !== "string") return false;
//   const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
//   const lowerUrl = url.toLowerCase();
//   return (
//     url.startsWith("http://") ||
//     url.startsWith("https://") ||
//     validExtensions.some((ext) => lowerUrl.includes(ext))
//   );
// }

// /**
//  * Buyurtma textini formatlash
//  */
// function formatOrderText(products) {
//   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
//   let totalPrice = 0;

//   products.forEach((p, i) => {
//     const price = parseFloat(p.price) || 0;
//     totalPrice += price;

//     text += `${i + 1}. <b>${p.title || "Noma'lum mahsulot"}</b>\n`;
//     text += `   💰 Narxi: ${price.toFixed(2)}$\n\n`;
//   });

//   text += `━━━━━━━━━━━━━━━━━━━━\n`;
//   text += `<b>Jami:</b> ${totalPrice.toFixed(2)}$`;

//   return { text, totalPrice };
// }

// /* ================== BOT COMMANDS ================== */

// /**
//  * /start command - Botni boshlash
//  */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   const userName = msg.from.first_name || "Foydalanuvchi";

//   try {
//     await bot.sendMessage(
//       userId,
//       `👋 Assalomu aleykum, <b>${userName}</b>!

// Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

// 🆔 <b>Sizning Telegram ID:</b>
// <code>${userId}</code>

// 📝 <b>Qanday foydalanish kerak?</b>
// 1️⃣ Saytga o'ting
// 2️⃣ Mahsulotlarni savatga qo'shing
// 3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
// 4️⃣ "Adminga yuborish" tugmasini bosing

// ✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
//       { parse_mode: "HTML" }
//     );
//   } catch (error) {
//     console.error("❌ /start command error:", error.message);
//   }
// });

// /**
//  * /close command - Adminlar uchun suhbatni yopish
//  */
// bot.onText(/\/close/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu buyruq faqat topic ichida ishlaydi!",
//         { message_thread_id: msg.message_thread_id }
//       );
//       return;
//     }

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (userId) {
//       // Userga xabar yuborish
//       try {
//         await bot.sendMessage(
//           userId,
//           "✅ Sizning suhbatingiz admin tomonidan yopildi. Agar yana savol bo'lsa, yangi buyurtma yuboring yoki /start bosing."
//         );
//       } catch (e) {
//         console.error("User xabar yuborishda xato:", e.message);
//       }

//       // Sessionni o'chirish
//       delete reverseSessions[threadId];
//       delete sessions[userId];
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, "🔒 Suhbat yopildi", {
//       message_thread_id: threadId,
//     });
//   } catch (error) {
//     console.error("❌ /close command error:", error.message);
//   }
// });

// /**
//  * /help command - Yordam
//  */
// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish

// ❓ Savollar bo'lsa, buyurtma yuborishingiz mumkin va admin javob beradi.`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help command error:", error.message);
//   }
// });

// /* ================== MESSAGE HANDLERS ================== */

// /**
//  * User → Admin (Private chat)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat private chat
//     if (msg.chat.type !== "private") return;
//     // Commandlarni o'tkazib yuborish
//     if (!msg.text || msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];

//     // Agar session bo'lmasa, userni /start bosgani haqida xabar berish
//     if (!threadId) {
//       await bot.sendMessage(
//         userId,
//         "⚠️ Avval buyurtma yuborishingiz kerak. Iltimos, saytdan buyurtma yuboring yoki /start buyrug'ini bosing."
//       );
//       return;
//     }

//     // Admin groupga xabar yuborish
//     await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });
//   } catch (error) {
//     console.error("❌ User message error:", error.message);
//   }
// });

// /**
//  * Admin → User (Forum topic)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat admin group
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     // Faqat topic ichida
//     if (!msg.message_thread_id) return;
//     // Faqat text
//     if (!msg.text) return;
//     // Command bo'lsa o'tkazib yuborish
//     if (msg.text.startsWith("/")) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     // Agar user topilmasa
//     if (!userId) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu suhbat uchun foydalanuvchi topilmadi. Session yaroqsiz.",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     // Userga admin javobini yuborish
//     await bot.sendMessage(
//       userId,
//       `💬 <b>Admin javob:</b>\n\n${msg.text}`,
//       { parse_mode: "HTML" }
//     );

//     // Adminga tasdiqlash
//     await bot.sendMessage(
//       ADMIN_GROUP_ID,
//       "✅ Xabar yuborildi",
//       {
//         message_thread_id: threadId,
//         reply_to_message_id: msg.message_id,
//       }
//     );
//   } catch (error) {
//     console.error("❌ Admin message error:", error.message);
//     try {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "❌ Xabar yuborishda xatolik yuz berdi. Foydalanuvchi botni bloklagan bo'lishi mumkin.",
//         { message_thread_id: msg.message_thread_id }
//       );
//     } catch (e) {
//       console.error("Xato xabarini yuborishda xato:", e.message);
//     }
//   }
// });

// /* ================== REST API ENDPOINTS ================== */

// /**
//  * POST /send-cart - Savatni adminga yuborish
//  */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     // Validatsiya
//     if (!telegramId) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID kiritilmagan",
//       });
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Savat bo'sh yoki noto'g'ri formatda",
//       });
//     }

//     const userId = parseInt(telegramId);
//     if (isNaN(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID raqam bo'lishi kerak",
//       });
//     }

//     // Buyurtma textini tayyorlash
//     const { text: orderText, totalPrice } = formatOrderText(products);

//     // Userga buyurtma tasdiqlash xabarini yuborish
//     try {
//       await bot.sendMessage(userId, orderText, { parse_mode: "HTML" });
//     } catch (error) {
//       console.error("User send error:", error.message);
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID noto'g'ri yoki botga /start bosilmagan",
//       });
//     }

//     let threadId = sessions[userId];

//     // Agar birinchi buyurtma bo'lsa, yangi topic yaratish
//     if (!threadId) {
//       try {
//         const user = await bot.getChat(userId);
//         const topicTitle = safeTitle(
//           `${user.first_name || "User"} | ${userId}`
//         );

//         const topic = await bot.createForumTopic(ADMIN_GROUP_ID, topicTitle);
//         threadId = topic.message_thread_id;

//         // Sessionni saqlash
//         sessions[userId] = threadId;
//         reverseSessions[threadId] = userId;

//         // Profil ma'lumotini yuborish
//         const profileText = `👤 <b>Yangi haridor profili</b>

// 📛 Ism: ${user.first_name || "Yo'q"}
// 👥 Familiya: ${user.last_name || "Yo'q"}
// 👤 Username: ${user.username ? "@" + user.username : "Yo'q"}
// 🆔 ID: <code>${userId}</code>
// 🔗 <a href="tg://user?id=${userId}">Profilni ochish</a>

// ━━━━━━━━━━━━━━━━━━━━`;

//         await bot.sendMessage(ADMIN_GROUP_ID, profileText, {
//           message_thread_id: threadId,
//           parse_mode: "HTML",
//         });
//       } catch (error) {
//         console.error("Topic creation error:", error.message);
//         return res.status(500).json({
//           success: false,
//           message: "❌ Admin guruhga ulanishda xatolik. Topic yaratilmadi.",
//         });
//       }
//     }

//     // Admin guruhga buyurtmani yuborish
//     await bot.sendMessage(ADMIN_GROUP_ID, orderText, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });

//     // Mahsulot rasmlarini yuborish (agar mavjud bo'lsa)
//     for (const product of products) {
//       if (isValidImageUrl(product.img)) {
//         try {
//           await bot.sendPhoto(
//             ADMIN_GROUP_ID,
//             product.img,
//             {
//               caption: `📦 <b>${product.title}</b>\n💰 ${product.price}$`,
//               parse_mode: "HTML",
//               message_thread_id: threadId,
//             }
//           );
//         } catch (imgError) {
//           console.error(
//             `Rasm yuborishda xato (${product.title}):`,
//             imgError.message
//           );
//         }
//       }
//     }

//     // Muvaffaqiyatli javob
//     res.json({
//       success: true,
//       message: `✅ Buyurtma muvaffaqiyatli yuborildi! Jami: ${totalPrice.toFixed(2)}$`,
//       data: {
//         totalPrice,
//         productCount: products.length,
//         threadId,
//       },
//     });
//   } catch (error) {
//     console.error("❌ SEND CART ERROR:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "❌ Serverda xatolik yuz berdi. Qaytadan urinib ko'ring.",
//     });
//   }
// });

// /**
//  * GET / - Health check endpoint
//  */
// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Telegram Bot Server ishlamoqda",
//     timestamp: new Date().toISOString(),
//   });
// });

// /**
//  * GET /health - Server holati
//  */
// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     uptime: process.uptime(),
//     activeSessions: Object.keys(sessions).length,
//     timestamp: new Date().toISOString(),
//   });
// });

// /* ================== ERROR HANDLING ================== */

// // Global error handler
// bot.on("polling_error", (error) => {
//   console.error("❌ Polling error:", error.message);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("❌ Unhandled Rejection:", reason);
// });

// process.on("uncaughtException", (error) => {
//   console.error("❌ Uncaught Exception:", error);
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
//   console.log(`📡 Health check: http://localhost:${PORT}/health`);
// });















































//BUNDA HAM IMG BN MUAMMO BOR
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560; // forum supergroup
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot va Server muvaffaqiyatli ishga tushdi");

// /* ================== SESSION MANAGEMENT ================== */
// const sessions = {}; // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// /**
//  * Telegram topic title uchun xavfsiz matn yaratish
//  */
// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /**
//  * Rasm URL ini validatsiya qilish
//  */
// function isValidImageUrl(url) {
//   if (!url || typeof url !== "string") return false;
//   const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
//   const lowerUrl = url.toLowerCase();
//   return (
//     url.startsWith("http://") ||
//     url.startsWith("https://") ||
//     validExtensions.some((ext) => lowerUrl.includes(ext))
//   );
// }

// /**
//  * Buyurtma textini formatlash
//  */
// function formatOrderText(products) {
//   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
//   let totalPrice = 0;

//   products.forEach((p, i) => {
//     const price = parseFloat(p.price) || 0;
//     totalPrice += price;

//     text += `${i + 1}. <b>${p.title || "Noma'lum mahsulot"}</b>\n`;
//     text += `   💰 Narxi: ${price.toFixed(2)}$\n\n`;
//   });

//   text += `━━━━━━━━━━━━━━━━━━━━\n`;
//   text += `<b>Jami:</b> ${totalPrice.toFixed(2)}$`;

//   return { text, totalPrice };
// }

// /* ================== BOT COMMANDS ================== */

// /**
//  * /start command - Botni boshlash
//  */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   const userName = msg.from.first_name || "Foydalanuvchi";

//   try {
//     await bot.sendMessage(
//       userId,
//       `👋 Assalomu aleykum, <b>${userName}</b>!

// Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

// 🆔 <b>Sizning Telegram ID:</b>
// <code>${userId}</code>

// 📝 <b>Qanday foydalanish kerak?</b>
// 1️⃣ Saytga o'ting
// 2️⃣ Mahsulotlarni savatga qo'shing
// 3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
// 4️⃣ "Adminga yuborish" tugmasini bosing

// ✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
//       { parse_mode: "HTML" }
//     );
//   } catch (error) {
//     console.error("❌ /start command error:", error.message);
//   }
// });

// /**
//  * /close command - Adminlar uchun suhbatni yopish
//  */
// bot.onText(/\/close/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu buyruq faqat topic ichida ishlaydi!",
//         { message_thread_id: msg.message_thread_id }
//       );
//       return;
//     }

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (userId) {
//       // Userga xabar yuborish
//       try {
//         await bot.sendMessage(
//           userId,
//           "✅ Sizning suhbatingiz admin tomonidan yopildi. Agar yana savol bo'lsa, yangi buyurtma yuboring yoki /start bosing."
//         );
//       } catch (e) {
//         console.error("User xabar yuborishda xato:", e.message);
//       }

//       // Sessionni o'chirish
//       delete reverseSessions[threadId];
//       delete sessions[userId];
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, "🔒 Suhbat yopildi", {
//       message_thread_id: threadId,
//     });
//   } catch (error) {
//     console.error("❌ /close command error:", error.message);
//   }
// });

// /**
//  * /help command - Yordam
//  */
// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish

// ❓ Savollar bo'lsa, buyurtma yuborishingiz mumkin va admin javob beradi.`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help command error:", error.message);
//   }
// });

// /* ================== MESSAGE HANDLERS ================== */

// /**
//  * User → Admin (Private chat)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat private chat
//     if (msg.chat.type !== "private") return;
//     // Commandlarni o'tkazib yuborish
//     if (!msg.text || msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];

//     // Agar session bo'lmasa, userni /start bosgani haqida xabar berish
//     if (!threadId) {
//       await bot.sendMessage(
//         userId,
//         "⚠️ Avval buyurtma yuborishingiz kerak. Iltimos, saytdan buyurtma yuboring yoki /start buyrug'ini bosing."
//       );
//       return;
//     }

//     // Admin groupga xabar yuborish
//     await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });
//   } catch (error) {
//     console.error("❌ User message error:", error.message);
//   }
// });

// /**
//  * Admin → User (Forum topic)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat admin group
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     // Faqat topic ichida
//     if (!msg.message_thread_id) return;
//     // Faqat text
//     if (!msg.text) return;
//     // Command bo'lsa o'tkazib yuborish
//     if (msg.text.startsWith("/")) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     // Agar user topilmasa
//     if (!userId) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu suhbat uchun foydalanuvchi topilmadi. Session yaroqsiz.",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     // Userga admin javobini yuborish
//     await bot.sendMessage(
//       userId,
//       `💬 <b>Admin javob:</b>\n\n${msg.text}`,
//       { parse_mode: "HTML" }
//     );

//     // Adminga tasdiqlash
//     await bot.sendMessage(
//       ADMIN_GROUP_ID,
//       "✅ Xabar yuborildi",
//       {
//         message_thread_id: threadId,
//         reply_to_message_id: msg.message_id,
//       }
//     );
//   } catch (error) {
//     console.error("❌ Admin message error:", error.message);
//     try {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "❌ Xabar yuborishda xatolik yuz berdi. Foydalanuvchi botni bloklagan bo'lishi mumkin.",
//         { message_thread_id: msg.message_thread_id }
//       );
//     } catch (e) {
//       console.error("Xato xabarini yuborishda xato:", e.message);
//     }
//   }
// });

// /* ================== REST API ENDPOINTS ================== */

// /**
//  * POST /send-cart - Savatni adminga yuborish
//  */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     // Validatsiya
//     if (!telegramId) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID kiritilmagan",
//       });
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Savat bo'sh yoki noto'g'ri formatda",
//       });
//     }

//     const userId = parseInt(telegramId);
//     if (isNaN(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID raqam bo'lishi kerak",
//       });
//     }

//     // Buyurtma textini tayyorlash
//     const { text: orderText, totalPrice } = formatOrderText(products);

//     // Userga buyurtma tasdiqlash xabarini yuborish
//     try {
//       await bot.sendMessage(userId, orderText, { parse_mode: "HTML" });
//     } catch (error) {
//       console.error("User send error:", error.message);
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID noto'g'ri yoki botga /start bosilmagan",
//       });
//     }

//     let threadId = sessions[userId];

//     // Agar birinchi buyurtma bo'lsa, yangi topic yaratish
//     if (!threadId) {
//       try {
//         const user = await bot.getChat(userId);
//         const topicTitle = safeTitle(
//           `${user.first_name || "User"} | ${userId}`
//         );

//         const topic = await bot.createForumTopic(ADMIN_GROUP_ID, topicTitle);
//         threadId = topic.message_thread_id;

//         // Sessionni saqlash
//         sessions[userId] = threadId;
//         reverseSessions[threadId] = userId;

//         // Profil ma'lumotini yuborish
//         const profileText = `👤 <b>Yangi haridor profili</b>

// 📛 Ism: ${user.first_name || "Yo'q"}
// 👥 Familiya: ${user.last_name || "Yo'q"}
// 👤 Username: ${user.username ? "@" + user.username : "Yo'q"}
// 🆔 ID: <code>${userId}</code>
// 🔗 <a href="tg://user?id=${userId}">Profilni ochish</a>

// ━━━━━━━━━━━━━━━━━━━━`;

//         await bot.sendMessage(ADMIN_GROUP_ID, profileText, {
//           message_thread_id: threadId,
//           parse_mode: "HTML",
//         });
//       } catch (error) {
//         console.error("Topic creation error:", error.message);
//         return res.status(500).json({
//           success: false,
//           message: "❌ Admin guruhga ulanishda xatolik. Topic yaratilmadi.",
//         });
//       }
//     }

//     // Mahsulot rasmlarini yuborish (agar mavjud bo'lsa)
//     const imagePromises = products.map(async (product, index) => {
//       if (isValidImageUrl(product.img)) {
//         try {
//           await bot.sendPhoto(
//             ADMIN_GROUP_ID,
//             product.img,
//             {
//               caption: `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n#Mahsulot_${index + 1}`,
//               parse_mode: "HTML",
//               message_thread_id: threadId,
//             }
//           );
//           // Telegram rate limit uchun kutish
//           await new Promise(resolve => setTimeout(resolve, 100));
//         } catch (imgError) {
//           console.error(
//             `Rasm yuborishda xato (${product.title}):`,
//             imgError.message
//           );
//         }
//       }
//     });

//     // Barcha rasmlar yuborilishini kutish
//     await Promise.all(imagePromises);

//     // Admin guruhga buyurtma xulosasi
//     await bot.sendMessage(ADMIN_GROUP_ID, orderText, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });

//     // Muvaffaqiyatli javob
//     res.json({
//       success: true,
//       message: `✅ Buyurtma muvaffaqiyatli yuborildi! Jami: ${totalPrice.toFixed(2)}$`,
//       data: {
//         totalPrice,
//         productCount: products.length,
//         threadId,
//       },
//     });
//   } catch (error) {
//     console.error("❌ SEND CART ERROR:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "❌ Serverda xatolik yuz berdi. Qaytadan urinib ko'ring.",
//     });
//   }
// });

// /**
//  * GET / - Health check endpoint
//  */
// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Telegram Bot Server ishlamoqda",
//     timestamp: new Date().toISOString(),
//   });
// });

// /**
//  * GET /health - Server holati
//  */
// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     uptime: process.uptime(),
//     activeSessions: Object.keys(sessions).length,
//     timestamp: new Date().toISOString(),
//   });
// });

// /* ================== ERROR HANDLING ================== */

// // Global error handler
// bot.on("polling_error", (error) => {
//   console.error("❌ Polling error:", error.message);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("❌ Unhandled Rejection:", reason);
// });

// process.on("uncaughtException", (error) => {
//   console.error("❌ Uncaught Exception:", error);
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
//   console.log(`📡 Health check: http://localhost:${PORT}/health`);
// });






















































//BU DEYARLI TOLIQ LEKIN PRODUCT 2MARTA KELITTI
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// /* ================== ES MODULE DIRNAME ================== */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;

// // Backend server (PUBLIC URL kerak bo'lsa)
// const BACKEND_URL = process.env.BACKEND_URL || "";

// /* ================== BOT OPTIONS ================== */
// const botOptions = {
//   polling: true,
// };

// // Agar Telegram bloklangan bo'lsa, VPN yoqing yoki proxy sozlang
// // Proxy uchun: npm install https-proxy-agent
// // if (process.env.USE_PROXY === "true") {
// //   const { HttpsProxyAgent } = await import("https-proxy-agent");
// //   botOptions.request = {
// //     agent: new HttpsProxyAgent(`http://127.0.0.1:1080`),
// //   };
// // }

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, botOptions);

// console.log("🤖 Bot va Server muvaffaqiyatli ishga tushdi");

// /* ================== STATIC FILES (rasmlar uchun) ================== */
// // Agar bu server ham rasmlarni serve qilsa
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ================== SESSION MANAGEMENT ================== */
// const sessions = {}; // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// /**
//  * Telegram topic title uchun xavfsiz matn yaratish
//  */
// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /**
//  * Rasm URL yoki path ni to'g'ri formatga keltirish
//  * MUHIM: Telegram faqat public URL qabul qiladi (localhost ISHLAMAYDI!)
//  */
// async function getImageSource(imgPath, backendUrl) {
//   if (!imgPath) return null;

//   // Agar to'liq public URL bo'lsa
//   if (imgPath.startsWith("http://") || imgPath.startsWith("https://")) {
//     // localhost bo'lsa, local file ishlatamiz
//     if (imgPath.includes("localhost") || imgPath.includes("127.0.0.1")) {
//       const filename = path.basename(imgPath);
//       const localPath = path.join(__dirname, "uploads", filename);
      
//       if (fs.existsSync(localPath)) {
//         return { type: "file", source: localPath };
//       }
//       return null;
//     }
    
//     return { type: "url", source: imgPath };
//   }

//   // Agar relative path bo'lsa
//   if (imgPath.startsWith("/uploads/") || imgPath.startsWith("uploads/")) {
//     const filename = path.basename(imgPath);
//     const localPath = path.join(__dirname, "uploads", filename);
    
//     // Avval local file mavjudligini tekshirish
//     if (fs.existsSync(localPath)) {
//       return { type: "file", source: localPath };
//     }
    
//     // Agar backend public URL bo'lsa va localhost emas
//     if (backendUrl && !backendUrl.includes("localhost")) {
//       const cleanPath = imgPath.startsWith("/") ? imgPath : `/${imgPath}`;
//       return { type: "url", source: `${backendUrl}${cleanPath}` };
//     }
    
//     return null;
//   }

//   return null;
// }

// /**
//  * Buyurtma textini formatlash
//  */
// function formatOrderText(products) {
//   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
//   let totalPrice = 0;

//   products.forEach((p, i) => {
//     const price = parseFloat(p.price) || 0;
//     totalPrice += price;

//     text += `${i + 1}. <b>${p.title || "Noma'lum mahsulot"}</b>\n`;
//     text += `   💰 Narxi: ${price.toFixed(2)}$\n\n`;
//   });

//   text += `━━━━━━━━━━━━━━━━━━━━\n`;
//   text += `<b>Jami:</b> ${totalPrice.toFixed(2)}$`;

//   return { text, totalPrice };
// }

// /* ================== BOT COMMANDS ================== */

// /**
//  * /start command - Botni boshlash
//  */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   const userName = msg.from.first_name || "Foydalanuvchi";

//   try {
//     await bot.sendMessage(
//       userId,
//       `👋 Assalomu aleykum, <b>${userName}</b>!

// Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

// 🆔 <b>Sizning Telegram ID:</b>
// <code>${userId}</code>

// 📝 <b>Qanday foydalanish kerak?</b>
// 1️⃣ Saytga o'ting
// 2️⃣ Mahsulotlarni savatga qo'shing
// 3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
// 4️⃣ "Adminga yuborish" tugmasini bosing

// ✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
//       { parse_mode: "HTML" }
//     );
//   } catch (error) {
//     console.error("❌ /start command error:", error.message);
//   }
// });

// /**
//  * /close command - Adminlar uchun suhbatni yopish
//  */
// bot.onText(/\/close/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu buyruq faqat topic ichida ishlaydi!",
//         { message_thread_id: msg.message_thread_id }
//       );
//       return;
//     }

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (userId) {
//       // Userga xabar yuborish
//       try {
//         await bot.sendMessage(
//           userId,
//           "✅ Sizning suhbatingiz admin tomonidan yopildi. Agar yana savol bo'lsa, yangi buyurtma yuboring yoki /start bosing."
//         );
//       } catch (e) {
//         console.error("User xabar yuborishda xato:", e.message);
//       }

//       // Sessionni o'chirish
//       delete reverseSessions[threadId];
//       delete sessions[userId];
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, "🔒 Suhbat yopildi", {
//       message_thread_id: threadId,
//     });
//   } catch (error) {
//     console.error("❌ /close command error:", error.message);
//   }
// });

// /**
//  * /help command - Yordam
//  */
// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish

// ❓ Savollar bo'lsa, buyurtma yuborishingiz mumkin va admin javob beradi.`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help command error:", error.message);
//   }
// });

// /* ================== MESSAGE HANDLERS ================== */

// /**
//  * User → Admin (Private chat)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat private chat
//     if (msg.chat.type !== "private") return;
//     // Commandlarni o'tkazib yuborish
//     if (!msg.text || msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];

//     // Agar session bo'lmasa, userni /start bosgani haqida xabar berish
//     if (!threadId) {
//       await bot.sendMessage(
//         userId,
//         "⚠️ Avval buyurtma yuborishingiz kerak. Iltimos, saytdan buyurtma yuboring yoki /start buyrug'ini bosing."
//       );
//       return;
//     }

//     // Admin groupga xabar yuborish
//     await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });
//   } catch (error) {
//     console.error("❌ User message error:", error.message);
//   }
// });

// /**
//  * Admin → User (Forum topic)
//  */
// bot.on("message", async (msg) => {
//   try {
//     // Faqat admin group
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     // Faqat topic ichida
//     if (!msg.message_thread_id) return;
//     // Faqat text
//     if (!msg.text) return;
//     // Command bo'lsa o'tkazib yuborish
//     if (msg.text.startsWith("/")) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     // Agar user topilmasa
//     if (!userId) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu suhbat uchun foydalanuvchi topilmadi. Session yaroqsiz.",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     // Userga admin javobini yuborish
//     await bot.sendMessage(
//       userId,
//       `💬 <b>Admin javob:</b>\n\n${msg.text}`,
//       { parse_mode: "HTML" }
//     );

//     // Adminga tasdiqlash
//     await bot.sendMessage(
//       ADMIN_GROUP_ID,
//       "✅ Xabar yuborildi",
//       {
//         message_thread_id: threadId,
//         reply_to_message_id: msg.message_id,
//       }
//     );
//   } catch (error) {
//     console.error("❌ Admin message error:", error.message);
//     try {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "❌ Xabar yuborishda xatolik yuz berdi. Foydalanuvchi botni bloklagan bo'lishi mumkin.",
//         { message_thread_id: msg.message_thread_id }
//       );
//     } catch (e) {
//       console.error("Xato xabarini yuborishda xato:", e.message);
//     }
//   }
// });

// /* ================== REST API ENDPOINTS ================== */

// /**
//  * POST /send-cart - Savatni adminga yuborish
//  */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     // Validatsiya
//     if (!telegramId) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID kiritilmagan",
//       });
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Savat bo'sh yoki noto'g'ri formatda",
//       });
//     }

//     const userId = parseInt(telegramId);
//     if (isNaN(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID raqam bo'lishi kerak",
//       });
//     }

//     // Buyurtma textini tayyorlash
//     const { text: orderText, totalPrice } = formatOrderText(products);

//     // Userga buyurtma tasdiqlash xabarini yuborish
//     try {
//       await bot.sendMessage(userId, orderText, { parse_mode: "HTML" });
//     } catch (error) {
//       console.error("User send error:", error.message);
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID noto'g'ri yoki botga /start bosilmagan",
//       });
//     }

//     let threadId = sessions[userId];

//     // Agar birinchi buyurtma bo'lsa, yangi topic yaratish
//     if (!threadId) {
//       try {
//         const user = await bot.getChat(userId);
//         const topicTitle = safeTitle(
//           `${user.first_name || "User"} | ${userId}`
//         );

//         const topic = await bot.createForumTopic(ADMIN_GROUP_ID, topicTitle);
//         threadId = topic.message_thread_id;

//         // Sessionni saqlash
//         sessions[userId] = threadId;
//         reverseSessions[threadId] = userId;

//         // Profil ma'lumotini yuborish
//         const profileText = `👤 <b>Yangi haridor profili</b>

// 📛 Ism: ${user.first_name || "Yo'q"}
// 👥 Familiya: ${user.last_name || "Yo'q"}
// 👤 Username: ${user.username ? "@" + user.username : "Yo'q"}
// 🆔 ID: <code>${userId}</code>
// 🔗 <a href="tg://user?id=${userId}">Profilni ochish</a>

// ━━━━━━━━━━━━━━━━━━━━`;

//         await bot.sendMessage(ADMIN_GROUP_ID, profileText, {
//           message_thread_id: threadId,
//           parse_mode: "HTML",
//         });
//       } catch (error) {
//         console.error("Topic creation error:", error.message);
//         return res.status(500).json({
//           success: false,
//           message: "❌ Admin guruhga ulanishda xatolik. Topic yaratilmadi.",
//         });
//       }
//     }

//     // Mahsulot rasmlarini yuborish (FAQAT local file orqali, chunki localhost URL ishlamaydi)
//     const imagePromises = products.map(async (product, index) => {
//       const imageSource = await getImageSource(product.img, BACKEND_URL);
      
//       if (imageSource) {
//         try {
//           const caption = `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n#Mahsulot_${index + 1}`;
          
//           if (imageSource.type === "url") {
//             // Faqat public URL bo'lsa
//             console.log(`📤 URL orqali yuborilmoqda: ${imageSource.source}`);
//             await bot.sendPhoto(
//               ADMIN_GROUP_ID,
//               imageSource.source,
//               {
//                 caption,
//                 parse_mode: "HTML",
//                 message_thread_id: threadId,
//               }
//             );
//           } else if (imageSource.type === "file") {
//             // Local file orqali (ASOSIY USUL)
//             console.log(`📤 File orqali yuborilmoqda: ${path.basename(imageSource.source)}`);
//             await bot.sendPhoto(
//               ADMIN_GROUP_ID,
//               imageSource.source,
//               {
//                 caption,
//                 parse_mode: "HTML",
//                 message_thread_id: threadId,
//               }
//             );
//           }
          
//           console.log(`✅ Rasm yuborildi: ${product.title}`);
          
//           // Telegram rate limit uchun kutish
//           await new Promise(resolve => setTimeout(resolve, 150));
//         } catch (imgError) {
//           console.error(
//             `❌ Rasm yuborishda xato (${product.title}):`,
//             imgError.message
//           );
          
//           // Agar rasm yuborilmasa, faqat text yuborish
//         //   await bot.sendMessage(
//         //     ADMIN_GROUP_ID,
//         //     `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n❌ Rasm yuklanmadi: ${imgError.message}`,
//         //     {
//         //       parse_mode: "HTML",
//         //       message_thread_id: threadId,
//         //     }
//         //   );
//         }
//       } else {
//         console.log(`⚠️ Rasm topilmadi: ${product.title} (${product.img})`);
//         // Rasm topilmasa, faqat text
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n🖼️ Rasm yo'q`,
//           {
//             parse_mode: "HTML",
//             message_thread_id: threadId,
//           }
//         );
//       }
//     });

//     // Barcha rasmlar yuborilishini kutish
//     await Promise.all(imagePromises);

//     // Admin guruhga buyurtma xulosasi
//     await bot.sendMessage(ADMIN_GROUP_ID, orderText, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });

//     // Muvaffaqiyatli javob
//     res.json({
//       success: true,
//       message: `✅ Buyurtma muvaffaqiyatli yuborildi! Jami: ${totalPrice.toFixed(2)}$`,
//       data: {
//         totalPrice,
//         productCount: products.length,
//         threadId,
//       },
//     });
//   } catch (error) {
//     console.error("❌ SEND CART ERROR:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "❌ Serverda xatolik yuz berdi. Qaytadan urinib ko'ring.",
//     });
//   }
// });

// /**
//  * GET / - Health check endpoint
//  */
// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Telegram Bot Server ishlamoqda",
//     timestamp: new Date().toISOString(),
//   });
// });

// /**
//  * GET /health - Server holati
//  */
// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     uptime: process.uptime(),
//     activeSessions: Object.keys(sessions).length,
//     timestamp: new Date().toISOString(),
//   });
// });

// /* ================== ERROR HANDLING ================== */

// // Global error handler
// bot.on("polling_error", (error) => {
//   console.error("❌ Polling error:", error.message);
// });

// process.on("unhandledRejection", (reason, promise) => {
//   console.error("❌ Unhandled Rejection:", reason);
// });

// process.on("uncaughtException", (error) => {
//   console.error("❌ Uncaught Exception:", error);
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
//   console.log(`📡 Health check: http://localhost:${PORT}/health`);
// });










































































//SURRENCY BN MUAMMO BOR LEKIN OZI ISHLAYDIGAN KOD
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// /* ================== ES MODULE DIRNAME ================== */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot va Server ishga tushdi");

// /* ================== STATIC FILES ================== */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ================== SESSION MANAGEMENT ================== */
// const sessions = {}; // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// async function getImageSource(imgPath) {
//   if (!imgPath) return null;

//   // Relative path bo'lsa
//   if (imgPath.startsWith("/uploads/") || imgPath.startsWith("uploads/")) {
//     const filename = path.basename(imgPath);
//     const localPath = path.join(__dirname, "uploads", filename);
    
//     if (fs.existsSync(localPath)) {
//       return { type: "file", source: localPath };
//     }
//   }

//   return null;
// }

// function formatOrderText(products) {
//   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
//   let totalPrice = 0;

//   products.forEach((p, i) => {
//     const price = parseFloat(p.price) || 0;
//     totalPrice += price;
//     text += `${i + 1}. <b>${p.title || "Noma'lum mahsulot"}</b>\n`;
//     text += `   💰 Narxi: ${price.toFixed(2)}\n\n`;
//   });

//   text += `━━━━━━━━━━━━━━━━━━━━\n`;
//   text += `<b>Jami:</b> ${totalPrice.toFixed(2)}`;

//   return { text, totalPrice };
// }

// /* ================== BOT COMMANDS ================== */

// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   const userName = msg.from.first_name || "Foydalanuvchi";

//   try {
//     await bot.sendMessage(
//       userId,
//       `👋 Assalomu aleykum, <b>${userName}</b>!

// Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

// 🆔 <b>Sizning Telegram ID:</b>
// <code>${userId}</code>

// 📝 <b>Qanday foydalanish kerak?</b>
// 1️⃣ Saytga o'ting
// 2️⃣ Mahsulotlarni savatga qo'shing
// 3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
// 4️⃣ "Adminga yuborish" tugmasini bosing

// ✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
//       { parse_mode: "HTML" }
//     );
//   } catch (error) {
//     console.error("❌ /start error:", error.message);
//   }
// });

// bot.onText(/\/close/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (userId) {
//       try {
//         await bot.sendMessage(
//           userId,
//           "✅ Sizning suhbatingiz admin tomonidan yopildi. Agar yana savol bo'lsa, yangi buyurtma yuboring."
//         );
//       } catch (e) {
//         console.error("User xabar error:", e.message);
//       }

//       delete reverseSessions[threadId];
//       delete sessions[userId];
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, "🔒 Suhbat yopildi", {
//       message_thread_id: threadId,
//     });
//   } catch (error) {
//     console.error("❌ /close error:", error.message);
//   }
// });

// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help error:", error.message);
//   }
// });

// /* ================== MESSAGE HANDLERS ================== */

// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.type !== "private") return;
//     if (!msg.text || msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];

//     if (!threadId) {
//       await bot.sendMessage(
//         userId,
//         "⚠️ Avval buyurtma yuborishingiz kerak. Saytdan buyurtma yuboring yoki /start bosing."
//       );
//       return;
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });
//   } catch (error) {
//     console.error("❌ User message error:", error.message);
//   }
// });

// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;
//     if (!msg.text) return;
//     if (msg.text.startsWith("/")) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (!userId) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu suhbat uchun foydalanuvchi topilmadi.",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     await bot.sendMessage(
//       userId,
//       `💬 <b>Admin javob:</b>\n\n${msg.text}`,
//       { parse_mode: "HTML" }
//     );

//     // await bot.sendMessage(ADMIN_GROUP_ID, "✅ Xabar yuborildi", {
//     //   message_thread_id: threadId,
//     //   reply_to_message_id: msg.message_id,
//     // });
//   } catch (error) {
//     console.error("❌ Admin message error:", error.message);
//   }
// });

// /* ================== REST API ================== */

// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     if (!telegramId) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID kiritilmagan",
//       });
//     }

//     if (!Array.isArray(products) || products.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Savat bo'sh",
//       });
//     }

//     const userId = parseInt(telegramId);
//     if (isNaN(userId)) {
//       return res.status(400).json({
//         success: false,
//         message: "❌ Telegram ID raqam bo'lishi kerak",
//       });
//     }

//     const { text: orderText, totalPrice } = formatOrderText(products);

//     let threadId = sessions[userId];

//     // Birinchi buyurtma bo'lsa, yangi topic yaratish
//     if (!threadId) {
//       try {
//         const user = await bot.getChat(userId);
//         const topicTitle = safeTitle(
//           `${user.first_name || "User"} | ${userId}`
//         );

//         const topic = await bot.createForumTopic(ADMIN_GROUP_ID, topicTitle);
//         threadId = topic.message_thread_id;

//         sessions[userId] = threadId;
//         reverseSessions[threadId] = userId;

//         const profileText = `👤 <b>Yangi haridor profili</b>

// 📛 Ism: ${user.first_name || "Yo'q"}
// 👥 Familiya: ${user.last_name || "Yo'q"}
// 👤 Username: ${user.username ? "@" + user.username : "Yo'q"}
// 🆔 ID: <code>${userId}</code>
// 🔗 <a href="tg://user?id=${userId}">Profilni ochish</a>

// ━━━━━━━━━━━━━━━━━━━━`;

//         await bot.sendMessage(ADMIN_GROUP_ID, profileText, {
//           message_thread_id: threadId,
//           parse_mode: "HTML",
//         });
//       } catch (error) {
//         console.error("Topic yaratish error:", error.message);
//         return res.status(500).json({
//           success: false,
//           message: "❌ Admin guruhga ulanishda xatolik",
//         });
//       }
//     }

//     // USERGA mahsulotlarni yuborish
//     console.log(`📤 Userga ${products.length} ta mahsulot yuborilmoqda...`);

//     for (const [index, product] of products.entries()) {
//       const imageSource = await getImageSource(product.img);

//       try {
//         const caption = `📦 <b>${product.title}</b>\n💰 Narxi: ${product.price}$`;

//         if (imageSource && imageSource.type === "file") {
//           await bot.sendPhoto(userId, imageSource.source, {
//             caption,
//             parse_mode: "HTML",
//           });
//         } else {
//           await bot.sendMessage(userId, caption, {
//             parse_mode: "HTML",
//           });
//         }

//         await new Promise((resolve) => setTimeout(resolve, 100));
//       } catch (userImgError) {
//         console.error(`User error (${product.title}):`, userImgError.message);
//         await bot.sendMessage(userId, `📦 ${product.title}\n💰 ${product.price}$`);
//       }
//     }

//     // Userga jami
//     await bot.sendMessage(
//       userId,
//       `✅ <b>Buyurtma qabul qilindi!</b>\n\n💰 Jami: ${totalPrice.toFixed(2)}$\n\nTez orada admin siz bilan bog'lanadi.`,
//       { parse_mode: "HTML" }
//     );

//     // ADMINGA mahsulotlarni yuborish
//     console.log(`📤 Adminga ${products.length} ta mahsulot yuborilmoqda...`);

//     for (const [index, product] of products.entries()) {
//       const imageSource = await getImageSource(product.img);

//       try {
//         const caption = `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n#Mahsulot_${index + 1}`;

//         if (imageSource && imageSource.type === "file") {
//           console.log(`📤 File: ${path.basename(imageSource.source)}`);
//           await bot.sendPhoto(ADMIN_GROUP_ID, imageSource.source, {
//             caption,
//             parse_mode: "HTML",
//             message_thread_id: threadId,
//           });
//         } else {
//           console.log(`⚠️ Rasm yo'q: ${product.title}`);
//           await bot.sendMessage(
//             ADMIN_GROUP_ID,
//             `${caption}\n\n🖼️ Rasm topilmadi`,
//             {
//               parse_mode: "HTML",
//               message_thread_id: threadId,
//             }
//           );
//         }

//         console.log(`✅ Yuborildi: ${product.title}`);
//         await new Promise((resolve) => setTimeout(resolve, 150));
//       } catch (adminImgError) {
//         console.error(`Admin error (${product.title}):`, adminImgError.message);
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `📦 <b>${product.title}</b>\n💰 ${product.price}$\n\n❌ Rasm yuborilmadi`,
//           {
//             parse_mode: "HTML",
//             message_thread_id: threadId,
//           }
//         );
//       }
//     }

//     // Adminga jami (xulosa)
//     await bot.sendMessage(ADMIN_GROUP_ID, orderText, {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     });

//     res.json({
//       success: true,
//       message: `✅ Buyurtma muvaffaqiyatli yuborildi! Jami: ${totalPrice.toFixed(2)}$`,
//       data: {
//         totalPrice,
//         productCount: products.length,
//         threadId,
//       },
//     });
//   } catch (error) {
//     console.error("❌ SEND CART ERROR:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "❌ Serverda xatolik yuz berdi",
//     });
//   }
// });

// app.get("/", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "Telegram Bot Server ishlamoqda",
//     timestamp: new Date().toISOString(),
//   });
// });

// app.get("/health", (req, res) => {
//   res.json({
//     status: "healthy",
//     uptime: process.uptime(),
//     activeSessions: Object.keys(sessions).length,
//     timestamp: new Date().toISOString(),
//   });
// });

// /* ================== ERROR HANDLING ================== */

// bot.on("polling_error", (error) => {
//   console.error("❌ Polling error:", error.message);
// });

// process.on("unhandledRejection", (reason) => {
//   console.error("❌ Unhandled Rejection:", reason);
// });

// process.on("uncaughtException", (error) => {
//   console.error("❌ Uncaught Exception:", error);
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlamoqda`);
//   console.log(`📡 Health check: http://localhost:${PORT}/health`);
// });





































































//BUNDA MUAMMO FAQATGINA ADMIN BN USER GAPALSHGANIDA MUAMMO BOR EDI
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";

// /* ================== DIRNAME ================== */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;
// const EXCHANGE_RATE = 11000;

// /* ================== APP ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json({ limit: "10mb" }));

// /* ================== BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// /* ================== STATIC ================== */
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// /* ================== SESSION ================== */
// const sessions = {};
// const reverseSessions = {};

// /* ================== HELPERS ================== */

// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120);
// }

// async function getImageSource(imgPath) {
//   if (!imgPath) return null;

//   if (imgPath.startsWith("/uploads/") || imgPath.startsWith("uploads/")) {
//     const file = path.join(__dirname, "uploads", path.basename(imgPath));
//     if (fs.existsSync(file)) {
//       return { type: "file", source: file };
//     }
//   }
//   return null;
// }

// /* ================== ORDER FORMAT ================== */
// function formatOrderText(products) {
//   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
//   let totalUSD = 0;
//   let totalUZS = 0;

//   products.forEach((p, i) => {
//     const price = Number(p.price) || 0;
//     const qty = Number(p.quantity) || 1;
//     const total = price * qty;
//     const currency = p.currency || "$";

//     text += `${i + 1}. <b>${p.title}</b>\n`;
//     text += `${qty} × ${price} ${currency} = ${total} ${currency}\n\n`;

//     if (currency === "$" || currency === "USD") {
//       totalUSD += total;
//       totalUZS += total * EXCHANGE_RATE;
//     }

//     if (currency === "UZS" || currency === "so'm") {
//       totalUZS += total;
//       totalUSD += total / EXCHANGE_RATE;
//     }
//   });

//   text += `━━━━━━━━━━━━━━━━━━━━\n`;
//   text += `<b>Jami:</b>\n`;
//   text += `${totalUSD.toFixed(2)} $\n`;
//   text += `${Math.round(totalUZS).toLocaleString()} so'm`;

//   return { text, totalUSD, totalUZS };
// }

// /* ================== BOT COMMANDS ================== */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   const userName = msg.from.first_name || "Foydalanuvchi";

//   try {
//     await bot.sendMessage(
//       userId,
//       `👋 Assalomu aleykum, <b>${userName}</b>!

// Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

// 🆔 <b>Sizning Telegram ID:</b>
// <code>${userId}</code>

// 📝 <b>Qanday foydalanish kerak?</b>
// 1️⃣ Saytga o'ting
// 2️⃣ Mahsulotlarni savatga qo'shing
// 3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
// 4️⃣ "Adminga yuborish" tugmasini bosing

// ✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
//       { parse_mode: "HTML" }
//     );
//   } catch (error) {
//     console.error("❌ /start error:", error.message);
//   }
// });

// bot.onText(/\/close/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (userId) {
//       try {
//         await bot.sendMessage(
//           userId,
//           "✅ Sizning suhbatingiz admin tomonidan yopildi. Agar yana savol bo'lsa, yangi buyurtma yuboring."
//         );
//       } catch (e) {
//         console.error("User xabar error:", e.message);
//       }

//       delete reverseSessions[threadId];
//       delete sessions[userId];
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, "🔒 Suhbat yopildi", {
//       message_thread_id: threadId,
//     });
//   } catch (error) {
//     console.error("❌ /close error:", error.message);
//   }
// });

// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help error:", error.message);
//   }
// });

// /* ================== MESSAGE HANDLERS ================== */

// // bot.on("message", async (msg) => {
// //   try {
// //     if (msg.chat.type !== "private") return;
// //     if (!msg.text || msg.text.startsWith("/")) return;

// //     const userId = msg.from.id;
// //     const threadId = sessions[userId];

// //     if (!threadId) {
// //       await bot.sendMessage(
// //         userId,
// //         "⚠️ Avval buyurtma yuborishingiz kerak. Saytdan buyurtma yuboring yoki /start bosing."
// //       );
// //       return;
// //     }

// //     await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
// //       message_thread_id: threadId,
// //       parse_mode: "HTML",
// //     });
// //   } catch (error) {
// //     console.error("❌ User message error:", error.message);
// //   }
// // });


// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.type !== "private") return;
//     if (msg.text && msg.text.startsWith("/")) return;

//     const userId = msg.from.id;
//     const threadId = sessions[userId];

//     if (!threadId) {
//       if (msg.text) {
//         await bot.sendMessage(
//           userId,
//           "⚠️ Avval buyurtma yuboring yoki /start bosing."
//         );
//       }
//       return;
//     }

//     const options = {
//       message_thread_id: threadId,
//       parse_mode: "HTML",
//     };

//     /* ===== TEXT ===== */
//     if (msg.text) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         `👤 <b>Haridor:</b>\n${msg.text}`,
//         options
//       );
//     }

//     /* ===== VOICE ===== */
//     if (msg.voice) {
//       await bot.sendVoice(
//         ADMIN_GROUP_ID,
//         msg.voice.file_id,
//         options
//       );
//     }

//     /* ===== VIDEO ===== */
//     if (msg.video) {
//       await bot.sendVideo(
//         ADMIN_GROUP_ID,
//         msg.video.file_id,
//         options
//       );
//     }

//     /* ===== VIDEO NOTE ===== */
//     if (msg.video_note) {
//       await bot.sendVideoNote(
//         ADMIN_GROUP_ID,
//         msg.video_note.file_id,
//         { message_thread_id: threadId }
//       );
//     }

//     /* ===== DOCUMENT ===== */
//     if (msg.document) {
//       await bot.sendDocument(
//         ADMIN_GROUP_ID,
//         msg.document.file_id,
//         options
//       );
//     }

//     /* ===== PHOTO ===== */
//     if (msg.photo) {
//       const photo = msg.photo[msg.photo.length - 1];
//       await bot.sendPhoto(
//         ADMIN_GROUP_ID,
//         photo.file_id,
//         options
//       );
//     }

//   } catch (error) {
//     console.error("❌ User media error:", error.message);
//   }
// });

// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;
//     if (!msg.text) return;
//     if (msg.text.startsWith("/")) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];

//     if (!userId) {
//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "⚠️ Bu suhbat uchun foydalanuvchi topilmadi.",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     await bot.sendMessage(
//       userId,
//       `💬 <b>Admin javob:</b>\n\n${msg.text}`,
//       { parse_mode: "HTML" }
//     );

//   } catch (error) {
//     console.error("❌ Admin message error:", error.message);
//   }
// });
// /* ================== API ================== */

// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     if (!telegramId || !Array.isArray(products)) {
//       return res.status(400).json({ success: false });
//     }

//     const userId = Number(telegramId);
//     if (isNaN(userId)) {
//       return res.status(400).json({ success: false });
//     }

//     const { text, totalUSD, totalUZS } = formatOrderText(products);

//     let threadId = sessions[userId];

//     if (!threadId) {
//       const user = await bot.getChat(userId);
//       const topic = await bot.createForumTopic(
//         ADMIN_GROUP_ID,
//         safeTitle(`${user.first_name} | ${userId}`)
//       );
//       threadId = topic.message_thread_id;
//       sessions[userId] = threadId;
//       reverseSessions[threadId] = userId;
//     }

//     /* ===== USERGA ===== */
//     for (const p of products) {
//       const img = await getImageSource(p.img);
//       const caption = `📦 <b>${p.title}</b>
// ${p.quantity} × ${p.price} ${p.currency}
// = ${p.total} ${p.currency}`;

//       if (img) {
//         await bot.sendPhoto(userId, img.source, {
//           caption,
//           parse_mode: "HTML",
//         });
//       } else {
//         await bot.sendMessage(userId, caption, { parse_mode: "HTML" });
//       }
//     }

//     await bot.sendMessage(
//       userId,
//       `✅ <b>Buyurtma qabul qilindi</b>

// 🧾 Jami:
// dollorda: ${totalUSD.toFixed(2)} $
// so'mda: ${Math.round(totalUZS).toLocaleString()} so'm`,
//       { parse_mode: "HTML" }
//     );

//     /* ===== ADMINGA ===== */
//     for (const [i, p] of products.entries()) {
//       const img = await getImageSource(p.img);
//       const caption = `📦 <b>${p.title}</b>
// ${p.quantity} × ${p.price} ${p.currency}
// = ${p.total} ${p.currency}

// #Mahsulot_${i + 1}`;

//       if (img) {
//         await bot.sendPhoto(ADMIN_GROUP_ID, img.source, {
//           caption,
//           parse_mode: "HTML",
//           message_thread_id: threadId,
//         });
//       } else {
//         await bot.sendMessage(ADMIN_GROUP_ID, caption, {
//           parse_mode: "HTML",
//           message_thread_id: threadId,
//         });
//       }
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, text, {
//       parse_mode: "HTML",
//       message_thread_id: threadId,
//     });

//     res.json({ success: true });
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ success: false });
//   }
// });

// /* ================== START ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT} portda ishlayapti`);
// });





























import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

/* ================== DIRNAME ================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================== CONFIG ================== */
const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
const ADMIN_GROUP_ID = -1003570889560;
const PORT = 3000;
const EXCHANGE_RATE = 11000;

/* ================== APP ================== */
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "10mb" }));

/* ================== BOT ================== */
const bot = new TelegramBot(TOKEN, { polling: true });

/* ================== STATIC ================== */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================== SESSION ================== */
const sessions = {};
const reverseSessions = {};

/* ================== HELPERS ================== */
function safeTitle(text) {
  return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120);
}

async function getImageSource(imgPath) {
  if (!imgPath) return null;
  const file = path.join(__dirname, "uploads", path.basename(imgPath));
  if (fs.existsSync(file)) return { type: "file", source: file };
  return null;
}

/* ================== ORDER FORMAT ================== */
function formatOrderText(products) {
  let text = "🛒 <b>Yangi buyurtma</b>\n\n";
  let totalUSD = 0;
  let totalUZS = 0;

  products.forEach((p, i) => {
    const price = Number(p.price) || 0;
    const qty = Number(p.quantity) || 1;
    const total = price * qty;
    const currency = p.currency || "$";

    text += `${i + 1}. <b>${p.title}</b>\n`;
    text += `${qty} × ${price} ${currency} = ${total} ${currency}\n\n`;

    if (currency === "$") {
      totalUSD += total;
      totalUZS += total * EXCHANGE_RATE;
    } else {
      totalUZS += total;
      totalUSD += total / EXCHANGE_RATE;
    }
  });

  text += `━━━━━━━━━━━━━━━━━━━━\n`;
  text += `<b>Jami:</b>\n`;
  text += `${totalUSD.toFixed(2)} $\n`;
  text += `${Math.round(totalUZS).toLocaleString()} so'm`;

  return { text, totalUSD, totalUZS };
}

/* ================== COMMANDS ================== */
bot.onText(/\/start/, async (msg) => {
  const userId = msg.from.id;
  const userName = msg.from.first_name || "Foydalanuvchi";

  try {
    await bot.sendMessage(
      userId,
      `👋 Assalomu aleykum, <b>${userName}</b>!

Xush kelibsiz! Men sizning buyurtmalaringizni qabul qilaman.

🆔 <b>Sizning Telegram ID:</b>
<code>${userId}</code>

📝 <b>Qanday foydalanish kerak?</b>
1️⃣ Saytga o'ting
2️⃣ Mahsulotlarni savatga qo'shing
3️⃣ Telegram ID maydoniga yuqoridagi ID ni kiriting
4️⃣ "Adminga yuborish" tugmasini bosing

✅ Buyurtmangiz adminlarga yuboriladi va tez orada siz bilan bog'lanamiz!`,
      { parse_mode: "HTML" }
    );
  } catch (error) {
    console.error("❌ /start error:", error.message);
  }
});

bot.onText(/\/close/, async (msg) => {
  if (msg.chat.id !== ADMIN_GROUP_ID) return;
  if (!msg.message_thread_id) return;

  const threadId = msg.message_thread_id;
  const userId = reverseSessions[threadId];

  if (userId) {
    await bot.sendMessage(userId, "🔒 Suhbat yopildi.");
    delete sessions[userId];
    delete reverseSessions[threadId];
  }

  await bot.sendMessage(ADMIN_GROUP_ID, "✅ Suhbat yopildi", {
    message_thread_id: threadId,
  });
});

// bot.onText(/\/help/, async (msg) => {
//   const userId = msg.from.id;

//   try {
//     const helpText = `📚 <b>Yordam</b>

// <b>Foydalanuvchilar uchun:</b>
// • /start - Botni boshlash va ID olish
// • /help - Bu yordam xabari

// <b>Adminlar uchun (topic ichida):</b>
// • /close - Suhbatni yopish`;

//     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
//   } catch (error) {
//     console.error("❌ /help error:", error.message);
//   }
// });



bot.onText(/\/help/, async (msg) => {
  try {
    /* ========= USER HELP ========= */
    if (msg.chat.type === "private") {
      const text = `
📚 <b>Yordam (Foydalanuvchi)</b>

1️⃣ Saytga kiring
2️⃣ Mahsulotlarni savatga qo‘shing
3️⃣ Savat sahifasiga o'ting
4️⃣ Mahsulotlarni <b>adminga yuborish uchun</b> Telegram ID maydoniga o'zingizning Telegram ID raqamingizni kiriting
5️⃣ "Adminga yuborish" tugmasini bosing


<b></b>

💬 Buyurtmadan so‘ng:
– admin bilan chat qilishingiz mumkin
– rasm, ovozli, video, fayl yuborish mumkin

ℹ️ Kerakli buyruqlar:
/start – Botni boshlash
/help – Yordam
`;
      return bot.sendMessage(msg.chat.id, text, { parse_mode: "HTML" });
    }

    /* ========= ADMIN HELP ========= */
    if (msg.chat.id === ADMIN_GROUP_ID) {
      const text = `
🛠 <b>Admin uchun yordam</b>

📌 Topic = bitta user

Buyruqlar:
/close – Suhbatni yopish
/userinfo – User ma'lumotlarini ko‘rish

💬 Topic ichida:
– user bilan chat
– rasm, ovozli, video, fayl yuborish mumkin

⚠️ Eslatma:
Faqat topic ichida ishlang!
`;
      return bot.sendMessage(msg.chat.id, text, {
        parse_mode: "HTML",
        message_thread_id: msg.message_thread_id,
      });
    }
  } catch (e) {
    console.error("❌ help error:", e.message);
  }
});
bot.onText(/\/userinfo/, async (msg) => {
  try {
    if (msg.chat.id !== ADMIN_GROUP_ID) return;
    if (!msg.message_thread_id) return;

    const userId = reverseSessions[msg.message_thread_id];
    if (!userId) return;

    const user = await bot.getChat(userId);

    const text = `
👤 <b>User ma'lumotlari</b>

Ismi: ${user.first_name || "-"}
Username: ${user.username ? "@" + user.username : "-"}
Telegram ID: <code>${userId}</code>
Profil: <a href="tg://user?id=${userId}">Ochish</a>
`;

    await bot.sendMessage(ADMIN_GROUP_ID, text, {
      parse_mode: "HTML",
      message_thread_id: msg.message_thread_id,
    });
  } catch (e) {
    console.error("❌ userinfo error:", e.message);
  }
});


async function sendUserInfoToAdmin(userId, threadId) {
  try {
    const user = await bot.getChat(userId);

    const text = `
👤 <b>Yangi mijoz</b>

<b>Ismi:</b> ${user.first_name || "-"}
<b>Username:</b> ${user.username ? "@" + user.username : "mavjud emas"}
<b>Telegram ID:</b> <code>${userId}</code>
<b>Profil:</b> <a href="tg://user?id=${userId}">Ochish</a>
`;

    await bot.sendMessage(ADMIN_GROUP_ID, text, {
      parse_mode: "HTML",
      message_thread_id: threadId,
    });
  } catch (e) {
    console.error("❌ User info error:", e.message);
  }
}
bot.setMyCommands(
  [
    {
      command: "start",
      description: "Botni boshlash va Telegram ID olish",
    },
    {
      command: "help",
      description: "Botdan foydalanish bo‘yicha yordam",
    },
    {
      command: "info",
      description: "Sizning Telegram profilingiz haqida ma'lumot",
    }
  ],
  {
    scope: {
      type: "all_private_chats",
    },
  }
);
bot.setMyCommands(
  [
    {
      command: "close",
      description: "Suhbatni yopish (topic ichida)",
    },
  ],
  {
    scope: {
      type: "chat_administrators",
      chat_id: ADMIN_GROUP_ID,
    },
  }
);



/* ================== CHAT RELAY ================== */
// bot.on("message", async (msg) => {
//   try {
//     /* ===== USER → ADMIN ===== */
//     if (msg.chat.type === "private") {
//       if (msg.text && msg.text.startsWith("/")) return;
//       const userId = msg.from.id;
//       const threadId = sessions[userId];
//       if (!threadId) return;

//       const opt = { message_thread_id: threadId };

//       if (msg.text)
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `👤 <b>Haridor:</b>\n${msg.text}`,
//           { ...opt, parse_mode: "HTML" }
//         );
//       if (msg.voice) await bot.sendVoice(ADMIN_GROUP_ID, msg.voice.file_id, opt);
//       if (msg.video) await bot.sendVideo(ADMIN_GROUP_ID, msg.video.file_id, opt);
//       if (msg.video_note)
//         await bot.sendVideoNote(ADMIN_GROUP_ID, msg.video_note.file_id, opt);
//       if (msg.document)
//         await bot.sendDocument(ADMIN_GROUP_ID, msg.document.file_id, opt);
//       if (msg.photo) {
//         const photo = msg.photo.at(-1);
//         await bot.sendPhoto(ADMIN_GROUP_ID, photo.file_id, opt);
//       }
//     }

//     /* ===== ADMIN → USER ===== */
//     if (msg.chat.id === ADMIN_GROUP_ID && msg.message_thread_id) {
//       if (msg.text && msg.text.startsWith("/")) return;
//       const userId = reverseSessions[msg.message_thread_id];
//       if (!userId) return;

//       if (msg.text)
//         await bot.sendMessage(
//           userId,
//           `💬 <b>Admin:</b>\n${msg.text}`,
//           { parse_mode: "HTML" }
//         );
//       if (msg.voice) await bot.sendVoice(userId, msg.voice.file_id);
//       if (msg.video) await bot.sendVideo(userId, msg.video.file_id);
//       if (msg.video_note)
//         await bot.sendVideoNote(userId, msg.video_note.file_id);
//       if (msg.document)
//         await bot.sendDocument(userId, msg.document.file_id);
//       if (msg.photo) {
//         const photo = msg.photo.at(-1);
//         await bot.sendPhoto(userId, photo.file_id);
//       }
//     }
//   } catch (e) {
//     console.error("❌ Chat error:", e.message);
//   }
// });



/* ================== API ================== */
app.post("/send-cart", async (req, res) => {
  try {
    const { telegramId, products } = req.body;
    const userId = Number(telegramId);
    if (!userId || !products) return res.json({ success: false });

    const { text } = formatOrderText(products);

    let threadId = sessions[userId];
    if (!threadId) {
      const user = await bot.getChat(userId);
      const topic = await bot.createForumTopic(
        ADMIN_GROUP_ID,
        safeTitle(`${user.first_name} | ${userId}`)
      );
      threadId = topic.message_thread_id;
      sessions[userId] = threadId;
      reverseSessions[threadId] = userId;

      await sendUserInfoToAdmin(userId, threadId);
    }

    await bot.sendMessage(ADMIN_GROUP_ID, text, {
      parse_mode: "HTML",
      message_thread_id: threadId,
    });

    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

/* ================== START ================== */
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishlayapti`);
});















































































































// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo"; // ❗ .env tavsiya qilinadi
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot ishga tushdi");

// /* ================== SESSION ================== */
// const sessions = {};        // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /* ================== /start ================== */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;

//   await bot.sendMessage(
//     userId,
// `👋 Xush kelibsiz!

// 🆔 Sizning Telegram ID:
// <code>${userId}</code>

// 👉 Saytga qaytib shu ID ni kiriting va buyurtma yuboring.`,
//     { parse_mode: "HTML" }
//   );
// });

// /* ================== CART → BOT ================== */
// // app.post("/send-cart", async (req, res) => {
// //   try {
// //     const { telegramId, products } = req.body;

// //     if (!telegramId || !Array.isArray(products) || products.length === 0) {
// //       return res.json({
// //         success: false,
// //         message: "Telegram ID yoki cart bo‘sh",
// //       });
// //     }

// //     /* ===== USERGA ===== */
// //     await bot.sendMessage(
// //       telegramId,
// //       "🛒 <b>Buyurtmangiz qabul qilindi</b>",
// //       { parse_mode: "HTML" }
// //     );

// //     let threadId = sessions[telegramId];

// //     /* ===== AGAR OLDIN TOPIC YO‘Q BO‘LSA ===== */
// //     if (!threadId) {
// //       const user = await bot.getChat(telegramId);
// //       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

// //       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
// //       threadId = topic.message_thread_id;

// //       sessions[telegramId] = threadId;
// //       reverseSessions[threadId] = telegramId;

// //       const profile = `👤 <b>Haridor profili</b>

// // 📛 Ism: ${user.first_name || "yo‘q"}
// // 👤 Username: ${user.username ? "@" + user.username : "yo‘q"}
// // 🆔 ID: ${telegramId}
// // 🔗 <a href="tg://user?id=${telegramId}">Profilni ochish</a>`;

// //       await bot.sendMessage(ADMIN_GROUP_ID, profile, {
// //         message_thread_id: threadId,
// //         parse_mode: "HTML",
// //       });
// //     }

// //     /* ===== MAHSULOTLARNI YUBORISH ===== */
// //     for (const p of products) {
// //       const caption = `<b>${p.title}</b>\n💰 ${p.price}$`;

// //       if (p.img) {
// //         await bot.sendPhoto(
// //           ADMIN_GROUP_ID,
// //           p.img,
// //           {
// //             caption,
// //             parse_mode: "HTML",
// //             message_thread_id: threadId,
// //           }
// //         );
// //       } else {
// //         await bot.sendMessage(
// //           ADMIN_GROUP_ID,
// //           caption,
// //           {
// //             parse_mode: "HTML",
// //             message_thread_id: threadId,
// //           }
// //         );
// //       }
// //     }

// //     res.json({
// //       success: true,
// //       message: "✅ Buyurtma adminga yuborildi",
// //     });

// //   } catch (e) {
// //     console.error("SEND CART ERROR:", e.message);
// //     res.json({
// //       success: false,
// //       message: "❌ Botga /start bosilmagan yoki ID noto‘g‘ri",
// //     });
// //   }
// // });
// /* ================== CART → BOT ================== */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     if (!telegramId || !Array.isArray(products) || products.length === 0) {
//       return res.json({
//         success: false,
//         message: "Telegram ID yoki cart bo‘sh",
//       });
//     }

//     let threadId = sessions[telegramId];

//     // ===== AGAR TOPIC YO‘Q BO‘LSA =====
//     if (!threadId) {
//       const user = await bot.getChat(telegramId);
//       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

//       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
//       threadId = topic.message_thread_id;

//       sessions[telegramId] = threadId;
//       reverseSessions[threadId] = telegramId;

//       const profile = `👤 <b>Haridor profili</b>

// 📛 Ism: ${user.first_name || "yo‘q"}
// 👤 Username: ${user.username ? "@" + user.username : "yo‘q"}
// 🆔 ID: ${telegramId}`;

//       await bot.sendMessage(ADMIN_GROUP_ID, profile, {
//         message_thread_id: threadId,
//         parse_mode: "HTML",
//       });
//     }

//     // ===== MAHSULOTLARNI YUBORISH =====
//     for (const p of products) {
//       const caption = `<b>${p.title}</b>\n💰 ${p.price}$`;

//       let imageUrl = null;

//       if (p.img) {
//         // 🔥 MUHIM QISM
//         if (p.img.startsWith("http")) {
//           imageUrl = p.img;
//         } else {
//           imageUrl = `${BACKEND_BASE_URL}${p.img}`;
//         }
//       }

//       if (imageUrl) {
//         await bot.sendPhoto(
//           ADMIN_GROUP_ID,
//           imageUrl,
//           {
//             caption,
//             parse_mode: "HTML",
//             message_thread_id: threadId,
//           }
//         );
//       } else {
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           caption,
//           {
//             parse_mode: "HTML",
//             message_thread_id: threadId,
//           }
//         );
//       }
//     }

//     await bot.sendMessage(
//       telegramId,
//       "✅ Buyurtmangiz adminga yuborildi"
//     );

//     res.json({
//       success: true,
//       message: "Buyurtma muvaffaqiyatli yuborildi",
//     });

//   } catch (e) {
//     console.error("SEND CART ERROR:", e.message);
//     res.json({
//       success: false,
//       message: "Xatolik yuz berdi",
//     });
//   }
// });

// /* ================== ADMIN → USER ================== */
// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;
//     if (!msg.text) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];
//     if (!userId) return;

//     if (msg.text === "/close") {
//       delete reverseSessions[threadId];
//       Object.keys(sessions).forEach(
//         (u) => sessions[u] === threadId && delete sessions[u]
//       );

//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "🟢 Suhbat yopildi",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     await bot.sendMessage(userId, `🧑‍💼 ADMIN:\n${msg.text}`);
//   } catch (e) {
//     console.error("ADMIN ERROR:", e.message);
//   }
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlayapti`);
// });


























































































// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// /* ================== BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });
// console.log("🤖 Bot + Server ishga tushdi");

// /* ================== STORAGE ================== */
// let orderCounter = 1;

// const sessions = {};         // userId -> threadId
// const reverseSessions = {};  // threadId -> userId
// const orders = {};           // orderId -> order data
// const threadOrders = {};     // threadId -> orderId

// /* ================== UTILS ================== */
// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// function statusText(status) {
//   return {
//     NEW: "🆕 Yangi buyurtma",
//     PROCESSING: "👨‍💼 Ko‘rib chiqilmoqda",
//     READY: "📦 Tayyor",
//     DONE: "✅ Yakunlandi"
//   }[status];
// }

// /* ================== /start ================== */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;
//   await bot.sendMessage(
//     userId,
// `👋 Xush kelibsiz!

// 🆔 Sizning Telegram ID:
// <code>${userId}</code>

// 👉 Saytga qaytib buyurtma bering.`,
//     { parse_mode: "HTML" }
//   );
// });

// /* ================== USER → ADMIN (PRIVATE CHAT) ================== */
// bot.on("message", async (msg) => {
//   if (msg.chat.type !== "private") return;
//   if (!msg.text || msg.text.startsWith("/")) return;

//   const userId = msg.from.id;
//   const threadId = sessions[userId];
//   if (!threadId) return;

//   await bot.sendMessage(
//     ADMIN_GROUP_ID,
//     `👤 USER:\n${msg.text}`,
//     { message_thread_id: threadId }
//   );
// });

// /* ================== ADMIN COMMANDS ================== */
// bot.on("message", async (msg) => {
//   if (msg.chat.id !== ADMIN_GROUP_ID) return;
//   if (!msg.message_thread_id) return;
//   if (!msg.text) return;

//   const threadId = msg.message_thread_id;
//   const userId = reverseSessions[threadId];
//   const orderId = threadOrders[threadId];
//   if (!userId || !orderId) return;

//   const order = orders[orderId];

//   const commands = {
//     "/processing": "PROCESSING",
//     "/ready": "READY",
//     "/done": "DONE"
//   };

//   if (commands[msg.text]) {
//     order.status = commands[msg.text];

//     await bot.sendMessage(
//       ADMIN_GROUP_ID,
//       `📌 Status o‘zgardi: ${statusText(order.status)}`,
//       { message_thread_id: threadId }
//     );

//     await bot.sendMessage(
//       userId,
// `📦 Buyurtmangiz holati yangilandi

// 🆔 Order: #${orderId}
// 📌 Status: ${statusText(order.status)}`
//     );
//   }

//   if (msg.text === "/close") {
//     delete sessions[userId];
//     delete reverseSessions[threadId];
//     delete threadOrders[threadId];

//     await bot.sendMessage(
//       ADMIN_GROUP_ID,
//       "🟢 Suhbat yopildi",
//       { message_thread_id: threadId }
//     );
//   }

//   if (!msg.text.startsWith("/")) {
//     await bot.sendMessage(userId, `🧑‍💼 ADMIN:\n${msg.text}`);
//   }
// });

// /* ================== CART → BOT ================== */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;
//     if (!telegramId || !products?.length) {
//       return res.json({ success: false, message: "Telegram ID yoki cart bo‘sh" });
//     }

//     const orderId = orderCounter++;

//     /* ===== USERGA KO‘RSATISH ===== */
//     const userText =
// `🛒 <b>Buyurtma #${orderId}</b>

// ${products.map((p, i) => `${i + 1}. ${p.name} — ${p.price || ""}`).join("\n")}

// 📌 Status: 🆕 Yangi`;

//     await bot.sendMessage(telegramId, userText, { parse_mode: "HTML" });

//     /* ===== THREAD OCHISH ===== */
//     let threadId = sessions[telegramId];

//     if (!threadId) {
//       const user = await bot.getChat(telegramId);
//       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

//       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
//       threadId = topic.message_thread_id;

//       sessions[telegramId] = threadId;
//       reverseSessions[threadId] = telegramId;
//     }

//     /* ===== ORDER DATA SAQLASH ===== */
//     orders[orderId] = {
//       orderId,
//       telegramId,
//       products,
//       status: "NEW",
//       createdAt: new Date()
//     };
//     threadOrders[threadId] = orderId;

//     /* ===== ADMIN GROUPGA YUBORISH (RASM + TITLE + PRICE) ===== */
//     for (let p of products) {
//       if (p.image) {
//         await bot.sendPhoto(
//           ADMIN_GROUP_ID,
//           p.image,
//           { caption: `<b>${p.name}</b>\n💰 ${p.price || ""}`, parse_mode: "HTML", message_thread_id: threadId }
//         );
//       } else {
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `<b>${p.name}</b>\n💰 ${p.price || ""}`,
//           { parse_mode: "HTML", message_thread_id: threadId }
//         );
//       }
//     }

//     res.json({ success: true, message: "✅ Buyurtma adminga yuborildi" });

//   } catch (e) {
//     console.error("SEND CART ERROR:", e.message);
//     res.json({ success: false, message: "❌ Botga /start bosilmagan yoki ID noto‘g‘ri" });
//   }
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlayapti`);
// });









































// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560; // forum supergroup
// const PORT = 3000;

// /* ================== EXPRESS ================== */
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// /* ================== TELEGRAM BOT ================== */
// const bot = new TelegramBot(TOKEN, { polling: true });

// console.log("🤖 Bot + Server ishga tushdi");

// /* ================== SESSION ================== */
// const sessions = {};        // userId -> threadId
// const reverseSessions = {}; // threadId -> userId

// function safeTitle(text) {
//   return text.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 120) || "Yangi haridor";
// }

// /* ================== /start ================== */
// bot.onText(/\/start/, async (msg) => {
//   const userId = msg.from.id;

//   await bot.sendMessage(
//     userId,
// `👋 Xush kelibsiz!

// 🆔 Sizning Telegram ID:
// <code>${userId}</code>

// 👉 Saytga qaytib shu ID ni kiriting va buyurtma yuboring.`,
//     { parse_mode: "HTML" }
//   );
// });

// /* ================== USER → ADMIN ================== */
// // app.post("/send-cart", async (req, res) => {
// //   try {
// //     const { telegramId, products } = req.body;

// //     if (!telegramId || !Array.isArray(products) || products.length === 0) {
// //       return res.json({
// //         success: false,
// //         message: "Telegram ID yoki cart bo‘sh"
// //       });
// //     }

// //     /* ===== USERGA KO‘RSATISH ===== */
// //     let userText =
// // `🛒 <b>Buyurtmangiz qabul qilindi</b>

// // ${products.map((p, i) => `${i + 1}. ${p.name} — ${p.price || ""}`).join("\n")}`;

// //     await bot.sendMessage(telegramId, userText, { parse_mode: "HTML" });

// //     /* ===== THREAD ID NI TEKSHIRISH ===== */
// //     let threadId = sessions[telegramId];

// //     if (!threadId) {
// //       // Birinchi buyurtma bo‘lsa yangi topic ochish
// //       const user = await bot.getChat(telegramId);
// //       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

// //       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
// //       threadId = topic.message_thread_id;

// //       sessions[telegramId] = threadId;
// //       reverseSessions[threadId] = telegramId;

// //       // USER PROFILI
// //       const profile =
// // `👤 <b>Haridor profili</b>

// // 📛 Ism: ${user.first_name || "yo‘q"}
// // 👤 Username: ${user.username ? "@" + user.username : "yo‘q"}
// // 🆔 ID: ${telegramId}
// // 🔗 <a href="tg://user?id=${telegramId}">Profilni ochish</a>`;

// //       await bot.sendMessage(
// //         ADMIN_GROUP_ID,
// //         profile,
// //         { message_thread_id: threadId, parse_mode: "HTML" }
// //       );
// //     }

// //     /* ===== CARTNI ADMIN GROUPGA ===== */
// //     for (let p of products) {
// //       if (p.image) {
// //         await bot.sendPhoto(
// //           ADMIN_GROUP_ID,
// //           p.image,
// //           { caption: `<b>${p.name}</b>\n💰 ${p.price || ""}`, parse_mode: "HTML", message_thread_id: threadId }
// //         );
// //       } else {
// //         await bot.sendMessage(
// //           ADMIN_GROUP_ID,
// //           `<b>${p.name}</b>\n💰 ${p.price || ""}`,
// //           { parse_mode: "HTML", message_thread_id: threadId }
// //         );
// //       }
// //     }

// //     res.json({
// //       success: true,
// //       message: "✅ Buyurtma adminga yuborildi"
// //     });

// //   } catch (e) {
// //     console.error("SEND CART ERROR:", e.message);
// //     res.json({
// //       success: false,
// //       message: "❌ Botga /start bosilmagan yoki ID noto‘g‘ri"
// //     });
// //   }
// // });


// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;

//     if (!telegramId || !Array.isArray(products) || products.length === 0) {
//       return res.json({
//         success: false,
//         message: "Telegram ID yoki cart bo‘sh"
//       });
//     }

//     // USERGA KO‘RSATISH
//     let userText =
//       `🛒 <b>Buyurtmangiz qabul qilindi</b>\n\n` +
//       products.map((p, i) => `${i + 1}. ${p.title} — ${p.price || ""}`).join("\n");

//     await bot.sendMessage(telegramId, userText, { parse_mode: "HTML" });

//     // THREAD ID NI TEKSHIRISH
//     let threadId = sessions[telegramId];

//     if (!threadId) {
//       // Faqat birinchi buyurtma bo‘lsa yangi topic yaratamiz
//       const user = await bot.getChat(telegramId);
//       const title = safeTitle(`${user.first_name || "User"} | ${telegramId}`);

//       const topic = await bot.createForumTopic(ADMIN_GROUP_ID, title);
//       threadId = topic.message_thread_id;

//       // SESSION GA SAQLASH
//       sessions[telegramId] = threadId;
//       reverseSessions[threadId] = telegramId;

//       // USER PROFILI
//       const profile =
//         `👤 <b>Haridor profili</b>\n\n` +
//         `📛 Ism: ${user.first_name || "yo‘q"}\n` +
//         `👤 Username: ${user.username ? "@" + user.username : "yo‘q"}\n` +
//         `🆔 ID: ${telegramId}\n` +
//         `🔗 <a href="tg://user?id=${telegramId}">Profilni ochish</a>`;

//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         profile,
//         { message_thread_id: threadId, parse_mode: "HTML" }
//       );
//     }

//     // CARTNI ADMIN THREADGA JO‘NATISH
//     for (let p of products) {
//       const imgUrl = p.img || "https://via.placeholder.com/150";

//       if (imgUrl) {
//         await bot.sendPhoto(
//           ADMIN_GROUP_ID,
//           imgUrl,
//           { caption: `<b>${p.title}</b>\n💰 ${p.price || ""}`, parse_mode: "HTML", message_thread_id: threadId }
//         );
//       } else {
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `<b>${p.title}</b>\n💰 ${p.price || ""}`,
//           { parse_mode: "HTML", message_thread_id: threadId }
//         );
//       }
//     }

//     res.json({ success: true, message: "✅ Buyurtma adminga yuborildi" });

//   } catch (e) {
//     console.error("SEND CART ERROR:", e);
//     res.json({ success: false, message: "❌ Botga /start bosilmagan yoki ID noto‘g‘ri" });
//   }
// });

// /* ================== ADMIN → USER ================== */
// bot.on("message", async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;
//     if (!msg.text) return;

//     const threadId = msg.message_thread_id;
//     const userId = reverseSessions[threadId];
//     if (!userId) return;

//     if (msg.text === "/close") {
//       delete reverseSessions[threadId];
//       Object.keys(sessions).forEach(
//         u => sessions[u] === threadId && delete sessions[u]
//       );

//       await bot.sendMessage(
//         ADMIN_GROUP_ID,
//         "🟢 Suhbat yopildi",
//         { message_thread_id: threadId }
//       );
//       return;
//     }

//     await bot.sendMessage(
//       userId,
//       `🧑‍💼 ADMIN:\n${msg.text}`
//     );
//   } catch (e) {
//     console.error("ADMIN ERROR:", e.message);
//   }
// });

// /* ================== START SERVER ================== */
// app.listen(PORT, () => {
//   console.log(`🚀 Server ${PORT}-portda ishlayapti`);
// });
