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
