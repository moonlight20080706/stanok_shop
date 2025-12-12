import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api, BASE_URL_IMG } from "../../service/api";
import toast from "react-hot-toast";
import { Context } from "../../context/useContext";
import "./product.css";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { token, cartItems, addToCart } = useContext(Context);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const { data, status } = await api.get(`/card/${id}`);
        if (status === 200) setProduct(data);
      } catch (err) {
        console.error("Mahsulotni olishda xato:", err);
        toast.error("Mahsulotni olishda xato");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  if (loading) return <p>Yuklanmoqda...</p>;
  if (!product) return <p>Mahsulot topilmadi</p>;

  const handleAddToCart = () => {
    addToCart([...cartItems, product]);
    toast.success("Mahsulot savatga qo‘shildi!");
  };

  return (
    <div className="product-page">
      {/* Chap taraf — rasm */}
      <div className="product-left">
        <img
          src={`${BASE_URL_IMG}${product.img}`}
          alt={product.title}
          className="product-img"
        />
      </div>

      {/* O‘ng taraf — ma’lumot */}
      <div className="product-right">
        <h1>{product.title}</h1>
        <p className="desc">{product.desc}</p>
        <p>
          <strong>Narxi:</strong> {product.price} so‘m
        </p>
        <p>
          <strong>Soni:</strong> {product.quantity} ta
        </p>

        {/* Agar token bo‘lmasa → tugma chiqadi */}
        {!token && (
          <button className="add-to-cart" onClick={handleAddToCart}>
            Savatga qo‘shish
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
