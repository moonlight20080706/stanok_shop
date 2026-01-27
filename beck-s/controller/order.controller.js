// const db = require("../models");
// const Order = db.order;
// const bot = require("../bot/telegramBot");

// // exports.createOrder = async (req, res) => {
// //   try {
// //     const order = await Order.create({
// //       adminId: req.body.adminId,
// //       telegramId: req.body.telegramId,
// //       telegramUsername: req.body.telegramUsername,
// //       products: req.body.products
// //     });

// //     res.json({
// //       message: "Order yaratildi",
// //       order
// //     });

// //   } catch (err) {
// //     res.status(500).json({ error: err.message });
// //   }
// // };

// exports.createOrder = async (req, res) => {
//   try {
//     const {
//       adminId,
//       telegramId,
//       telegramUsername,
//       products
//     } = req.body;

//     const order = await Order.create({
//       adminId,
//       telegramId,
//       telegramUsername,
//       products
//     });

//     // 📩 TELEGRAMGA YUBORISH
//     let text = `🛒 Yangi buyurtma!\n\n`;
//     text += `👤 Telegram: @${telegramUsername || "username yo‘q"}\n`;
//     text += `🆔 ID: ${telegramId}\n\n`;
//     text += `📦 Mahsulotlar:\n`;

//     products.forEach((p, i) => {
//       text += `${i + 1}. ${p.title} — ${p.qty} ta — ${p.price} so‘m\n`;
//     });

// // const message = await bot.sendMessage(adminId, text, {
// //   reply_markup: {
// //     inline_keyboard: [
// //       [
// //         {
// //           text: "✅ Qabul qilindi",
// //           callback_data: `accept_${order.id}`
// //         }
// //       ]
// //     ]
// //   }
// // });


// const message = await bot.sendMessage(adminId, text, {
//   reply_markup: {
//     inline_keyboard: [
//       [
//         { text: "✅ Qabul qilindi", callback_data: `accept_${order.id}` },
//         { text: "💬 Javob yozish", callback_data: `reply_${order.id}` }
//       ]
//     ]
//   }
// });


//     res.json({
//       message: "Order yaratildi va adminga yuborildi",
//       order
//     });

//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };



const bot = require("../bot/telegramBot");
const db = require("../models");

// exports.createOrder = async (req, res) => {
//   try {
//     const { userId, userTelegramId, items } = req.body;

//     // DB ga saqlaymiz
//     const order = await db.order.create({
//       userId,
//       userTelegramId,
//       items,
//       status: "new"
//     });

//     // Admin Telegramga xabar yuborish
//     const adminId = process.env.ADMIN_TELEGRAM_ID;
//     const text = `🛒 Yangi buyurtma #${order.id}\n\nItems: ${JSON.stringify(items)}`;

//     await bot.sendMessage(adminId, text, {
//       reply_markup: {
//         inline_keyboard: [
//           [
//             { text: "✅ Qabul qilindi", callback_data: `accept_${order.id}` },
//             { text: "💬 Javob yozish", callback_data: `reply_${order.id}` }
//           ]
//         ]
//       }
//     });

//     res.status(201).json({ message: "Order yuborildi", orderId: order.id });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server xatosi" });
//   }
// };


exports.createOrder = async (req, res) => {
  try {
    const { customer_name, phone, total_price, items } = req.body;

    if (!items || !items.length) {
      return res.status(400).json({ message: "Items bo‘sh" });
    }

    const order = await Order.create({
      customer_name,
      phone,
      total_price
    });

    for (const item of items) {
      await OrderItem.create({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price
      });
    }

    res.status(201).json({ orderId: order.id });
  } catch (error) {
    console.error("ORDER CREATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
