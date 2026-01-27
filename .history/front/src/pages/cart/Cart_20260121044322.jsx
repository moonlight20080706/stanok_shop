// import { useContext } from "react";
// import { Context } from "../../context/useContext";
// import { BASE_URL_IMG } from "../../service/api"; // ✅ Rasmlar uchun alohida URL
// import "./cart.css";
// import { Link } from "react-router-dom";

// const Cart = () => {
//   const { cartItems, removeFromCart } = useContext(Context);
//   let total = 0;

//   console.log("🛒 cartItems:", cartItems);

//   if (cartItems.length === 0)
//     return <p className="like-empty">Savat bo{"'"}sh</p>;

//   return (
//     <section className="like-page">
//       <h1>Savat</h1>
//       <div className="like-cards">
//         {cartItems.map((item) => {
//           // 🖼 Rasm manzilini to‘g‘rilaymiz
//           let imgSrc = "";

//           if (!item.img) {
//             imgSrc = "/no-image.png"; // agar rasm yo‘q bo‘lsa
//           } else if (
//             item.img.startsWith("http") ||
//             item.img.startsWith("blob:")
//           ) {
//             imgSrc = item.img;
//           } else {
//             // ✅ BASE_URL_IMG ishlatamiz (emas BASE_URL)
//             const cleanBase = BASE_URL_IMG.endsWith("/")
//               ? BASE_URL_IMG.slice(0, -1)
//               : BASE_URL_IMG;
//             const cleanImg = item.img.startsWith("/")
//               ? item.img
//               : `/${item.img}`;
//             imgSrc = `${cleanBase}${cleanImg}`;
//           }

//           console.log("✅ Rasm manzili:", imgSrc);

//           total += item.quantity * item.price;

//           return (
//             <article key={item.id} className="like-card">
//               <Link
//                 to={`/product/${item.id}`}
//                 key={item.id}
//                 className="like-card"
//               >
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
//     </section>
//   );
// };

// export default Cart;












import { useContext } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api"; // ✅ Rasmlar uchun alohida URL
import "./cart.css";
import { Link } from "react-router-dom";


// =======================
// CONTEXT (Cart uchun)
// =======================
const Context = createContext();

export default function App() {
  // ======= Cart state =======
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [telegramId, setTelegramId] = useState("");

  // ======= Cart functions =======
  const addProduct = () => {
    if (!name.trim()) return alert("Mahsulot nomi bo‘sh bo‘lmasligi kerak!");
    const newProduct = {
      id: Date.now(),
      title: name,
      desc: "Tavsif yo‘q",
      price: Math.floor(Math.random() * 100) + 1,
      quantity: 1,
      img: "" // rasm yo‘q bo‘lsa
    };
    setCartItems([...cartItems, newProduct]);
    setProducts([...products, { id: newProduct.id, name }]);
    setName("");
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setProducts(products.filter((p) => p.id !== id));
  };

  const sendCart = async () => {
    if (!telegramId.trim()) return alert("Telegram ID kiritish shart!");
    if (cartItems.length === 0) return alert("Cart bo‘sh!");

    const res = await fetch("http://localhost:3000/send-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ telegramId: telegramId.trim(), products })
    });

    const data = await res.json();
    alert(data.message);
    if (data.success) setCartItems([]);
  };

  // ======= TOTAL PRICE =======
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  // ======= RETURN =======
  return (
    <Context.Provider value={{ cartItems, removeFromCart }}>
      <div style={{ padding: 20 }}>
        <h2>🛒 Shopping Cart</h2>

        {/* Product add */}
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Mahsulot nomi" 
        />
        <button onClick={addProduct}>Add</button>

        {/* Cart */}
        {cartItems.length === 0 ? (
          <p className="like-empty">Savat bo{"'"}sh</p>
        ) : (
          <section className="like-page">
            <h1>Savat</h1>
            <div className="like-cards">
              {cartItems.map((item) => {
                let imgSrc = "";
                if (!item.img) {
                  imgSrc = "/no-image.png";
                } else if (item.img.startsWith("http") || item.img.startsWith("blob:")) {
                  imgSrc = item.img;
                } else {
                  const cleanBase = BASE_URL_IMG.endsWith("/")
                    ? BASE_URL_IMG.slice(0, -1)
                    : BASE_URL_IMG;
                  const cleanImg = item.img.startsWith("/")
                    ? item.img
                    : `/${item.img}`;
                  imgSrc = `${cleanBase}${cleanImg}`;
                }

                return (
                  <article key={item.id} className="like-card">
                    <Link to={`/product/${item.id}`} className="like-card">
                      <div className="like-card-media">
                        <img src={imgSrc} alt={item.title} loading="lazy" />
                      </div>
                      <div className="like-card-body">
                        <h3>{item.title}</h3>
                        <p>{item.desc}</p>
                        <p>Narxi: {item.price}$</p>
                        <p>Soni: {item.quantity}</p>
                      </div>
                    </Link>
                    <footer className="like-card-foot">
                      <button onClick={() => removeFromCart(item.id)}>
                        Bekor qilish
                      </button>
                    </footer>
                  </article>
                );
              })}
            </div>

            <h2 className="total-price">Jami: {total}$</h2>
          </section>
        )}

        {/* Telegram */}
        <p>
          <a href="https://t.me/YOUR_BOT_USERNAME" target="_blank">
            Telegram botni ochib /start bosing
          </a>
        </p>

        <input 
          placeholder="Telegram IDingizni kiriting" 
          value={telegramId} 
          onChange={e => setTelegramId(e.target.value)} 
        />
        <button onClick={sendCart}>Adminga yuborish</button>
      </div>
    </Context.Provider>
  );
}
