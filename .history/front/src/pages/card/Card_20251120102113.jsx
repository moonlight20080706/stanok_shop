import { useContext } from "react";
import { BASE_URL_IMG } from "../../service/api";
import { FaHeart } from "react-icons/fa";
import { Context } from "../../context/useContext";
import "./card.css";
import { Link } from "react-router-dom";

export default function Card({
  data,
  deleteProduct,
  updateProduct,
  categoryName = [],
  selectedCategory,
}) {
  const { addToCart, toggleLike, removeLike, likes, admin, token } =
    useContext(Context);

  if (!data) return null;

  const { img, title, desc, price, quantity, createdAt, id, category_id } = data;

  const stringQuotes = (s) =>
    typeof s === "string" ? s.replace(/^"+|"+$/g, "") : s;

  const safeTitle = stringQuotes(title) || "Untitled";
  const safeDesc = stringQuotes(desc) || "";

  const shortDesc =
    safeDesc.length > 100 ? safeDesc.slice(0, 100) + "..." : safeDesc;

  const formattedPrice =
    typeof price === "number"
      ? new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(price)
      : price;

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString()
    : "";

  let imgSrc = "";
  if (img?.startsWith("blob:")) {
    imgSrc = img;
  } else if (img?.startsWith("http")) {
    imgSrc = img;
  } else if (img) {
    const fixedImg = img.replace("/uploadsimg", "/uploads/img");
    imgSrc = BASE_URL_IMG + fixedImg;
  } else {
    imgSrc = "/no-image.png";
  }

  const categoryObj = Array.isArray(categoryName)
    ? categoryName.find((c) => String(c.id) === String(category_id))
    : null;

  const isLiked = likes.some((item) => item.id === id);

  return (
    <Link to={`/product/${id}`} className="card-link">
      <article className="product-card">
        <div className="pro-card-media">
          <img src={imgSrc} alt={safeTitle} loading="lazy" />

          {admin && Object.keys(admin).length > 0 ? (
            <div className="admin-btns-overlay">
              {deleteProduct && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deleteProduct(id);
                  }}
                >
                  O‘chirish
                </button>
              )}
              {updateProduct && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateProduct({
                      id,
                      img,
                      title,
                      desc,
                      price,
                      quantity,
                      category_id,
                    });
                  }}
                >
                  O‘zgartirish
                </button>
              )}
            </div>
          ) : (
            <button
              className={`like-btn-overlay ${isLiked ? "liked" : ""}`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                isLiked ? removeLike(id) : toggleLike(data);
              }}
            >
              <FaHeart />
            </button>
          )}
        </div>

        <div className="price-card">
          {price !== undefined && (
            <span className="pro-price">{formattedPrice}</span>
          )}
        </div>

        <div className="pro-card-body">
          <h3 className="pro-card-title" title={safeTitle}>
            {safeTitle}
          </h3>
          {safeDesc && <p className="pro-card-desc">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis dolorem sunt tenetur! Minus labore voluptates, reprehenderit eum vel quibusdam voluptate asperiores nihil quo repellendus iste cum temporibus adipisci rem dignissimos facilis assumenda corporis quia aut sint eveniet. Quos, assumenda reprehenderit repudiandae rerum rem, earum ipsam enim mollitia consectetur, illum cupiditate?</p>}
          <h3>Miqdor: {quantity}</h3>
          <h4
            className={
              selectedCategory === category_id ? "active-category" : ""
            }
          >
            Kategoriya: {categoryObj ? categoryObj.cat_name : "Noma'lum"}
          </h4>
        </div>

        <footer className="pro-card-foot">
          {formattedDate && (
            <time className="pro-card-date">{formattedDate}</time>
          )}
          {!token && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(data);
              }}
              className="pro-card-btn"
            >
              Savatchaga
            </button>
          )}
        </footer>
      </article>
    </Link>
  );
}
