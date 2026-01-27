

import { useContext, useState } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api";
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    increaseCartQuantity,
    decreaseCartQuantity,
  } = useContext(Context);

  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);

  // 💰 Kurs (faqat jami hisoblash uchun)
  const EXCHANGE_RATE = 11000;

  // 🖼️ Image
  const getImageUrl = (img) => {
    if (!img) return "/no-image.png";
    if (img.startsWith("http") || img.startsWith("blob:")) return img;

    const cleanBase = BASE_URL_IMG.endsWith("/")
      ? BASE_URL_IMG.slice(0, -1)
      : BASE_URL_IMG;

    const cleanImg = img.startsWith("/") ? img : `/${img}`;
    return `${cleanBase}${cleanImg}`;
  };

  // ✅ JAMI (faqat hisoblash uchun, productlarga tegilmaydi)
  const totals = cartItems.reduce(
    (acc, item) => {
      const price = item.price * item.cartQuantity;

      if (item.currency === "$" || item.currency === "USD") {
        acc.totalUSD += price;
        acc.totalSom += price * EXCHANGE_RATE;
      }

      if (item.currency === "UZS" || item.currency === "so'm") {
        acc.totalSom += price;
        acc.totalUSD += price / EXCHANGE_RATE;
      }

      return acc;
    },
    { totalUSD: 0, totalSom: 0 }
  );

  // 📤 Telegramga yuborish
  const sendCart = async () => {
    if (!telegramId.trim()) {
      alert("❌ Telegram ID kiritish shart!");
      return;
    }

    if (!/^\d+$/.test(telegramId.trim())) {
      alert("❌ Telegram ID faqat raqamlardan iborat bo‘lishi kerak!");
      return;
    }

    if (cartItems.length === 0) {
      alert("❌ Savat bo‘sh!");
      return;
    }

    setLoading(true);

    // 🔥 Productlar ASL HOLICHA yuboriladi
    const products = cartItems.map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.cartQuantity,
      total: item.price * item.cartQuantity,
      currency: item.currency, // ❗❗ O‘ZGARTIRILMAYDI
      img: getImageUrl(item.img),
    }));

    try {
      const res = await fetch("http://localhost:3000/send-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramId: telegramId.trim(),
          products,
          totals: {
            totalUSD: totals.totalUSD.toFixed(2),
            totalSom: Math.round(totals.totalSom),
          },
        }),
      });

      const data = await res.json();

      if (data.success) {
        let message = "✅ Buyurtma yuborildi!\n\n";

        products.forEach((p) => {
          message += `${p.title}\n`;
          message += `${p.quantity} × ${p.price} ${p.currency} = ${p.total} ${p.currency}\n\n`;
        });

        message += `🧾 JAMI:\n`;
        message += `${totals.totalUSD.toFixed(2)} $\n`;
        message += `${Math.round(totals.totalSom).toLocaleString()} so'm`;

        alert(message);
        setTelegramId("");
      } else {
        alert(data.message || "❌ Xatolik!");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server bilan bog‘lanishda xatolik!");
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <section className="like-page">
        <div className="like-empty">
          <h2>🛒 Savat bo‘sh</h2>
          <p>Hali mahsulot qo‘shilmagan</p>
          <Link to="/" className="btn-primary">
            Mahsulotlarga o‘tish
          </Link>
        </div>
      </section>
    );
  }
  

  return (
    <section className="like-page">
      <h1>🛒 Savat</h1>

      <div className="like-cards">
        {cartItems.map((item) => (
          <article key={item.id} className="like-card">
            <Link to={`/product/${item.id}`} className="like-card-link">
              <div className="like-card-media">
                <img src={getImageUrl(item.img)} alt={item.title} />
              </div>

              <div className="like-card-body">
                <h3 className="like-card-title">{item.title}</h3>

                <p
                  className="price"
                >
                  Boshlang'ich narx: {item.price} {item.currency == "UZS" ? "so'm" : "$"}
                </p>

                <p className="price-total">
                  🧮 Joriy narx:{" "}
                  <strong>
                    {(item.price * item.cartQuantity).toLocaleString()}{" "}
                    {item.currency == "UZS" ? "so'm" : "$"}
                  </strong>
                </p>
              </div>
            </Link>

            <div className="cart-quantity">
              <button onClick={() => decreaseCartQuantity(item.id)}>−</button>
              <span>{item.cartQuantity}</span>
              <button onClick={() => increaseCartQuantity(item.id)}>+</button>
            </div>

            <footer className="like-card-foot">
              <button
                className="btn-remove"
                onClick={() => removeFromCart(item.id)}
              >
                🗑️ O‘chirish
              </button>
            </footer>
          </article>
        ))}
      </div>

      <div className="cart-summary">
        <div className="total-price">
          <h2>Jami:</h2>
          <h3>💵 $ da: {totals.totalUSD.toFixed(2)} $</h3>
          <h3>💰 So'mda: {Math.round(totals.totalSom).toLocaleString()} so'm</h3>
        </div>

        <div className="cart-form-btns">
          <label>📱 Telegram ID</label>
          <input
            type="text"
            value={telegramId}
            onChange={(e) => setTelegramId(e.target.value)}
            disabled={loading}
             placeholder="Masalan: 123456789"
          />

          <button onClick={sendCart} disabled={loading}  className="btn-submit">
            {loading ? "⏳ Yuborilmoqda..." : "✉️ Adminga yuborish"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
