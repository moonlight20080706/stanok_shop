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

































// //BU ISHLAYOTGAN TELEGRAM BOTLI VERSIYASI FAQATGINA CARTQUANTITY QO'SHILMAGAN HOLOS
// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import { Link } from "react-router-dom";
// import "./cart.css";

// const Cart = () => {
//   const { cartItems, removeFromCart , } = useContext(Context);
//   const [telegramId, setTelegramId] = useState("");
//   const [loading, setLoading] = useState(false);

//   // TOTAL PRICE
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   /**
//    * Rasm URL ini to'g'ri formatlash
//    */
//   const getImageUrl = (img) => {
//     if (!img) return "/no-image.png";
    
//     if (img.startsWith("http") || img.startsWith("blob:")) {
//       return img;
//     }

//     const cleanBase = BASE_URL_IMG.endsWith("/")
//       ? BASE_URL_IMG.slice(0, -1)
//       : BASE_URL_IMG;
//     const cleanImg = img.startsWith("/") ? img : `/${img}`;
    
//     return `${cleanBase}${cleanImg}`;
//   };

//   /**
//    * Cartni Telegram botga yuborish
//    */
//   const sendCart = async () => {
//     // Validatsiya
//     if (!telegramId.trim()) {
//       alert("❌ Telegram ID kiritish shart!");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("❌ Savat bo'sh!");
//       return;
//     }

//     // ID raqam ekanligini tekshirish
//     if (!/^\d+$/.test(telegramId.trim())) {
//       alert("❌ Telegram ID faqat raqamlardan iborat bo'lishi kerak!");
//       return;
//     }

//     setLoading(true);

//     // Mahsulotlarni tayyorlash (title, price, img)
//     const products = cartItems.map((item) => ({
//       title: item.title || "Noma'lum mahsulot",
//       price: parseFloat(item.price) || 0,
//       img: getImageUrl(item.img),
//     }));

//     try {
//       const res = await fetch("http://localhost:3000/send-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           telegramId: telegramId.trim(),
//           products,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert(
//           `✅ ${data.message}\n\nMahsulotlar soni: ${data.data?.productCount || cartItems.length}\nJami: ${data.data?.totalPrice?.toFixed(2) || total}$`
//         );
        
//         // Cartni tozalash
//         // cartItems.forEach((item) => removeFromCart(item.id));
//         setTelegramId("");
//       } else {
//         alert(data.message || "❌ Xatolik yuz berdi!");
//       }
//     } catch (err) {
//       console.error("Send cart error:", err);
//       alert(
//         "❌ Server bilan bog'lanishda xatolik!\n\nIltimos:\n1. Server ishga tushganligini tekshiring\n2. Telegram botga /start bosganingizni tasdiqlang\n3. To'g'ri Telegram ID kiritganingizni tekshiring"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Bo'sh savat
//   if (cartItems.length === 0) {
//     return (
//       <section className="like-page">
//         <div className="like-empty">
//           <h2>🛒 Savat bo'sh</h2>
//           <p>Hali birorta mahsulot qo'shilmagan</p>
//           <Link to="/products" className="btn-primary">
//             Mahsulotlarga o'tish
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="like-page">
//       <h1>🛒 Savat</h1>

//       <div className="like-cards">
//         {cartItems.map((item) => {
//           const imgSrc = getImageUrl(item.img);

//           return (
//             <article key={item.id} className="like-card">
//               <Link to={`/product/${item.id}`} className="like-card-link">
//                 <div className="like-card-media">
//                   <img
//                     src={imgSrc}
//                     alt={item.title}
//                     loading="lazy"
//                     onError={(e) => {
//                       e.target.src = "/no-image.png";
//                     }}
//                   />
//                 </div>
//                 <div className="like-card-body">
//                   <h3>{item.title}</h3>
//                   <p className="price">💰 {item.price}$</p>
//                   {item.quantity > 1 && (
//                     <p className="quantity">Miqdor: {item.quantity}</p>
//                   )}
//                 </div>
//               </Link>
//               <footer className="like-card-foot">
//                 <button
//                   className="btn-remove"
//                   onClick={() => removeFromCart(item.id)}
//                   aria-label={`${item.title}ni savatdan o'chirish`}
//                 >
//                   🗑️ O'chirish
//                 </button>
//               </footer>
//             </article>
//           );
//         })}
//       </div>

//       <div className="cart-summary">
//         <div className="total-price">
//           <h2>Jami:</h2>
//           <h2 className="price">{total.toFixed(2)}$</h2>
//         </div>

//         <div className="cart-form">
//           <div className="form-group">
//             <label htmlFor="telegram-id">
//               📱 Telegram ID <span className="required">*</span>
//             </label>
//             <input
//               id="telegram-id"
//               type="text"
//               placeholder="Masalan: 123456789"
//               value={telegramId}
//               onChange={(e) => setTelegramId(e.target.value)}
//               disabled={loading}
//               className="input-telegram-id"
//             />
//             <small className="help-text">
//               💡 Telegram ID olish uchun botga /start yuboring
//             </small>
//           </div>

//           <button
//             className="btn-submit"
//             onClick={sendCart}
//             disabled={loading || !telegramId.trim()}
//           >
//             {loading ? (
//               <>⏳ Yuborilmoqda...</>
//             ) : (
//               <>✉️ Adminga yuborish</>
//             )}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;




























//BUNDA FAQAT $ VA SO'M AJRAMAGAN HOLOS
// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import { Link } from "react-router-dom";
// import "./cart.css";

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//   } = useContext(Context);

//   const [telegramId, setTelegramId] = useState("");
//   const [loading, setLoading] = useState(false);

//   // ✅ TOTAL PRICE (cartQuantity asosida)
//   const total = cartItems.reduce(
//     (acc, item) => acc + item.price * item.cartQuantity,
//     0
//   );

//   // ✅ Rasm URL
//   const getImageUrl = (img) => {
//     if (!img) return "/no-image.png";
//     if (img.startsWith("http") || img.startsWith("blob:")) return img;

//     const cleanBase = BASE_URL_IMG.endsWith("/")
//       ? BASE_URL_IMG.slice(0, -1)
//       : BASE_URL_IMG;

//     const cleanImg = img.startsWith("/") ? img : `/${img}`;
//     return `${cleanBase}${cleanImg}`;
//   };

//   // ✅ Telegramga yuborish
//   const sendCart = async () => {
//     if (!telegramId.trim()) {
//       alert("❌ Telegram ID kiritish shart!");
//       return;
//     }

//     if (!/^\d+$/.test(telegramId.trim())) {
//       alert("❌ Telegram ID faqat raqamlardan iborat bo‘lishi kerak!");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("❌ Savat bo‘sh!");
//       return;
//     }

//     setLoading(true);

//     const products = cartItems.map((item) => ({
//       title: item.title,
//       price: item.price,
//       quantity: item.cartQuantity,
//       total: item.price * item.cartQuantity,
//       img: getImageUrl(item.img),
//     }));

//     try {
//       const res = await fetch("http://localhost:3000/send-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           telegramId: telegramId.trim(),
//           products,
//           totalPrice: total,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert(`✅ Buyurtma yuborildi!\n\nJami: ${total.toFixed(2)}$`);
//         setTelegramId("");
//       } else {
//         alert(data.message || "❌ Xatolik yuz berdi!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Server bilan bog‘lanishda xatolik!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ Bo‘sh savat
//   if (cartItems.length === 0) {
//     return (
//       <section className="like-page">
//         <div className="like-empty">
//           <h2>🛒 Savat bo‘sh</h2>
//           <p>Hali mahsulot qo‘shilmagan</p>
//           <Link to="/" className="btn-primary">
//             Mahsulotlarga o‘tish
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="like-page">
//       <h1>🛒 Savat</h1>

//       <div className="like-cards">
//         {cartItems.map((item) => (
//           <article key={item.id} className="like-card">
//             <Link to={`/product/${item.id}`} className="like-card-link">
//               <div className="like-card-media">
//                 <img
//                   src={getImageUrl(item.img)}
//                   alt={item.title}
//                   onError={(e) => (e.target.src = "/no-image.png")}
//                 />
//               </div>

//               <div className="like-card-body">
//                 <h3>{item.title}</h3>
//                 {/* <p className="price"> {item.price}$</p> */}
//                 <p className="price">
//   Boshlang'ich narx: {item.price} <span className="price-single"></span>
// </p>

// <p className="price-total">
//   🧮 Joriy narx:{" "}
//   <strong>
//     {(item.price * item.cartQuantity).toFixed(2)}
//   </strong>
// </p>

//               </div>
//             </Link>

//             {/* ✅ CART QUANTITY CONTROL */}
//             <div className="cart-quantity">
//               <button onClick={() => decreaseCartQuantity(item.id)}>−</button>
//               <span>{item.cartQuantity || 1}</span>
//               <button onClick={() => increaseCartQuantity(item.id)}>+</button>
//             </div>

//             <footer className="like-card-foot">
//               <button
//                 className="btn-remove"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 🗑️ O‘chirish
//               </button>
//             </footer>
//           </article>
//         ))}
//       </div>

//       {/* ✅ SUMMARY */}
//       <div className="cart-summary">
//         <div className="total-price">
//           <h2>Jami:</h2>
//           <h2 className="price">{total.toFixed(2)}$</h2>
//         </div>

//         <div className="cart-form">
//           <label>📱 Telegram ID</label>
//           <input
//             type="text"
//             placeholder="Masalan: 123456789"
//             value={telegramId}
//             onChange={(e) => setTelegramId(e.target.value)}
//             disabled={loading}
//           />

//           <button
//             className="btn-submit"
//             onClick={sendCart}
//             disabled={loading}
//           >
//             {loading ? "⏳ Yuborilmoqda..." : "✉️ Adminga yuborish"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;




















//BUNDA TELEGRAM BOT BN OZGINA MUAMMO BOR
// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import { Link } from "react-router-dom";
// import "./cart.css";

// const Cart = () => {
//   const {
//     cartItems,
//     removeFromCart,
//     increaseCartQuantity,
//     decreaseCartQuantity,
//   } = useContext(Context);

//   const [telegramId, setTelegramId] = useState("");
//   const [loading, setLoading] = useState(false);

//   // 💰 Kurs: 1$ = 11,000 so'm (o'zing xohlagan kursni qo'y)
//   const EXCHANGE_RATE = 11000;

//   // ✅ Rasm URL
//   const getImageUrl = (img) => {
//     if (!img) return "/no-image.png";
//     if (img.startsWith("http") || img.startsWith("blob:")) return img;

//     const cleanBase = BASE_URL_IMG.endsWith("/")
//       ? BASE_URL_IMG.slice(0, -1)
//       : BASE_URL_IMG;

//     const cleanImg = img.startsWith("/") ? img : `/${img}`;
//     return `${cleanBase}${cleanImg}`;
//   };

//   // ✅ TOTAL har ikki valyuta uchun
//   const totals = cartItems.reduce(
//     (acc, item) => {
//       const currency = item.currency || "$"; // default $
//       const price = item.price * item.cartQuantity;

//       if (currency === "USD") {
//         acc.totalSom += price * EXCHANGE_RATE; // $ → so'm
//         acc.totalUSD += price;                 // $ as is
//       } else if (currency === "UZS") {
//         acc.totalSom += price;                 // so'm as is
//         acc.totalUSD += price / EXCHANGE_RATE; // so'm → $
//       }

//       return acc;
//     },
//     { totalSom: 0, totalUSD: 0 }
//   );

//   // ✅ Telegramga yuborish
//   const sendCart = async () => {
//     if (!telegramId.trim()) {
//       alert("❌ Telegram ID kiritish shart!");
//       return;
//     }

//     if (!/^\d+$/.test(telegramId.trim())) {
//       alert("❌ Telegram ID faqat raqamlardan iborat bo‘lishi kerak!");
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert("❌ Savat bo‘sh!");
//       return;
//     }

//     setLoading(true);

//     const products = cartItems.map((item) => ({
//       title: item.title,
//       price: item.price,
//       quantity: item.cartQuantity,
//       total: item.price * item.cartQuantity,
//       currency: item.currency || "$",
//       img: getImageUrl(item.img),
//     }));

//     try {
//       const res = await fetch("http://localhost:3000/send-cart", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           telegramId: telegramId.trim(),
//           products,
//           totals,
//         }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         alert(
//           `✅ Buyurtma yuborildi!\n\nJami:\n$${totals.totalUSD.toFixed(
//             2
//           )}\nSo'm: ${totals.totalSom.toLocaleString()}`
//         );
//         setTelegramId("");
//       } else {
//         alert(data.message || "❌ Xatolik yuz berdi!");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("❌ Server bilan bog‘lanishda xatolik!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <section className="like-page">
//         <div className="like-empty">
//           <h2>🛒 Savat bo‘sh</h2>
//           <p>Hali mahsulot qo‘shilmagan</p>
//           <Link to="/" className="btn-primary">
//             Mahsulotlarga o‘tish
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="like-page">
//       <h1>🛒 Savat</h1>

//       <div className="like-cards">
//         {cartItems.map((item) => (
//           <article key={item.id} className="like-card">
//             <Link to={`/product/${item.id}`} className="like-card-link">
//               <div className="like-card-media">
//                 <img
//                   src={getImageUrl(item.img)}
//                   alt={item.title}
//                   onError={(e) => (e.target.src = "/no-image.png")}
//                 />
//               </div>

//               <div className="like-card-body">
//                 <h3>{item.title}</h3>
//                 <p  className="price">
//                   Boshlang'ich narx: {item.price} {item.currency == "UZS" ? "so'm" : "$"}
//                 </p>

//                 <p className="price-total">
//                   🧮 Joriy narx:{" "}
//                   <strong>
//                     {(item.price * item.cartQuantity).toLocaleString()}{" "}
//                     {item.currency == "UZS" ? "so'm" : "$"}
//                   </strong>
//                 </p>
//               </div>
//             </Link>

//             <div className="cart-quantity">
//               <button onClick={() => decreaseCartQuantity(item.id)}>−</button>
//               <span>{item.cartQuantity || 1}</span>
//               <button onClick={() => increaseCartQuantity(item.id)}>+</button>
//             </div>

//             <footer className="like-card-foot">
//               <button
//                 className="btn-remove"
//                 onClick={() => removeFromCart(item.id)}
//               >
//                 🗑️ O‘chirish
//               </button>
//             </footer>
//           </article>
//         ))}
//       </div>

//       <div className="cart-summary">
//         <div className="total-price">
//           <h2>Jami:</h2>
//           <h3>Jami $da: {totals.totalUSD.toFixed(2)} $</h3>
//           <h3>Jami so'mda: {totals.totalSom.toLocaleString()} so'm</h3>
//         </div>

//         <div className="cart-form-btns">
//           <label>📱 Telegram ID</label>
//           <input
//             type="text"
//             placeholder="Masalan: 123456789"
//             value={telegramId}
//             onChange={(e) => setTelegramId(e.target.value)}
//             disabled={loading}
//           />

//           <button
//             className="btn-submit"
//             onClick={sendCart}
//             disabled={loading}
//           >
//             {loading ? "⏳ Yuborilmoqda..." : "✉️ Adminga yuborish"}
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Cart;











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
                <h3 style={{"color":"red"}}>{item.title}</h3>

                <p
                  className="price"
                >
                  Boshlang'ich narx: {item.price} {item.currency}
                </p>

                <p className="price-total">
                  🧮 Joriy narx:{" "}
                  <strong>
                    {(item.price * item.cartQuantity).toLocaleString()}{" "}
                    {item.currency}
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
