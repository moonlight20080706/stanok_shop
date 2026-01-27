// // // const TelegramBot = require("node-telegram-bot-api");

// // // const BOT_TOKEN = "8305857510:AAH4j5AwWIdsm87VgrY0hdh149oEE2_ZFGI";

// // // const bot = new TelegramBot(BOT_TOKEN, {
// // //   polling: true
// // // });

// // // module.exports = bot;
// // const TelegramBot = require("node-telegram-bot-api");
// // const db = require("../models");

// // const BOT_TOKEN = "8305857510:AAH4j5AwWIdsm87VgrY0hdh149oEE2_ZFGI";

// // const bot = new TelegramBot(BOT_TOKEN, {
// //   polling: true
// // });

// // bot.on("callback_query", async (query) => {
// //   const data = query.data; // masalan: accept_12
// //   const chatId = query.message.chat.id;

// //   if (data.startsWith("accept_")) {
// //     const orderId = data.split("_")[1];

// //     const Order = db.order;

// //     await Order.update(
// //       { status: "accepted" },
// //       { where: { id: orderId } }
// //     );

// //     await bot.sendMessage(chatId, `✅ Order #${orderId} qabul qilindi`);

// //     // tugmani o‘chiramiz
// //     await bot.editMessageReplyMarkup(
// //       { inline_keyboard: [] },
// //       {
// //         chat_id: chatId,
// //         message_id: query.message.message_id
// //       }
// //     );
// //   }
// // });

// // module.exports = bot;



// bot.on("callback_query", async (query) => {
//   const data = query.data; // accept_12 yoki reply_12
//   const chatId = query.message.chat.id;

//   if (data.startsWith("accept_")) {
//     const orderId = data.split("_")[1];
//     const Order = db.order;
//     await Order.update({ status: "accepted" }, { where: { id: orderId } });

//     await bot.sendMessage(chatId, `✅ Order #${orderId} qabul qilindi`);
//     await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: query.message.message_id });
//   }

//   if (data.startsWith("reply_")) {
//     const orderId = data.split("_")[1];

//     // Keyingi bosqich: admin yozadi → bot ushbu xabarni userga yuboradi
//     await bot.sendMessage(chatId, `✍️ Order #${orderId} uchun javob yozing:`);

//     // bu yerda reply_handler yaratamiz
//     bot.once("message", async (msg) => {
//       const replyText = msg.text;

//       // DB’dan order userId olamiz
//       const order = await db.order.findByPk(orderId);

//       if (!order) return;

//       // userga yuborish
//       await bot.sendMessage(order.userTelegramId, `📦 Order #${orderId} haqida admin javobi:\n\n${replyText}`);

//       // adminga tasdiq
//       await bot.sendMessage(chatId, `✅ Javob yuborildi!`);
//     });
//   }
// });




const TelegramBot = require("node-telegram-bot-api");
const db = require("../models");

const BOT_TOKEN = "8305857510:AAH4j5AwWIdsm87VgrY0hdh149oEE2_ZFGI";

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// ADMIN INLINE BUTTON CALLBACK
bot.on("callback_query", async (query) => {
  const data = query.data; // accept_12 yoki reply_12
  const chatId = query.message.chat.id;

  // ✅ QABUL QILINDI
  if (data.startsWith("accept_")) {
    const orderId = data.split("_")[1];
    const Order = db.order;
    await Order.update({ status: "accepted" }, { where: { id: orderId } });

    await bot.sendMessage(chatId, `✅ Order #${orderId} qabul qilindi`);

    // tugmani o‘chirish
    await bot.editMessageReplyMarkup(
      { inline_keyboard: [] },
      { chat_id: chatId, message_id: query.message.message_id }
    );
  }

  // 💬 JAVOB YOZISH
  if (data.startsWith("reply_")) {
    const orderId = data.split("_")[1];

    await bot.sendMessage(chatId, `✍️ Order #${orderId} uchun javob yozing:`);

    // Admin keyingi yozgan xabarini faqat 1 marta oladi
    bot.once("message", async (msg) => {
      const replyText = msg.text;

      // DB’dan user Telegram ID olamiz
      const order = await db.order.findByPk(orderId);
      if (!order) return;

      // Userga yuborish
      await bot.sendMessage(order.userTelegramId, `📦 Order #${orderId} haqida admin javobi:\n\n${replyText}`);

      // Adminga tasdiq
      await bot.sendMessage(chatId, `✅ Javob yuborildi!`);
    });
  }
});

module.exports = bot;
