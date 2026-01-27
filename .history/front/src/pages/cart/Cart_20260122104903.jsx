// // import { useContext } from "react";
// // import { Context } from "../../context/useContext";
// // import { BASE_URL_IMG } from "../../service/api"; // ✅ Rasmlar uchun alohida URL
// // import "./cart.css";
// // import { Link } from "react-router-dom";

// // const Cart = () => {
// //   const { cartItems, removeFromCart } = useContext(Context);
// //   let total = 0;

// //   console.log("🛒 cartItems:", cartItems);

// //   if (cartItems.length === 0)
// //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// //   return (
// //     <section className="like-page">
// //       <h1>Savat</h1>
// //       <div className="like-cards">
// //         {cartItems.map((item) => {
// //           // 🖼 Rasm manzilini to‘g‘rilaymiz
// //           let imgSrc = "";

// //           if (!item.img) {
// //             imgSrc = "/no-image.png"; // agar rasm yo‘q bo‘lsa
// //           } else if (
// //             item.img.startsWith("http") ||
// //             item.img.startsWith("blob:")
// //           ) {
// //             imgSrc = item.img;
// //           } else {
// //             // ✅ BASE_URL_IMG ishlatamiz (emas BASE_URL)
// //             const cleanBase = BASE_URL_IMG.endsWith("/")
// //               ? BASE_URL_IMG.slice(0, -1)
// //               : BASE_URL_IMG;
// //             const cleanImg = item.img.startsWith("/")
// //               ? item.img
// //               : `/${item.img}`;
// //             imgSrc = `${cleanBase}${cleanImg}`;
// //           }

// //           console.log("✅ Rasm manzili:", imgSrc);

// //           total += item.quantity * item.price;

// //           return (
// //             <article key={item.id} className="like-card">
// //               <Link
// //                 to={`/product/${item.id}`}
// //                 key={item.id}
// //                 className="like-card"
// //               >
// //                 <div className="like-card-media">
// //                   <img src={imgSrc} alt={item.title} loading="lazy" />
// //                 </div>

// //                 <div className="like-card-body">
// //                   <h3>{item.title}</h3>
// //                   <p>{item.desc}</p>
// //                   <p>Narxi: {item.price}$</p>
// //                   <p>Soni: {item.quantity}</p>
// //                 </div>
// //               </Link>
// //               <footer className="like-card-foot">
// //                 <button onClick={() => removeFromCart(item.id)}>
// //                   Bekor qilish
// //                 </button>
// //               </footer>
// //             </article>
// //           );
// //         })}
// //       </div>

// //       <h2 className="total-price">Jami: {total}$</h2>
// //     </section>
// //   );
// // };

// // export default Cart;















// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import { Link } from "react-router-dom";
// import "./cart.css";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useContext(Context);
//   const [telegramId, setTelegramId] = useState("");

//   // ===========================
//   // TOTAL PRICE hisoblash
//   // ===========================
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // ===========================
//   // Telegramga yuborish
//   // ===========================
//   const sendCart = async () => {
//     if (!telegramId.trim()) return alert("Telegram ID kiritish shart!");
//     if (cartItems.length === 0) return alert("Cart bo‘sh!");

//     // products faqat minimal info yuborish
//     const products = cartItems.map((item) => ({
//       id: item.id,
//       title: item.title,
//       quantity: item.quantity,
//       price: item.price,
//     }));

//     try {
//       const res = await fetch("http://localhost:3000/send-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ telegramId: telegramId.trim(), products }),
//       });

//       const data = await res.json();
//       alert(data.message);
//       if (data.success) {
//         // Cartni tozalash
//         cartItems.forEach((item) => removeFromCart(item.id));
//         setTelegramId("");
//       }
//     } catch (err) {
//       console.error("Send cart error:", err);
//       alert("Xatolik yuz berdi! Server bilan bog‘lanib bo‘lmadi.");
//     }
//   };

//   // ===========================
//   // EMPTY CART CHECK
//   // ===========================
//   if (cartItems.length === 0)
//     return <p className="like-empty">Savat bo{"'"}sh</p>;

//   return (
//     <section className="like-page">
//       <h1>Savat</h1>
//       <div className="like-cards">
//         {cartItems.map((item) => {
//           // ===========================
//           // RASM MANZILINI TO‘G‘RILASH
//           // ===========================
//           let imgSrc = "";
//           if (!item.img) {
//             imgSrc = "/no-image.png";
//           } else if (item.img.startsWith("http") || item.img.startsWith("blob:")) {
//             imgSrc = item.img;
//           } else {
//             const cleanBase = BASE_URL_IMG.endsWith("/")
//               ? BASE_URL_IMG.slice(0, -1)
//               : BASE_URL_IMG;
//             const cleanImg = item.img.startsWith("/")
//               ? item.img
//               : `/${item.img}`;
//             imgSrc = `${cleanBase}${cleanImg}`;
//           }

//           return (
//             <article key={item.id} className="like-card">
//               <Link to={`/product/${item.id}`} className="like-card">
//                 <div className="like-card-media">
//                   <img src={imgSrc} alt={item.title} loading="lazy" />
//                 </div>
//                 <div className="like-card-body">
//                   <h3>{item.title}</h3>
//                   <p>{item.desc}</p>
//                   <p>Narxi: {item.price}$</p>
//                   <p>Soni: {item.quantity}</p>
//                 </div>
//               </Link>
//               <footer className="like-card-foot">
//                 <button onClick={() => removeFromCart(item.id)}>
//                   Bekor qilish
//                 </button>
//               </footer>
//             </article>
//           );
//         })}
//       </div>

//       <h2 className="total-price">Jami: {total}$</h2>

//       <input
//         placeholder="Telegram IDingizni kiriting"
//         value={telegramId}
//         onChange={(e) => setTelegramId(e.target.value)}
//       />
//       <button onClick={sendCart}>Adminga yuborish</button>
//     </section>
//   );
// };

// export default Cart;



























































































//
import { useContext, useState } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api";
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cartItems, removeFromCart , } = useContext(Context);
  const [telegramId, setTelegramId] = useState("");
  const [loading, setLoading] = useState(false);

  // TOTAL PRICE
  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  /**
   * Rasm URL ini to'g'ri formatlash
   */
  const getImageUrl = (img) => {
    if (!img) return "/no-image.png";
    
    if (img.startsWith("http") || img.startsWith("blob:")) {
      return img;
    }

    const cleanBase = BASE_URL_IMG.endsWith("/")
      ? BASE_URL_IMG.slice(0, -1)
      : BASE_URL_IMG;
    const cleanImg = img.startsWith("/") ? img : `/${img}`;
    
    return `${cleanBase}${cleanImg}`;
  };

  /**
   * Cartni Telegram botga yuborish
   */
  const sendCart = async () => {
    // Validatsiya
    if (!telegramId.trim()) {
      alert("❌ Telegram ID kiritish shart!");
      return;
    }

    if (cartItems.length === 0) {
      alert("❌ Savat bo'sh!");
      return;
    }

    // ID raqam ekanligini tekshirish
    if (!/^\d+$/.test(telegramId.trim())) {
      alert("❌ Telegram ID faqat raqamlardan iborat bo'lishi kerak!");
      return;
    }

    setLoading(true);

    // Mahsulotlarni tayyorlash (title, price, img)
    const products = cartItems.map((item) => ({
      title: item.title || "Noma'lum mahsulot",
      price: parseFloat(item.price) || 0,
      img: getImageUrl(item.img),
    }));

    try {
      const res = await fetch("http://localhost:3000/send-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramId: telegramId.trim(),
          products,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert(
          `✅ ${data.message}\n\nMahsulotlar soni: ${data.data?.productCount || cartItems.length}\nJami: ${data.data?.totalPrice?.toFixed(2) || total}$`
        );
        
        // Cartni tozalash
        // cartItems.forEach((item) => removeFromCart(item.id));
        setTelegramId("");
      } else {
        alert(data.message || "❌ Xatolik yuz berdi!");
      }
    } catch (err) {
      console.error("Send cart error:", err);
      alert(
        "❌ Server bilan bog'lanishda xatolik!\n\nIltimos:\n1. Server ishga tushganligini tekshiring\n2. Telegram botga /start bosganingizni tasdiqlang\n3. To'g'ri Telegram ID kiritganingizni tekshiring"
      );
    } finally {
      setLoading(false);
    }
  };

  // Bo'sh savat
  if (cartItems.length === 0) {
    return (
      <section className="like-page">
        <div className="like-empty">
          <h2>🛒 Savat bo'sh</h2>
          <p>Hali birorta mahsulot qo'shilmagan</p>
          <Link to="/products" className="btn-primary">
            Mahsulotlarga o'tish
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="like-page">
      <h1>🛒 Savat</h1>

      <div className="like-cards">
        {cartItems.map((item) => {
          const imgSrc = getImageUrl(item.img);

          return (
            <article key={item.id} className="like-card">
              <Link to={`/product/${item.id}`} className="like-card-link">
                <div className="like-card-media">
                  <img
                    src={imgSrc}
                    alt={item.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/no-image.png";
                    }}
                  />
                </div>
                <div className="like-card-body">
                  <h3>{item.title}</h3>
                  <p className="price">💰 {item.price}$</p>
                  {item.quantity > 1 && (
                    <p className="quantity">Miqdor: {item.quantity}</p>
                  )}
                </div>
              </Link>
              <footer className="like-card-foot">
                <button
                  className="btn-remove"
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`${item.title}ni savatdan o'chirish`}
                >
                  🗑️ O'chirish
                </button>
              </footer>
            </article>
          );
        })}
      </div>

      <div className="cart-summary">
        <div className="total-price">
          <h2>Jami:</h2>
          <h2 className="price">{total.toFixed(2)}$</h2>
        </div>

        <div className="cart-form">
          <div className="form-group">
            <label htmlFor="telegram-id">
              📱 Telegram ID <span className="required">*</span>
            </label>
            <input
              id="telegram-id"
              type="text"
              placeholder="Masalan: 123456789"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              disabled={loading}
              className="input-telegram-id"
            />
            <small className="help-text">
              💡 Telegram ID olish uchun botga /start yuboring
            </small>
          </div>

          <button
            className="btn-submit"
            onClick={sendCart}
            disabled={loading || !telegramId.trim()}
          >
            {loading ? (
              <>⏳ Yuborilmoqda...</>
            ) : (
              <>✉️ Adminga yuborish</>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;

















































































// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import { Link } from "react-router-dom";
// import "./cart.css";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useContext(Context);
//   const [telegramId, setTelegramId] = useState("");

//   // TOTAL PRICE
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   // SEND CART TO TELEGRAM
//   const sendCart = async () => {
//     if (!telegramId.trim()) return alert("Telegram ID kiritish shart!");
//     if (cartItems.length === 0) return alert("Cart bo‘sh!");

//     // Telegramga yuborish uchun faqat rasm, title, price
//     const products = cartItems.map((item) => {
//       let imgSrc = "";

//       if (!item.img) {
//         imgSrc = "/no-image.png";
//       } else if (item.img.startsWith("http") || item.img.startsWith("blob:")) {
//         imgSrc = item.img;
//       } else {
//         const cleanBase = BASE_URL_IMG.endsWith("/")
//           ? BASE_URL_IMG.slice(0, -1)
//           : BASE_URL_IMG;
//         const cleanImg = item.img.startsWith("/")
//           ? item.img
//           : `/${item.img}`;
//         imgSrc = `${cleanBase}${cleanImg}`;
//       }

//       return {
//         title: item.title,
//         price: item.price,
//         img: imgSrc,
//       };
//     });

//     try {
//       const res = await fetch("http://localhost:3000/send-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ telegramId: telegramId.trim(), products }),
//       });

//       const data = await res.json();
//       alert(data.message);
//       if (data.success) {
//         // Cartni tozalash
//         cartItems.forEach((item) => removeFromCart(item.id));
//         setTelegramId("");
//       }
//     } catch (err) {
//       console.error("Send cart error:", err);
//       alert("Xatolik yuz berdi! Server bilan bog‘lanib bo‘lmadi.");
//     }
//   };

//   if (cartItems.length === 0)
//     return <p className="like-empty">Savat bo{"'"}sh</p>;

//   return (
//     <section className="like-page">
//       <h1>Savat</h1>
//       <div className="like-cards">
//         {cartItems.map((item) => {
//           let imgSrc = "";

//           if (!item.img) {
//             imgSrc = "/no-image.png";
//           } else if (item.img.startsWith("http") || item.img.startsWith("blob:")) {
//             imgSrc = item.img;
//           } else {
//             const cleanBase = BASE_URL_IMG.endsWith("/")
//               ? BASE_URL_IMG.slice(0, -1)
//               : BASE_URL_IMG;
//             const cleanImg = item.img.startsWith("/")
//               ? item.img
//               : `/${item.img}`;
//             imgSrc = `${cleanBase}${cleanImg}`;
//           }

//           return (
//             <article key={item.id} className="like-card">
//               <Link to={`/product/${item.id}`} className="like-card">
//                 <div className="like-card-media">
//                   <img src={imgSrc} alt={item.title} loading="lazy" />
//                 </div>
//                 <div className="like-card-body">
//                   <h3>{item.title}</h3>
//                   <p>Narxi: {item.price}$</p>
//                 </div>
//               </Link>
//               <footer className="like-card-foot">
//                 <button onClick={() => removeFromCart(item.id)}>
//                   Bekor qilish
//                 </button>
//               </footer>
//             </article>
//           );
//         })}
//       </div>

//       <h2 className="total-price">Jami: {total}$</h2>

//       <input
//         placeholder="Telegram IDingizni kiriting"
//         value={telegramId}
//         onChange={(e) => setTelegramId(e.target.value)}
//       />
//       <button onClick={sendCart}>Adminga yuborish</button>
//     </section>
//   );
// };

// export default Cart;
