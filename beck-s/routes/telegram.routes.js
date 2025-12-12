const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config();

const router = express.Router();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// 🧾 Kim kimligini saqlash uchun
const users = new Map(); // { userId: username }
const admins = [6487636544, 851975989]; // Azizbek, Dilshod

// 🧍‍♂️ Oddiy foydalanuvchi /start yozganda
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const name = msg.from.first_name || "Foydalanuvchi";

  users.set(chatId, name);
  bot.sendMessage(
    chatId,
    `Salom, ${name}! 😊\nSiz buyurtma berishingiz va admin bilan yozishishingiz mumkin.`
  );
});

// 🛒 Frontdan buyurtma yuborilganda
router.post("/send_order", async (req, res) => {
  try {
    const { userName, adminId, cartItems } = req.body;
    let message = `🆕 *Yangi buyurtma!*\n👤 Foydalanuvchi: ${userName}\n\n`;

    cartItems.forEach((item, i) => {
      message += `${i + 1}. ${item.title}\n`;
      message += `💰 Narxi: ${item.price}$\n📦 Soni: ${item.quantity}\n\n`;
    });

    // Adminga yuborish
    await bot.sendMessage(adminId, message, { parse_mode: "Markdown" });

    res.json({ success: true });
  } catch (error) {
    console.error("❌ Telegram xatolik:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// 💬 Har kim yozsa — bot avtomatik kimga yuborishni biladi
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  // /start ni e'tiborga olmasin
  if (text.startsWith("/start")) return;

  // Agar admin yozsa — foydalanuvchiga yuboradi
  if (admins.includes(chatId)) {
    const replyTo = msg.reply_to_message;
    if (replyTo) {
      // Reply kimga yozilganini topamiz
      const targetName = replyTo.text.match(/👤 (.*)/)?.[1];
      const targetId = [...users.entries()].find(([id, name]) => name === targetName)?.[0];
      if (targetId) {
        bot.sendMessage(targetId, `💬 Admin javobi: ${text}`);
      } else {
        bot.sendMessage(chatId, "❌ Foydalanuvchi topilmadi.");
      }
    } else {
      bot.sendMessage(chatId, "✉️ Javob yozish uchun foydalanuvchi xabariga reply qiling.");
    }
    return;
  }

  // Agar oddiy foydalanuvchi yozsa — adminlarga yuboradi
  if (!admins.includes(chatId)) {
    users.set(chatId, msg.from.first_name || "Anonim foydalanuvchi");
    admins.forEach((adminId) => {
      bot.sendMessage(
        adminId,
        `📩 Yangi xabar!\n👤 ${users.get(chatId)}\n💬 ${text}`,
        {
          reply_markup: {
            force_reply: true,
            selective: true,
          },
        }
      );
    });
  }
});

module.exports = router;
