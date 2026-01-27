//ISHLAYDI FAQAT IMG BN XATOLIK BOR
// import express from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import TelegramBot from "node-telegram-bot-api";
// import path from "path";
// import { fileURLToPath } from "url";
// import fs from "fs";
// import fetch from "node-fetch"; // agar Node 18+ bo‘lsa olib tashlasa ham bo‘ladi

// async function getUSDRate() {
//   const res = await fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/");
//   const data = await res.json();

//   const usd = data.find((c) => c.Ccy === "USD");
//   return Number(usd.Rate);
// }



// /* ================== DIRNAME ================== */
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// /* ================== CONFIG ================== */
// const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
// const ADMIN_GROUP_ID = -1003570889560;
// const PORT = 3000;
// // const EXCHANGE_RATE = 11000;

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




// function getImageContentType(filePath = "") {
//   const ext = filePath.split(".").pop()?.toLowerCase();

//   if (ext === "png") return "image/png";
//   if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
//   if (ext === "svg") return "image/svg+xml";
//   if (ext === "webp") return "image/webp";

//   return "application/octet-stream";
// }
// async function getImageSource(imgPath) {
//   if (!imgPath) return null;
//   const file = path.join(__dirname, "uploads", path.basename(imgPath));
//   if (fs.existsSync(file)) return { type: "file", source: file };
//   return null;
// }
// for (const p of products) {
//   const img = await getImageSource(p.img);

//   const caption = `📦 <b>${p.title}</b>
// ${p.quantity} × ${p.price} ${p.currency}
// = ${p.quantity * p.price} ${p.currency}`;

//   if (img) {
//     await bot.sendPhoto(
//       userId,
//       {
//         source: img.source,
//         contentType: getImageContentType(p.img),
//       },
//       { caption, parse_mode: "HTML" }
//     );
//   } else {
//     await bot.sendMessage(userId, caption, { parse_mode: "HTML" });
//   }
// }




// /* ================== ORDER FORMAT ================== */
// // function formatOrderText(products) {
// //   let text = "🛒 <b>Yangi buyurtma</b>\n\n";
// //   let totalUSD = 0;
// //   let totalUZS = 0;

// //   products.forEach((p, i) => {
// //     const price = Number(p.price) || 0;
// //     const qty = Number(p.quantity) || 1;
// //     const total = price * qty;
// //     const currency = p.currency || "$";

// //     text += `${i + 1}. <b>${p.title}</b>\n`;
// //     text += `${qty} × ${price} ${currency} = ${total} ${currency}\n\n`;

// //     if (currency === "$") {
// //       totalUSD += total;
// //       totalUZS += total * EXCHANGE_RATE;
// //     } else {
// //       totalUZS += total;
// //       totalUSD += total / EXCHANGE_RATE;
// //     }
// //   });
  

// //   text += `━━━━━━━━━━━━━━━━━━━━\n`;
// //   text += `<b>Jami:</b>\n`;
// //   text += `${totalUSD.toFixed(2)} $\n`;
// //   text += `${Math.round(totalUZS).toLocaleString()} so'm`;

// //   return { text, totalUSD, totalUZS };
// // }

// function formatOrderText(products) {
//   let totalUSD = 0;

//   let text = `🛒 <b>Yangi buyurtma</b>\n\n`;

//   for (const p of products) {
//     const sum = p.price * p.quantity;
//     totalUSD += sum;

//     text += `📦 <b>${p.title}</b>\n`;
//     text += `${p.quantity} × ${p.price} ${p.currency}\n`;
//     text += `= ${sum} ${p.currency}\n\n`;
//   }

//   return { text, totalUSD };
// }





// /* ================== COMMANDS ================== */
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
//       { parse_mode: "HTML" },
//     );
//   } catch (error) {
//     console.error("❌ /start error:", error.message);
//   }
// });

// bot.onText(/\/close/, async (msg) => {
//   if (msg.chat.id !== ADMIN_GROUP_ID) return;
//   if (!msg.message_thread_id) return;

//   const threadId = msg.message_thread_id;
//   const userId = reverseSessions[threadId];

//   if (userId) {
//     await bot.sendMessage(userId, "🔒 Suhbat yopildi.");
//     delete sessions[userId];
//     delete reverseSessions[threadId];
//   }

//   await bot.sendMessage(ADMIN_GROUP_ID, "✅ Suhbat yopildi", {
//     message_thread_id: threadId,
//   });
// });

// // bot.onText(/\/help/, async (msg) => {
// //   const userId = msg.from.id;

// //   try {
// //     const helpText = `📚 <b>Yordam</b>

// // <b>Foydalanuvchilar uchun:</b>
// // • /start - Botni boshlash va ID olish
// // • /help - Bu yordam xabari

// // <b>Adminlar uchun (topic ichida):</b>
// // • /close - Suhbatni yopish`;

// //     await bot.sendMessage(userId, helpText, { parse_mode: "HTML" });
// //   } catch (error) {
// //     console.error("❌ /help error:", error.message);
// //   }
// // });

// bot.onText(/\/help/, async (msg) => {
//   try {
//     /* ========= USER HELP ========= */
//     if (msg.chat.type === "private") {
//       const text = `
// 📚 <b>Yordam (Foydalanuvchi)</b>

// 1️⃣ Saytga kiring
// 2️⃣ Mahsulotlarni savatga qo‘shing
// 3️⃣ Savat sahifasiga o'ting
// 4️⃣ Mahsulotlarni <b>adminga yuborish uchun</b> Telegram ID maydoniga o'zingizning Telegram ID raqamingizni kiriting
// 5️⃣ "Adminga yuborish" tugmasini bosing


// <b>Agr Tlegram ID ni olishni bilmasangiz</b>
// 1️⃣ /start buyrug'ini bosing
// 2️⃣ Sizning Telegram ID degan yozibni pastidagi raqamlar sizning Telegram ID raqamingizdir
// 3️⃣ Osha raqamlarni Telegram ID degan maydonga kiriting va buyurtmangizni yuboring

// 💬 Buyurtmadan so‘ng:
// – admin bilan chat qilishingiz mumkin
// – rasm, ovozli, video, fayl yuborish mumkin

// ℹ️ Kerakli buyruqlar:
// /start – Botni boshlash
// /help – Yordam
// `;
//       return bot.sendMessage(msg.chat.id, text, { parse_mode: "HTML" });
//     }

//     /* ========= ADMIN HELP ========= */
//     if (msg.chat.id === ADMIN_GROUP_ID) {
//       const text = `
// 🛠 <b>Admin uchun yordam</b>

// 📌 Topic = bitta user

// Buyruqlar:
// /close – Suhbatni yopish
// /userinfo – User ma'lumotlarini ko‘rish

// 💬 Topic ichida:
// – user bilan chat
// – rasm, ovozli, video, fayl yuborish mumkin

// ⚠️ Eslatma:
// Faqat topic ichida ishlang!
// `;
//       return bot.sendMessage(msg.chat.id, text, {
//         parse_mode: "HTML",
//         message_thread_id: msg.message_thread_id,
//       });
//     }
//   } catch (e) {
//     console.error("❌ help error:", e.message);
//   }
// });
// bot.onText(/\/userinfo/, async (msg) => {
//   try {
//     if (msg.chat.id !== ADMIN_GROUP_ID) return;
//     if (!msg.message_thread_id) return;

//     const userId = reverseSessions[msg.message_thread_id];
//     if (!userId) return;

//     const user = await bot.getChat(userId);

//     const text = `
// 👤 <b>User ma'lumotlari</b>

// Ismi: ${user.first_name || "-"}
// Username: ${user.username ? "@" + user.username : "-"}
// Telegram ID: <code>${userId}</code>
// Profil: <a href="tg://user?id=${userId}">Ochish</a>
// `;

//     await bot.sendMessage(ADMIN_GROUP_ID, text, {
//       parse_mode: "HTML",
//       message_thread_id: msg.message_thread_id,
//     });
//   } catch (e) {
//     console.error("❌ userinfo error:", e.message);
//   }
// });

// async function sendUserInfoToAdmin(userId, threadId) {
//   try {
//     const user = await bot.getChat(userId);

//     const text = `
// 👤 <b>Yangi mijoz</b>

// <b>Ismi:</b> ${user.first_name || "-"}
// <b>Username:</b> ${user.username ? "@" + user.username : "mavjud emas"}
// <b>Telegram ID:</b> <code>${userId}</code>
// <b>Profil:</b> <a href="tg://user?id=${userId}">Ochish</a>
// `;

//     await bot.sendMessage(ADMIN_GROUP_ID, text, {
//       parse_mode: "HTML",
//       message_thread_id: threadId,
//     });
//   } catch (e) {
//     console.error("❌ User info error:", e.message);
//   }
// }
// bot.setMyCommands(
//   [
//     {
//       command: "start",
//       description: "Botni boshlash va Telegram ID olish",
//     },
//     {
//       command: "help",
//       description: "Botdan foydalanish bo‘yicha yordam",
//     },
//     {
//       command: "info",
//       description: "Sizning Telegram profilingiz haqida ma'lumot",
//     },
//   ],
//   {
//     scope: {
//       type: "all_private_chats",
//     },
//   },
// );
// bot.setMyCommands(
//   [
//     {
//       command: "close",
//       description: "Suhbatni yopish (topic ichida)",
//     },
//   ],
//   {
//     scope: {
//       type: "chat_administrators",
//       chat_id: ADMIN_GROUP_ID,
//     },
//   },
// );

// /* ================== CHAT RELAY ================== */
// // bot.on("message", async (msg) => {
// //   try {
// //     /* ===== USER → ADMIN ===== */
// //     if (msg.chat.type === "private") {
// //       if (msg.text && msg.text.startsWith("/")) return;
// //       const userId = msg.from.id;
// //       const threadId = sessions[userId];
// //       if (!threadId) return;

// //       const opt = { message_thread_id: threadId };

// //       if (msg.text)
// //         await bot.sendMessage(
// //           ADMIN_GROUP_ID,
// //           `👤 <b>Haridor:</b>\n${msg.text}`,
// //           { ...opt, parse_mode: "HTML" }
// //         );
// //       if (msg.voice) await bot.sendVoice(ADMIN_GROUP_ID, msg.voice.file_id, opt);
// //       if (msg.video) await bot.sendVideo(ADMIN_GROUP_ID, msg.video.file_id, opt);
// //       if (msg.video_note)
// //         await bot.sendVideoNote(ADMIN_GROUP_ID, msg.video_note.file_id, opt);
// //       if (msg.document)
// //         await bot.sendDocument(ADMIN_GROUP_ID, msg.document.file_id, opt);
// //       if (msg.photo) {
// //         const photo = msg.photo.at(-1);
// //         await bot.sendPhoto(ADMIN_GROUP_ID, photo.file_id, opt);
// //       }
// //     }

// //     /* ===== ADMIN → USER ===== */
// //     if (msg.chat.id === ADMIN_GROUP_ID && msg.message_thread_id) {
// //       if (msg.text && msg.text.startsWith("/")) return;
// //       const userId = reverseSessions[msg.message_thread_id];
// //       if (!userId) return;

// //       if (msg.text)
// //         await bot.sendMessage(
// //           userId,
// //           `💬 <b>Admin:</b>\n${msg.text}`,
// //           { parse_mode: "HTML" }
// //         );
// //       if (msg.voice) await bot.sendVoice(userId, msg.voice.file_id);
// //       if (msg.video) await bot.sendVideo(userId, msg.video.file_id);
// //       if (msg.video_note)
// //         await bot.sendVideoNote(userId, msg.video_note.file_id);
// //       if (msg.document)
// //         await bot.sendDocument(userId, msg.document.file_id);
// //       if (msg.photo) {
// //         const photo = msg.photo.at(-1);
// //         await bot.sendPhoto(userId, photo.file_id);
// //       }
// //     }
// //   } catch (e) {
// //     console.error("❌ Chat error:", e.message);
// //   }
// // });

// /* ================== API ================== */
// // app.post("/send-cart", async (req, res) => {
// //   try {
// //     const { telegramId, products } = req.body;
// //     const userId = Number(telegramId);
// //     if (!userId || !products) return res.json({ success: false });

// //     const { text } = formatOrderText(products);

// //     let threadId = sessions[userId];
// //     if (!threadId) {
// //       const user = await bot.getChat(userId);
// //       const topic = await bot.createForumTopic(
// //         ADMIN_GROUP_ID,
// //         safeTitle(`${user.first_name} | ${userId}`),
// //       );
// //       threadId = topic.message_thread_id;
// //       sessions[userId] = threadId;
// //       reverseSessions[threadId] = userId;

// //       await sendUserInfoToAdmin(userId, threadId);
// //     }

// //     await bot.sendMessage(ADMIN_GROUP_ID, text, {
// //       parse_mode: "HTML",
// //       message_thread_id: threadId,
// //     });

// //     /* ===== USERGA ===== */
// //     for (const p of products) {
// //       const img = await getImageSource(p.img);
// //       const caption = `📦 <b>${p.title}</b>
// // ${p.quantity} × ${p.price} ${p.currency}
// // = ${p.total} ${p.currency}`;

// //       if (img) {
// //         await bot.sendPhoto(userId, img.source, {
// //           caption,
// //           parse_mode: "HTML",
// //         });
// //       } else {
// //         await bot.sendMessage(userId, caption, { parse_mode: "HTML" });
// //       }
// //     }
// //     res.json({ success: true });
// //   } catch (e) {
// //     res.json({ success: false });
// //   }
// // });






// bot.on("message", async (msg) => {
//   try {
//     /* ===== USER → ADMIN ===== */
//     if (msg.chat.type === "private") {
//       if (msg.text && msg.text.startsWith("/")) return;

//       const userId = msg.from.id;
//       const threadId = sessions[userId];
//       if (!threadId) return;

//       const opt = { message_thread_id: threadId };

//       if (msg.text) {
//         await bot.sendMessage(
//           ADMIN_GROUP_ID,
//           `👤 <b>Haridor:</b>\n${msg.text}`,
//           { ...opt, parse_mode: "HTML" }
//         );
//       }

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

//       if (msg.text) {
//         await bot.sendMessage(
//           userId,
//           `💬 <b>Admin:</b>\n${msg.text}`,
//           { parse_mode: "HTML" }
//         );
//       }

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
//     console.error("❌ Chat relay error:", e.message);
//   }
// });


// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;
//     const userId = Number(telegramId);

//     if (!userId || !Array.isArray(products) || products.length === 0) {
//       return res.json({ success: false, message: "Noto‘g‘ri ma’lumot" });
//     }

//     /* ===== REAL USD KURSI ===== */
//     const usdRate = await getUSDRate();

//     /* ===== BUYURTMA MATNI ===== */
//     const { text, totalUSD } = formatOrderText(products);
//     const totalUZS = totalUSD * usdRate;

//     /* ===== TOPIC / SESSION ===== */
//     let threadId = sessions[userId];

//     if (!threadId) {
//       const user = await bot.getChat(userId);

//       const topic = await bot.createForumTopic(
//         ADMIN_GROUP_ID,
//         safeTitle(`${user.first_name || "User"} | ${userId}`)
//       );

//       threadId = topic.message_thread_id;
//       sessions[userId] = threadId;
//       reverseSessions[threadId] = userId;

//       await sendUserInfoToAdmin(userId, threadId);
//     }

//     /* ===== ADMINGA BUYURTMA ===== */
//     await bot.sendMessage(ADMIN_GROUP_ID, text, {
//       parse_mode: "HTML",
//       message_thread_id: threadId,
//     });

//     /* ===== USERGA MAHSULOTLAR ===== */
//     for (const p of products) {
//       const img = await getImageSource(p.img);

//       const caption = `📦 <b>${p.title}</b>
// ${p.quantity} × ${p.price} ${p.currency}
// = ${p.quantity * p.price} ${p.currency}`;

//       if (img) {
//         await bot.sendPhoto(userId, img.source, {
//           caption,
//           parse_mode: "HTML",
//         });
//       } else {
//         await bot.sendMessage(userId, caption, { parse_mode: "HTML" });
//       }
//     }

//     /* ===== USERGA YAKUNIY XABAR ===== */
//     await bot.sendMessage(
//       userId,
//       `✅ <b>Buyurtma qabul qilindi</b>

// 🧾 <b>Jami:</b>
// 💵 ${totalUSD.toFixed(2)} $
// 💰 ${Math.round(totalUZS).toLocaleString()} so'm

// 📊 Kurs: 1$ = ${usdRate} so'm

// 📞 Adminlar tez orada siz bilan bog‘lanadi.`,
//       { parse_mode: "HTML" }
//     );

//     return res.json({ success: true });
//   } catch (e) {
//     console.error("❌ send-cart error:", e.message);
//     return res.json({ success: false });
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
import fetch from "node-fetch"; // Node 18+ bo‘lsa olib tashlasa ham bo‘ladi

/* ================== DIRNAME ================== */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================== CONFIG ================== */
const TOKEN = "8010354722:AAGF5owYJT4Dp1pt-3uNIwsQGniOfDi1ilo";
const ADMIN_GROUP_ID = -1003570889560;
const PORT = 3000;

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

function getImageContentType(filePath = "") {
  const ext = filePath.split(".").pop()?.toLowerCase();
  if (ext === "png") return "image/png";
  if (ext === "jpg" || ext === "jpeg") return "image/jpeg";
  if (ext === "svg") return "image/svg+xml";
  if (ext === "webp") return "image/webp";
  return "application/octet-stream";
}

async function getImageSource(imgPath) {
  if (!imgPath) return null;
  const file = path.join(__dirname, "uploads", path.basename(imgPath));
  if (fs.existsSync(file)) return { type: "file", source: file };
  return null;
}

/* ================== REAL USD ================== */
async function getUSDRate() {
  const res = await fetch("https://cbu.uz/uz/arkhiv-kursov-valyut/json/");
  const data = await res.json();
  const usd = data.find((c) => c.Ccy === "USD");
  return Number(usd.Rate);
}

/* ================== ORDER FORMAT ================== */
function formatOrderText(products) {
  let totalUSD = 0;
  let text = `🛒 <b>Yangi buyurtma</b>\n\n`;
  for (const p of products) {
    const sum = p.price * p.quantity;
    totalUSD += sum;

    text += `📦 <b>${p.title}</b>\n`;
    text += `${p.quantity} × ${p.price} ${p.currency}\n`;
    text += `= ${sum} ${p.currency}\n\n`;

    
  }
  
  return { text, totalUSD };
}
async function sendOrderSummaryToUser(userId, totalUSD, usdRate) {
  const totalUZS = totalUSD * usdRate;

  await bot.sendMessage(
    userId,
    `✅ <b>Buyurtma qabul qilindi</b>

🧾 <b>Jami:</b>
💵 $da: ${totalUSD.toFixed(2)} $
💰 so'mda: ${Math.round(totalUZS).toLocaleString()} so'm

📊 Kurs: 1$ = ${usdRate} so'm

📞 Adminlar tez orada siz bilan bog‘lanadi.`,
    { parse_mode: "HTML" }
  );
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

<b>Agr Tlegram ID ni olishni bilmasangiz</b>
1️⃣ /start buyrug'ini bosing
2️⃣ Sizning Telegram ID degan yozibni pastidagi raqamlar sizning Telegram ID raqamingizdir
3️⃣ Osha raqamlarni Telegram ID degan maydonga kiriting va buyurtmangizni yuboring

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

/* ================== CHAT RELAY ================== */
bot.on("message", async (msg) => {
  try {
    // ===== USER → ADMIN =====
    if (msg.chat.type === "private") {
      if (msg.text && msg.text.startsWith("/")) return;
      const userId = msg.from.id;
      const threadId = sessions[userId];
      if (!threadId) return;
      const opt = { message_thread_id: threadId };

      if (msg.text)
        await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Haridor:</b>\n${msg.text}`, {
          ...opt,
          parse_mode: "HTML",
        });
      if (msg.photo) await bot.sendPhoto(ADMIN_GROUP_ID, msg.photo.at(-1).file_id, opt);
      if (msg.video) await bot.sendVideo(ADMIN_GROUP_ID, msg.video.file_id, opt);
      if (msg.voice) await bot.sendVoice(ADMIN_GROUP_ID, msg.voice.file_id, opt);
      if (msg.document) await bot.sendDocument(ADMIN_GROUP_ID, msg.document.file_id, opt);
      if (msg.video_note) await bot.sendVideoNote(ADMIN_GROUP_ID, msg.video_note.file_id, opt);
    }

    // ===== ADMIN → USER =====
    if (msg.chat.id === ADMIN_GROUP_ID && msg.message_thread_id) {
      const userId = reverseSessions[msg.message_thread_id];
      if (!userId) return;

      if (msg.text) await bot.sendMessage(userId, `💬 <b>Admin:</b>\n${msg.text}`, { parse_mode: "HTML" });
      if (msg.photo) await bot.sendPhoto(userId, msg.photo.at(-1).file_id);
      if (msg.video) await bot.sendVideo(userId, msg.video.file_id);
      if (msg.voice) await bot.sendVoice(userId, msg.voice.file_id);
      if (msg.document) await bot.sendDocument(userId, msg.document.file_id);
      if (msg.video_note) await bot.sendVideoNote(userId, msg.video_note.file_id);
    }
  } catch (e) {
    console.error("❌ Chat relay error:", e.message);
  }
});

/* ================== SEND-CART ================== */
// app.post("/send-cart", async (req, res) => {
//   try {
//     const { telegramId, products } = req.body;
//     const userId = Number(telegramId);

//     if (!userId || !Array.isArray(products) || products.length === 0) {
//       return res.json({ success: false, message: "Noto‘g‘ri ma’lumot" });
//     }

//     const usdRate = await getUSDRate();
//     const { text, totalUSD } = formatOrderText(products);
//     const totalUZS = totalUSD * usdRate;

//     let threadId = sessions[userId];
//     if (!threadId) {
//       const user = await bot.getChat(userId);
//       const topic = await bot.createForumTopic(
//         ADMIN_GROUP_ID,
//         safeTitle(`${user.first_name || "User"} | ${userId}`)
//       );
//       threadId = topic.message_thread_id;
//       sessions[userId] = threadId;
//       reverseSessions[threadId] = userId;

//       await sendUserInfoToAdmin(userId, threadId);
//     }

//     await bot.sendMessage(ADMIN_GROUP_ID, text, {
//       parse_mode: "HTML",
//       message_thread_id: threadId,
//     });

//     for (const p of products) {
//       const img = await getImageSource(p.img);
//       const caption = `📦 <b>${p.title}</b>\n${p.quantity} × ${p.price} ${p.currency}\n= ${p.quantity * p.price} ${p.currency}`;

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

// 🧾 <b>Jami:</b>
// 💵 $da: ${totalUSD.toFixed(2)} $
// 💰so'mda: ${Math.round(totalUZS).toLocaleString()} so'm

// 📊 Kurs: 1$ = ${usdRate} so'm

// 📞 Adminlar tez orada siz bilan bog‘lanadi.`,
//       { parse_mode: "HTML" }
//     );
//   await sendOrderSummaryToUser(userId, totalUSD, usdRate);

//   await bot.sendMessage(ADMIN_GROUP_ID, `👤 <b>Buyurtma yakuniy summasi (User ${userId}):</b>\n\n${finalMessage}`, {
//       parse_mode: "HTML",
//       message_thread_id: threadId,
//     });
//     return res.json({ success: true });
//   } catch (e) {
//     console.error("❌ send-cart error:", e.message);
//     return res.json({ success: false });
//   }
// });



/* ================== SEND-CART ================== */
app.post("/send-cart", async (req, res) => {
  try {
    const { telegramId, products } = req.body;
    const userId = Number(telegramId);

    if (!userId || !Array.isArray(products) || products.length === 0) {
      return res.json({ success: false, message: "Noto‘g‘ri ma’lumot" });
    }

    const usdRate = await getUSDRate();
    const { text, totalUSD } = formatOrderText(products);
    const totalUZS = totalUSD * usdRate;

    let threadId = sessions[userId];
    if (!threadId) {
      const user = await bot.getChat(userId);
      const topic = await bot.createForumTopic(
        ADMIN_GROUP_ID,
        safeTitle(`${user.first_name || "User"} | ${userId}`)
      );
      threadId = topic.message_thread_id;
      sessions[userId] = threadId;
      reverseSessions[threadId] = userId;

      await sendUserInfoToAdmin(userId, threadId);
    }

    // 1️⃣ Adminga buyurtma tafsiloti
    await bot.sendMessage(ADMIN_GROUP_ID, text, {
      parse_mode: "HTML",
      message_thread_id: threadId,
    });

    // 2️⃣ Userga mahsulot rasmlari va matni
    for (const p of products) {
      const img = await getImageSource(p.img);
      const caption = `📦 <b>${p.title}</b>\n${p.quantity} × ${p.price} ${p.currency}\n= ${p.quantity * p.price} ${p.currency}`;

      if (img) {
        await bot.sendPhoto(userId, img.source, {
          caption,
          parse_mode: "HTML",
        });
      } else {
        await bot.sendMessage(userId, caption, { parse_mode: "HTML" });
      }
    }

    // 3️⃣ Yakuniy summa matnini yaratamiz
    const finalMessageForUser = `✅ <b>Buyurtma qabul qilindi</b>

🧾 <b>Jami:</b>
💵 $da: ${totalUSD.toFixed(2)} $
💰 so'mda: ${Math.round(totalUZS).toLocaleString()} so'm

📊 Kurs: 1$ = ${usdRate} so'm

📞 Adminlar tez orada siz bilan bog‘lanadi.`;
const finalMessageForAdmin =  `
🧾 <b>Jami:</b>
💵 $da: ${totalUSD.toFixed(2)} $
💰 so'mda: ${Math.round(totalUZS).toLocaleString()} so'm

📊 Kurs: 1$ = ${usdRate} so'm`;
    // 4️⃣ Userga yuboramiz
    await bot.sendMessage(userId, finalMessageForUser, { parse_mode: "HTML" });

    // 5️⃣ Admin topic ichida ham yuboramiz
    await bot.sendMessage(
      ADMIN_GROUP_ID,
      `👤 <b>Buyurtma yakuniy summasi 
      </b>\n\n${finalMessageForAdmin}`,
      { parse_mode: "HTML", message_thread_id: threadId }
    );
    console.log(userId);
    

    return res.json({ success: true });
  } catch (e) {
    console.error("❌ send-cart error:", e.message);
    return res.json({ success: false });
  }
});

/* ================== START ================== */
app.listen(PORT, () => {
  console.log(`🚀 Server ${PORT} portda ishlayapti`);
});
