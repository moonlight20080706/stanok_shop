import { useContext } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api"; // ✅ Rasmlar uchun alohida URL
import "./cart.css";
import { Link } from "react-router-dom";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [telegramId, setTelegramId] = useState("");
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
          } else if (
            item.img.startsWith("http") ||
            item.img.startsWith("blob:")
          ) {
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
            <article key={item.id} className="like-card">
              <Link
                to={`/product/${item.id}`}
                key={item.id}
                className="like-card"
              >
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
  );
};

export default Cart;
