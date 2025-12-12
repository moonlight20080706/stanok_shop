import { useContext } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api"; // ✅ Rasmlar uchun alohida URL
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(Context);
  let total = 0;

  console.log("🛒 cartItems:", cartItems);

  if (cartItems.length === 0)
    return <p className="like-empty">Savat bo{"'"}sh</p>;

  return (
    <section className="like-page">
      <h1>Savat</h1>
      <div className="like-cards">
        {cartItems.map((item) => {
          // 🖼 Rasm manzilini to‘g‘rilaymiz
          let imgSrc = "";

          if (!item.img) {
            imgSrc = "/no-image.png"; // agar rasm yo‘q bo‘lsa
          } else if (item.img.startsWith("http") || item.img.startsWith("blob:")) {
            imgSrc = item.img;
          } else {
            // ✅ BASE_URL_IMG ishlatamiz (emas BASE_URL)
            const cleanBase = BASE_URL_IMG.endsWith("/")
              ? BASE_URL_IMG.slice(0, -1)
              : BASE_URL_IMG;
            const cleanImg = item.img.startsWith("/")
              ? item.img
              : `/${item.img}`;
            imgSrc = `${cleanBase}${cleanImg}`;
          }

          console.log("✅ Rasm manzili:", imgSrc);

          total += item.quantity * item.price;

          return (
            <Link to={`/product/${item.id}`} key={item.id} className="like-card"></Link>
          );
        })}
      </div>

      <h2 className="total-price">Jami: {total}$</h2>
    </section>
  );
};

export default Cart;





// // // // // import { useContext } from "react";
// // // // // import { Context } from "../../context/useContext";
// // // // // import { BASE_URL_IMG } from "../../service/api";
// // // // // import "./cart.css";

// // // // // const BOT_TOKEN = `8282392813:AAE_NyoJNNCx8M8oA7csHymSBXxzob3lSbU`; // 🔹 BotFather'dan olgan tokeningni yoz
// // // // // const ADMIN_IDS = [6487636544 , 851975989]; // 🔹 @userinfobot orqali olgan ID ni yoz (bir nechta bo‘lsa, vergul bilan ajrat)

// // // // // const Cart = () => {
// // // // //   const { cartItems, removeFromCart } = useContext(Context);
// // // // //   let total = 0;

// // // // //   // 🟢 Savat bo‘sh bo‘lsa
// // // // //   if (cartItems.length === 0)
// // // // //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// // // // //   // 🟢 Adminga yuborish funksiyasi
// // // // //   const sendCartToAdmin = () => {
// // // // //     if (cartItems.length === 0) {
// // // // //       alert("Savat bo‘sh!");
// // // // //       return;
// // // // //     }

// // // // //     // 1️⃣ Xabar matnini tayyorlaymiz
// // // // //     let message = "🛍 Yangi buyurtma:\n\n";
// // // // //     cartItems.forEach((item, index) => {
// // // // //       message += `${index + 1}. ${item.title}\n`;
// // // // //       message += `Narxi: ${item.price}$\n`;
// // // // //       message += `Soni: ${item.quantity}\n\n`;
// // // // //     });
// // // // //     message += `💰 Jami: ${cartItems.reduce(
// // // // //       (sum, item) => sum + item.price * item.quantity,
// // // // //       0
// // // // //     )}$`;

// // // // //     // 2️⃣ Har bir adminga yuboramiz
// // // // //     ADMIN_IDS.forEach((adminId) => {
// // // // //       fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           chat_id: adminId,
// // // // //           text: message,
// // // // //         }),
// // // // //       })
// // // // //         .then((res) => res.json())
// // // // //         .then((data) => {
// // // // //           console.log("✅ Adminga yuborildi:", data);
// // // // //           alert("✅ Buyurtmangiz adminga yuborildi!");
// // // // //         })
// // // // //         .catch((err) => {
// // // // //           console.error("❌ Xatolik:", err);
// // // // //           alert("❌ Xatolik yuz berdi. Iltimos, keyinroq urinib ko‘ring.");
// // // // //         });
// // // // //     });
// // // // //   };

// // // // //   // 🧩 Mahsulotlarni chizamiz
// // // // //   return (
// // // // //     <section className="like-page">
// // // // //       <h1>Savat</h1>
// // // // //       <div className="like-cards">
// // // // //         {cartItems.map((item) => {
// // // // //           let imgSrc = "";

// // // // //           if (!item.img) {
// // // // //             imgSrc = "/no-image.png";
// // // // //           } else if (
// // // // //             item.img.startsWith("http") ||
// // // // //             item.img.startsWith("blob:")
// // // // //           ) {
// // // // //             imgSrc = item.img;
// // // // //           } else {
// // // // //             const cleanBase = BASE_URL_IMG.endsWith("/")
// // // // //               ? BASE_URL_IMG.slice(0, -1)
// // // // //               : BASE_URL_IMG;
// // // // //             const cleanImg = item.img.startsWith("/")
// // // // //               ? item.img
// // // // //               : `/${item.img}`;
// // // // //             imgSrc = `${cleanBase}${cleanImg}`;
// // // // //           }

// // // // //           total += item.quantity * item.price;

// // // // //           return (
// // // // //             <article key={item.id} className="like-card">
// // // // //               <div className="like-card-media">
// // // // //                 <img src={imgSrc} alt={item.title} loading="lazy" />
// // // // //               </div>

// // // // //               <div className="like-card-body">
// // // // //                 <h3>{item.title}</h3>
// // // // //                 <p>Narxi: {item.price}$</p>
// // // // //                 <p>Soni: {item.quantity}</p>
// // // // //               </div>

// // // // //               <footer className="like-card-foot">
// // // // //                 <button onClick={() => removeFromCart(item.id)}>
// // // // //                   Bekor qilish
// // // // //                 </button>
// // // // //               </footer>
// // // // //             </article>
// // // // //           );
// // // // //         })}
// // // // //       </div>

// // // // //       <h2 className="total-price">Jami: {total}$</h2>

// // // // //       {/* 🟢 Adminga yuborish tugmasi */}
// // // // //       <button
// // // // //         className="send-to-admin"
// // // // //         onClick={sendCartToAdmin}
// // // // //         style={{
// // // // //           marginTop: "20px",
// // // // //           padding: "10px 20px",
// // // // //           background: "#0088cc",
// // // // //           color: "white",
// // // // //           border: "none",
// // // // //           borderRadius: "8px",
// // // // //           cursor: "pointer",
// // // // //         }}
// // // // //       >
// // // // //         📤 Adminga yuborish
// // // // //       </button>
// // // // //     </section>
// // // // //   );
// // // // // };

// // // // // export default Cart;



















// // // // import { useContext, useState } from "react";
// // // // import { Context } from "../../context/useContext";
// // // // import { BASE_URL_IMG } from "../../service/api";
// // // // import "./cart.css";

// // // // const BOT_TOKEN = `8282392813:AAE_NyoJNNCx8M8oA7csHymSBXxzob3lSbU`; // 🔹 BotFather'dan olgan tokeningni yoz
// // // // const ADMINS = [
// // // //   { id: 6487636544, name: "Azizbek" },
// // // //   { id: 851975989, name: "Dilshod" },
// // // // ];

// // // // // const ADMINS = [6487636544 , 851975989]; // 🔹 @userinfobot orqali olgan ID ni yoz (bir nechta bo‘lsa, vergul bilan ajrat)


// // // // const Cart = () => {
// // // //   const { cartItems, removeFromCart } = useContext(Context);
// // // //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// // // //   const [userName, setUserName] = useState(""); // foydalanuvchi ismini so‘rash uchun

// // // //   if (cartItems.length === 0)
// // // //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// // // //   const sendCartToAdmin = () => {
// // // //     if (!selectedAdmin) {
// // // //       alert("Iltimos, adminni tanlang!");
// // // //       return;
// // // //     }

// // // //     if (!userName.trim()) {
// // // //       alert("Ismingizni kiriting!");
// // // //       return;
// // // //     }

// // // //     let message = `🆕 Yangi buyurtma\n👤 Foydalanuvchi: ${userName}\n\n`;
// // // //     cartItems.forEach((item, i) => {
// // // //       message += `${i + 1}. ${item.title}\n`;
// // // //       message += `Narxi: ${item.price}$\nSoni: ${item.quantity}\n\n`;
// // // //     });

// // // //     fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({
// // // //         chat_id: selectedAdmin,
// // // //         text: message,
// // // //       }),
// // // //     })
// // // //       .then((res) => res.json())
// // // //       .then(() => {
// // // //         alert("✅ Buyurtma yuborildi!");
// // // //       })
// // // //       .catch(() => {
// // // //         alert("❌ Xatolik yuz berdi!");
// // // //       });
// // // //   };

// // // //   return (
// // // //     <section className="like-page">
// // // //       <h1>Savat</h1>
// // // //       <div className="like-cards">
// // // //         {cartItems.map((item) => (
// // // //           <article key={item.id} className="like-card">
// // // //             <div className="like-card-media">
// // // //               <img
// // // //                 src={
// // // //                   item.img?.startsWith("http")
// // // //                     ? item.img
// // // //                     : BASE_URL_IMG + item.img
// // // //                 }
// // // //                 alt={item.title}
// // // //               />
// // // //             </div>
// // // //             <div className="like-card-body">
// // // //               <h3>{item.title}</h3>
// // // //               <p>Narxi: {item.price}$</p>
// // // //               <p>Soni: {item.quantity}</p>
// // // //             </div>
// // // //             <footer className="like-card-foot">
// // // //               <button onClick={() => removeFromCart(item.id)}>
// // // //                 Bekor qilish
// // // //               </button>
// // // //             </footer>
// // // //           </article>
// // // //         ))}
// // // //       </div>

// // // //       {/* Ism kiritish */}
// // // //       <input
// // // //         type="text"
// // // //         placeholder="Ismingizni kiriting"
// // // //         value={userName}
// // // //         onChange={(e) => setUserName(e.target.value)}
// // // //         style={{
// // // //           marginTop: "20px",
// // // //           padding: "8px",
// // // //           borderRadius: "6px",
// // // //           border: "1px solid #ccc",
// // // //         }}
// // // //       />

// // // //       {/* Admin tanlash */}
// // // //       <h3 style={{ marginTop: "20px" }}>Adminni tanlang:</h3>
// // // //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// // // //         {ADMINS.map((admin) => (
// // // //           <button
// // // //             key={admin.id}
// // // //             onClick={() => setSelectedAdmin(admin.id)}
// // // //             style={{
// // // //               padding: "8px 12px",
// // // //               borderRadius: "8px",
// // // //               border:
// // // //                 selectedAdmin === admin.id ? "2px solid #0088cc" : "1px solid #aaa",
// // // //               background:
// // // //                 selectedAdmin === admin.id ? "#0088cc" : "#f0f0f0",
// // // //               color: selectedAdmin === admin.id ? "white" : "black",
// // // //               cursor: "pointer",
// // // //             }}
// // // //           >
// // // //             {admin.name}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       <button
// // // //         onClick={sendCartToAdmin}
// // // //         style={{
// // // //           marginTop: "25px",
// // // //           padding: "10px 20px",
// // // //           background: "#28a745",
// // // //           color: "#fff",
// // // //           border: "none",
// // // //           borderRadius: "8px",
// // // //           cursor: "pointer",
// // // //         }}
// // // //       >
// // // //         📤 Adminga yuborish
// // // //       </button>
// // // //     </section>
// // // //   );
// // // // };

// // // // export default Cart;





// // // // import { useContext, useState } from "react";
// // // // import { Context } from "../../context/useContext";
// // // // import { BASE_URL_IMG } from "../../service/api";
// // // // import "./cart.css";

// // // // // const ADMINS = [
// // // // //   { id: 6487636544, name: "Azizbek" },
// // // // //   { id: 851975989, name: "Dilshod" },
// // // // // ];

// // // // // const BOT_USERNAME = "moonlight_shop_bot"; // <-- o'z bot username'ingni yoz (masalan: myshop_support_bot)
// // // // const BOT_USERNAME = `8282392813:AAE_NyoJNNCx8M8oA7csHymSBXxzob3lSbU`; // 🔹 BotFather'dan olgan tokeningni yoz
// // // // const ADMINS = [
// // // //   { id: 6487636544, name: "Azizbek" },
// // // //   { id: 851975989, name: "Dilshod" },
// // // // ];
// // // // const Cart = () => {
// // // //   const { cartItems, removeFromCart } = useContext(Context);
// // // //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// // // //   const [userName, setUserName] = useState("");
// // // //   const [botLink, setBotLink] = useState("");

// // // //   if (cartItems.length === 0)
// // // //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// // // //   const sendCartToAdmin = () => {
// // // //     if (!selectedAdmin) {
// // // //       alert("Iltimos, adminni tanlang!");
// // // //       return;
// // // //     }

// // // //     if (!userName.trim()) {
// // // //       alert("Ismingizni kiriting!");
// // // //       return;
// // // //     }

// // // //     let message = `🆕 Yangi buyurtma\n👤 Foydalanuvchi: ${userName}\n`;
// // // //     message += `📞 Admin: ${
// // // //       ADMINS.find((a) => a.id === selectedAdmin)?.name
// // // //     }\n\n`;

// // // //     cartItems.forEach((item, i) => {
// // // //       message += `${i + 1}. ${item.title}\n`;
// // // //       message += `Narxi: ${item.price}$\nSoni: ${item.quantity}\n\n`;
// // // //     });

// // // //     // ✅ Backend (Python bot) ga yuborish
// // // //     fetch("http://localhost:5000/send_order", {
// // // //       method: "POST",
// // // //       headers: { "Content-Type": "application/json" },
// // // //       body: JSON.stringify({
// // // //         userName,
// // // //         adminId: selectedAdmin,
// // // //         cartItems,
// // // //       }),
// // // //     })
// // // //       .then((res) => res.json())
// // // //       .then((data) => {
// // // //         alert("✅ Buyurtma yuborildi!");
// // // //         setBotLink(`https://t.me/${BOT_USERNAME}`);
// // // //       })
// // // //       .catch((err) => {
// // // //         console.error("❌ Xatolik:", err);
// // // //         alert("❌ Xatolik yuz berdi!");
// // // //       });
// // // //   };

// // // //   return (
// // // //     <section className="like-page">
// // // //       <h1>Savat</h1>
// // // //       <div className="like-cards">
// // // //         {cartItems.map((item) => (
// // // //           <article key={item.id} className="like-card">
// // // //             <div className="like-card-media">
// // // //               <img
// // // //                 src={
// // // //                   item.img?.startsWith("http")
// // // //                     ? item.img
// // // //                     : BASE_URL_IMG + item.img
// // // //                 }
// // // //                 alt={item.title}
// // // //               />
// // // //             </div>
// // // //             <div className="like-card-body">
// // // //               <h3>{item.title}</h3>
// // // //               <p>Narxi: {item.price}$</p>
// // // //               <p>Soni: {item.quantity}</p>
// // // //             </div>
// // // //             <footer className="like-card-foot">
// // // //               <button onClick={() => removeFromCart(item.id)}>
// // // //                 Bekor qilish
// // // //               </button>
// // // //             </footer>
// // // //           </article>
// // // //         ))}
// // // //       </div>

// // // //       <input
// // // //         type="text"
// // // //         placeholder="Ismingizni kiriting"
// // // //         value={userName}
// // // //         onChange={(e) => setUserName(e.target.value)}
// // // //         style={{
// // // //           marginTop: "20px",
// // // //           padding: "8px",
// // // //           borderRadius: "6px",
// // // //           border: "1px solid #ccc",
// // // //         }}
// // // //       />

// // // //       <h3 style={{ marginTop: "20px" }}>Adminni tanlang:</h3>
// // // //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// // // //         {ADMINS.map((admin) => (
// // // //           <button
// // // //             key={admin.id}
// // // //             onClick={() => setSelectedAdmin(admin.id)}
// // // //             style={{
// // // //               padding: "8px 12px",
// // // //               borderRadius: "8px",
// // // //               border:
// // // //                 selectedAdmin === admin.id
// // // //                   ? "2px solid #0088cc"
// // // //                   : "1px solid #aaa",
// // // //               background:
// // // //                 selectedAdmin === admin.id ? "#0088cc" : "#f0f0f0",
// // // //               color: selectedAdmin === admin.id ? "white" : "black",
// // // //               cursor: "pointer",
// // // //             }}
// // // //           >
// // // //             {admin.name}
// // // //           </button>
// // // //         ))}
// // // //       </div>

// // // //       <button
// // // //         onClick={sendCartToAdmin}
// // // //         style={{
// // // //           marginTop: "25px",
// // // //           padding: "10px 20px",
// // // //           background: "#28a745",
// // // //           color: "#fff",
// // // //           border: "none",
// // // //           borderRadius: "8px",
// // // //           cursor: "pointer",
// // // //         }}
// // // //       >
// // // //         📤 Adminga yuborish
// // // //       </button>

// // // //       {botLink && (
// // // //         <a
// // // //           href={botLink}
// // // //           target="_blank"
// // // //           rel="noopener noreferrer"
// // // //           style={{
// // // //             display: "inline-block",
// // // //             marginTop: "15px",
// // // //             padding: "10px 20px",
// // // //             background: "#0088cc",
// // // //             color: "white",
// // // //             borderRadius: "8px",
// // // //             textDecoration: "none",
// // // //           }}
// // // //         >
// // // //           🤖 Telegram orqali admin bilan yozishish
// // // //         </a>
// // // //       )}
// // // //     </section>
// // // //   );
// // // // };

// // // // export default Cart;



// // // import { useContext, useState } from "react";
// // // import { Context } from "../../context/useContext";
// // // import { BASE_URL_IMG } from "../../service/api";
// // // import "./cart.css";

// // // // ✅ Bu yerga BOT TOKEN emas, botning @username'ini yozasiz!
// // // // Masalan: @moonlight_shop_bot (lekin @ belgisisiz)
// // // const BOT_USERNAME = "moonlight_shop_bot"; 

// // // // ✅ Adminlar ro‘yxati
// // // const ADMINS = [
// // //   { id: 6487636544, name: "Azizbek" },
// // //   { id: 851975989, name: "Dilshod" },
// // // ];

// // // const Cart = () => {
// // //   const { cartItems, removeFromCart } = useContext(Context);
// // //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// // //   const [userName, setUserName] = useState("");
// // //   const [botLink, setBotLink] = useState("");

// // //   if (cartItems.length === 0)
// // //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// // //   const sendCartToAdmin = () => {
// // //     if (!selectedAdmin) {
// // //       alert("Iltimos, adminni tanlang!");
// // //       return;
// // //     }

// // //     if (!userName.trim()) {
// // //       alert("Ismingizni kiriting!");
// // //       return;
// // //     }

// // //     // 🧾 Xabar tarkibini yig‘amiz
// // //     let message = `🆕 Yangi buyurtma!\n👤 Foydalanuvchi: ${userName}\n`;
// // //     message += `📞 Admin: ${
// // //       ADMINS.find((a) => a.id === selectedAdmin)?.name
// // //     }\n\n`;

// // //     cartItems.forEach((item, i) => {
// // //       message += `${i + 1}. ${item.title}\n`;
// // //       message += `Narxi: ${item.price}$\nSoni: ${item.quantity}\n\n`;
// // //     });

// // //     // ✅ Python backend'ga yuboramiz
// // //     fetch("http://localhost:7070/api/send_order", {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify({
// // //         userName,
// // //         adminId: selectedAdmin,
// // //         cartItems,
// // //       }),
// // //     })
// // //       .then((res) => res.json())
// // //       .then(() => {
// // //         alert("✅ Buyurtma yuborildi!");
// // //         // 🟢 Botga yo‘naltirish havolasini ochamiz
// // //         setBotLink(`https://t.me/${BOT_USERNAME}`);
// // //       })
// // //       .catch((err) => {
// // //         console.error("❌ Xatolik:", err);
// // //         alert("❌ Xatolik yuz berdi! Python server ishlayaptimi?");
// // //       });
// // //   };

// // //   return (
// // //     <section className="like-page">
// // //       <h1>Savat</h1>
// // //       <div className="like-cards">
// // //         {cartItems.map((item) => (
// // //           <article key={item.id} className="like-card">
// // //             <div className="like-card-media">
// // //               <img
// // //                 src={
// // //                   item.img?.startsWith("http")
// // //                     ? item.img
// // //                     : BASE_URL_IMG + item.img
// // //                 }
// // //                 alt={item.title}
// // //               />
// // //             </div>
// // //             <div className="like-card-body">
// // //               <h3>{item.title}</h3>
// // //               <p>Narxi: {item.price}$</p>
// // //               <p>Soni: {item.quantity}</p>
// // //             </div>
// // //             <footer className="like-card-foot">
// // //               <button onClick={() => removeFromCart(item.id)}>
// // //                 Bekor qilish
// // //               </button>
// // //             </footer>
// // //           </article>
// // //         ))}
// // //       </div>

// // //       {/* Foydalanuvchi ismi */}
// // //       <input
// // //         type="text"
// // //         placeholder="Ismingizni kiriting"
// // //         value={userName}
// // //         onChange={(e) => setUserName(e.target.value)}
// // //         style={{
// // //           marginTop: "20px",
// // //           padding: "8px",
// // //           borderRadius: "6px",
// // //           border: "1px solid #ccc",
// // //         }}
// // //       />

// // //       {/* Admin tanlash */}
// // //       <h3 style={{ marginTop: "20px" }}>Adminni tanlang:</h3>
// // //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// // //         {ADMINS.map((admin) => (
// // //           <button
// // //             key={admin.id}
// // //             onClick={() => setSelectedAdmin(admin.id)}
// // //             style={{
// // //               padding: "8px 12px",
// // //               borderRadius: "8px",
// // //               border:
// // //                 selectedAdmin === admin.id
// // //                   ? "2px solid #0088cc"
// // //                   : "1px solid #aaa",
// // //               background:
// // //                 selectedAdmin === admin.id ? "#0088cc" : "#f0f0f0",
// // //               color: selectedAdmin === admin.id ? "white" : "black",
// // //               cursor: "pointer",
// // //             }}
// // //           >
// // //             {admin.name}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Yuborish tugmasi */}
// // //       <button
// // //         onClick={sendCartToAdmin}
// // //         style={{
// // //           marginTop: "25px",
// // //           padding: "10px 20px",
// // //           background: "#28a745",
// // //           color: "#fff",
// // //           border: "none",
// // //           borderRadius: "8px",
// // //           cursor: "pointer",
// // //         }}
// // //       >
// // //         📤 Adminga yuborish
// // //       </button>

// // //       {/* Botga o‘tish havolasi */}
// // //       {botLink && (
// // //         <a
// // //           href={botLink}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           style={{
// // //             display: "inline-block",
// // //             marginTop: "15px",
// // //             padding: "10px 20px",
// // //             background: "#0088cc",
// // //             color: "white",
// // //             borderRadius: "8px",
// // //             textDecoration: "none",
// // //           }}
// // //         >
// // //           🤖 Telegram orqali admin bilan yozishish
// // //         </a>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default Cart;







// // // import { useContext, useState } from "react";
// // // import { Context } from "../../context/useContext";
// // // import { BASE_URL_IMG, api } from "../../service/api"; // ✅ api import qilindi
// // // import toast from "react-hot-toast";
// // // import "./cart.css";

// // // const BOT_USERNAME = "moonlight_shop_bot"; // @ belgisisiz
// // // const ADMINS = [
// // //   { id: 6487636544, name: "Azizbek" },
// // //   { id: 851975989, name: "Dilshod" },
// // // ];

// // // const Cart = () => {
// // //   const { cartItems, removeFromCart } = useContext(Context);
// // //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// // //   const [userName, setUserName] = useState("");
// // //   const [botLink, setBotLink] = useState("");

// // //   if (cartItems.length === 0)
// // //     return <p className="like-empty">Savat bo{"'"}sh</p>;

// // //   const sendCartToAdmin = async () => {
// // //     if (!selectedAdmin) {
// // //       toast.error("Iltimos, adminni tanlang!");
// // //       return;
// // //     }

// // //     if (!userName.trim()) {
// // //       toast.error("Ismingizni kiriting!");
// // //       return;
// // //     }

// // //     // 🧾 Xabar tarkibi
// // //     let message = `🆕 Yangi buyurtma!\n👤 Foydalanuvchi: ${userName}\n`;
// // //     message += `📞 Admin: ${
// // //       ADMINS.find((a) => a.id === selectedAdmin)?.name
// // //     }\n\n`;

// // //     cartItems.forEach((item, i) => {
// // //       message += `${i + 1}. ${item.title}\n`;
// // //       message += `Narxi: ${item.price}$\nSoni: ${item.quantity}\n\n`;
// // //     });

// // //     try {
// // //       const res = await api.post("/send_order", {
// // //         userName,
// // //         adminId: selectedAdmin,
// // //         cartItems,
// // //       });

// // //       if (res.status === 200) {
// // //         toast.success("✅ Buyurtma yuborildi!");
// // //         setBotLink(`https://t.me/${BOT_USERNAME}`);
// // //       } else {
// // //         toast.error("❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
// // //       }
// // //     } catch (error) {
// // //       console.error("❌ Xatolik:", error);
// // //       toast.error("Server bilan bog‘lanishda xatolik yuz berdi!");
// // //     }
// // //   };

// // //   return (
// // //     <section className="like-page">
// // //       <h1>Savat</h1>
// // //       <div className="like-cards">
// // //         {cartItems.map((item) => (
// // //           <article key={item.id} className="like-card">
// // //             <div className="like-card-media">
// // //               <img
// // //                 src={
// // //                   item.img?.startsWith("http")
// // //                     ? item.img
// // //                     : BASE_URL_IMG + item.img
// // //                 }
// // //                 alt={item.title}
// // //               />
// // //             </div>
// // //             <div className="like-card-body">
// // //               <h3>{item.title}</h3>
// // //               <p>Narxi: {item.price}$</p>
// // //               <p>Soni: {item.quantity}</p>
// // //             </div>
// // //             <footer className="like-card-foot">
// // //               <button onClick={() => removeFromCart(item.id)}>
// // //                 Bekor qilish
// // //               </button>
// // //             </footer>
// // //           </article>
// // //         ))}
// // //       </div>

// // //       {/* Foydalanuvchi ismi */}
// // //       <input
// // //         type="text"
// // //         placeholder="Ismingizni kiriting"
// // //         value={userName}
// // //         onChange={(e) => setUserName(e.target.value)}
// // //         style={{
// // //           marginTop: "20px",
// // //           padding: "8px",
// // //           borderRadius: "6px",
// // //           border: "1px solid #ccc",
// // //         }}
// // //       />

// // //       {/* Admin tanlash */}
// // //       <h3 style={{ marginTop: "20px" }}>Adminni tanlang:</h3>
// // //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// // //         {ADMINS.map((admin) => (
// // //           <button
// // //             key={admin.id}
// // //             onClick={() => setSelectedAdmin(admin.id)}
// // //             style={{
// // //               padding: "8px 12px",
// // //               borderRadius: "8px",
// // //               border:
// // //                 selectedAdmin === admin.id
// // //                   ? "2px solid #0088cc"
// // //                   : "1px solid #aaa",
// // //               background:
// // //                 selectedAdmin === admin.id ? "#0088cc" : "#f0f0f0",
// // //               color: selectedAdmin === admin.id ? "white" : "black",
// // //               cursor: "pointer",
// // //             }}
// // //           >
// // //             {admin.name}
// // //           </button>
// // //         ))}
// // //       </div>

// // //       {/* Yuborish tugmasi */}
// // //       <button
// // //         onClick={sendCartToAdmin}
// // //         style={{
// // //           marginTop: "25px",
// // //           padding: "10px 20px",
// // //           background: "#28a745",
// // //           color: "#fff",
// // //           border: "none",
// // //           borderRadius: "8px",
// // //           cursor: "pointer",
// // //         }}
// // //       >
// // //         📤 Adminga yuborish
// // //       </button>

// // //       {/* Botga o‘tish havolasi */}
// // //       {botLink && (
// // //         <a
// // //           href={botLink}
// // //           target="_blank"
// // //           rel="noopener noreferrer"
// // //           style={{
// // //             display: "inline-block",
// // //             marginTop: "15px",
// // //             padding: "10px 20px",
// // //             background: "#0088cc",
// // //             color: "white",
// // //             borderRadius: "8px",
// // //             textDecoration: "none",
// // //           }}
// // //         >
// // //           🤖 Telegram orqali admin bilan yozishish
// // //         </a>
// // //       )}
// // //     </section>
// // //   );
// // // };

// // // export default Cart;










// // import { useContext, useState } from "react";
// // import { Context } from "../../context/useContext";
// // import axios from "axios";
// // import toast from "react-hot-toast";
// // import { BASE_URL_IMG } from "../../service/api";
// // import "./cart.css";

// // const BOT_USERNAME = "moonlight_shop_bot"; // @ belgisisiz
// // const ADMINS = [
// //   { id: 6487636544, name: "Azizbek" },
// //   { id: 851975989, name: "Dilshod" },
// // ];

// // const Cart = () => {
// //   const { cartItems, removeFromCart } = useContext(Context);
// //   const [selectedAdmin, setSelectedAdmin] = useState(null);
// //   const [userName, setUserName] = useState("");
// //   const [botLink, setBotLink] = useState("");

// //   // Agar savat bo‘sh bo‘lsa
// //   if (!cartItems || cartItems.length === 0)
// //     return <p className="like-empty">Savat bo'sh</p>;

// //   // 🧾 Adminga buyurtma yuborish funksiyasi
// //   const sendCartToAdmin = async () => {
// //     if (!selectedAdmin) {
// //       toast.error("Iltimos, adminni tanlang!");
// //       return;
// //     }

// //     if (!userName.trim()) {
// //       toast.error("Ismingizni kiriting!");
// //       return;
// //     }

// //     try {
// //       const res = await axios.post("http://localhost:7070/api/send_order", {
// //         userName,
// //         adminId: selectedAdmin,
// //         cartItems,
// //       });

// //       if (res.data.success) {
// //         toast.success("✅ Buyurtma muvaffaqiyatli yuborildi!");
// //         setBotLink(`https://t.me/${BOT_USERNAME}`);
// //       } else {
// //         toast.error("❌ Xatolik yuz berdi, qayta urinib ko‘ring.");
// //       }
// //     } catch (error) {
// //       console.error("❌ Xatolik:", error);
// //       toast.error("Server bilan bog‘lanishda xatolik yuz berdi!");
// //     }
// //   };

// //   return (
// //     <section className="like-page">
// //       <h1>Savat</h1>
// //       <div className="like-cards">
// //         {cartItems.map((item) => (
// //           <article key={item.id} className="like-card">
// //             <div className="like-card-media">
// //               <img
// //                 src={
// //                   item.img?.startsWith("http")
// //                     ? item.img
// //                     : BASE_URL_IMG + item.img
// //                 }
// //                 alt={item.title}
// //               />
// //             </div>
// //             <div className="like-card-body">
// //               <h3>{item.title}</h3>
// //               <p>Narxi: {item.price}$</p>
// //               <p>Soni: {item.quantity}</p>
// //             </div>
// //             <footer className="like-card-foot">
// //               <button onClick={() => removeFromCart(item.id)}>
// //                 Bekor qilish
// //               </button>
// //             </footer>
// //           </article>
// //         ))}
// //       </div>

// //       {/* Foydalanuvchi ismi */}
// //       <input
// //         type="text"
// //         placeholder="Ismingizni kiriting"
// //         value={userName}
// //         onChange={(e) => setUserName(e.target.value)}
// //         style={{
// //           marginTop: "20px",
// //           padding: "8px",
// //           borderRadius: "6px",
// //           border: "1px solid #ccc",
// //         }}
// //       />

// //       {/* Admin tanlash */}
// //       <h3 style={{ marginTop: "20px" }}>Adminni tanlang:</h3>
// //       <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
// //         {ADMINS.map((admin) => (
// //           <button
// //             key={admin.id}
// //             onClick={() => setSelectedAdmin(admin.id)}
// //             style={{
// //               padding: "8px 12px",
// //               borderRadius: "8px",
// //               border:
// //                 selectedAdmin === admin.id
// //                   ? "2px solid #0088cc"
// //                   : "1px solid #aaa",
// //               background:
// //                 selectedAdmin === admin.id ? "#0088cc" : "#f0f0f0",
// //               color: selectedAdmin === admin.id ? "white" : "black",
// //               cursor: "pointer",
// //             }}
// //           >
// //             {admin.name}
// //           </button>
// //         ))}
// //       </div>

// //       {/* Yuborish tugmasi */}
// //       <button
// //         onClick={sendCartToAdmin}
// //         style={{
// //           marginTop: "25px",
// //           padding: "10px 20px",
// //           background: "#28a745",
// //           color: "#fff",
// //           border: "none",
// //           borderRadius: "8px",
// //           cursor: "pointer",
// //         }}
// //       >
// //         📤 Adminga yuborish
// //       </button>

// //       {/* Botga o‘tish havolasi */}
// //       {botLink && (
// //         <a
// //           href={botLink}
// //           target="_blank"
// //           rel="noopener noreferrer"
// //           style={{
// //             display: "inline-block",
// //             marginTop: "15px",
// //             padding: "10px 20px",
// //             background: "#0088cc",
// //             color: "white",
// //             borderRadius: "8px",
// //             textDecoration: "none",
// //           }}
// //         >
// //           🤖 Telegram orqali admin bilan yozishish
// //         </a>
// //       )}
// //     </section>
// //   );
// // };

// // export default Cart;










// import { useContext, useState } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api";
// import "./cart.css";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useContext(Context);
//   const [selectedAdmin, setSelectedAdmin] = useState("");
//   const admins = [
//     { id: 6487636544, name: "Admin A" },
//     { id: 851975989, name: "Admin B" },
//   ];

//   let total = 0;

//   const sendToAdmin = async () => {
//     if (!selectedAdmin) return alert("Iltimos, admin tanlang!");

//     const res = await fetch("http://localhost:7070/sendCart", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         adminId: selectedAdmin,
//         userName: "Foydalanuvchi 1",
//         products: cartItems,
//       }),
//     });

//     const data = await res.json();
//     if (data.ok) {
//       alert("Buyurtma adminga yuborildi!");
//     }
//   };

//   if (cartItems.length === 0)
//     return <p className="like-empty">Savat bo'sh</p>;

//   return (
//     <section className="like-page">
//       <h1>Savat</h1>

//       <select onChange={(e) => setSelectedAdmin(e.target.value)}>
//         <option value="">Admin tanlang</option>
//         {admins.map((a) => (
//           <option key={a.id} value={a.id}>{a.name}</option>
//         ))}
//       </select>

//       <button onClick={sendToAdmin}>Adminga yuborish</button>

//       <div className="like-cards">
//         {cartItems.map((item) => {
//           let imgSrc = item.img?.startsWith("http")
//             ? item.img
//             : `${BASE_URL_IMG}/${item.img}`;

//           total += item.quantity * item.price;

//           return (
//             <article key={item.id} className="like-card">
//               <div className="like-card-media">
//                 <img src={imgSrc} alt={item.title} />
//               </div>
//               <div className="like-card-body">
//                 <h3>{item.title}</h3>
//                 <p>Narxi: {item.price}$</p>
//                 <p>Soni: {item.quantity}</p>
//               </div>
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
//     </section>
//   );
// };

// export default Cart;
