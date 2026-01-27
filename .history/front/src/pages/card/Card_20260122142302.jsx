import { useContext, useState } from "react";
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
  const { addToCart, toggleLike, removeLike, likes, admin, token, cartItems } =
    useContext(Context);

  const [expanded, setExpanded] = useState(false); // <-- yangi holat

  if (!data) return null;

  const { img, title, desc, price, quantity, createdAt, id, category_id } =
    data;

  const stringQuotes = (s) =>
    typeof s === "string" ? s.replace(/^"+|"+$/g, "") : s;

  const safeTitle = stringQuotes(title) || "Untitled";
  const safeDesc = stringQuotes(desc) || "";

  // --- O'ZGARTIRILGAN QISM: 50 belgidan kesib, batafsil ko'rsatish ---
  const MAX_PREVIEW = 15;
  const isLongDesc = safeDesc.length > MAX_PREVIEW;
  const shortDesc = isLongDesc
    ? safeDesc.slice(0, MAX_PREVIEW) + "..."
    : safeDesc;
  // ---------------------------------------------------------------

  // const formattedPrice =
  //   typeof price === "number"
  //     ? new Intl.NumberFormat(undefined, {
  //         style: "currency",
  //         currency: "USD",
  //         maximumFractionDigits: 0,
  //       }).format(price)
  //     : price;

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

  // batafsil tugmasi bosilganda chaqiladigan funksiya
  const handleReadMoreClick = (e) => {
    e.preventDefault(); // Linkni ishga tushirmaslik uchun
    e.stopPropagation(); // eventni ota elementlarga yubormaslik uchun
    setExpanded((s) => !s); // expand / collapse
  };

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
                  O‘chirish 🗑️
                </button>
              )}
              {updateProduct && (
                <button
                  className="admin-btns"
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
                  O‘zgartirish ✏️
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
              <FaHeart className="like" />
            </button>
          )}
        </div>

        {/* <div className="price-card">
          {price !== undefined && (
            <button className="pro-price">{price}</button>
          )}
        </div> */}
<div className="price-card">
  {price !== undefined && (
    <button className="pro-price">
      {typeof price === "number"
        ? `${price.toLocaleString("en-US")} ${
            data.currency === "USD" ? "$" : "so'm"
          }`
        : price}
    </button>
  )}
</div>


        <div className="pro-card-body">
          <h3 className="pro-card-title" title={safeTitle}>
            {safeTitle}
          </h3>

          {safeDesc && (
            <p className="pro-card-desc">
              {expanded || !isLongDesc ? safeDesc : shortDesc}
              {isLongDesc && (
                <button
                  className="read-more"
                  onClick={handleReadMoreClick}
                  aria-expanded={expanded}
                >
                  {expanded ? " yopish" : " batafsil"}
                </button>
              )}
            </p>
          )}

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
          {!token &&
            (cartItems.some((item) => item.id === id) ? (
              <button className="pro-card-btn in-cart" disabled>
                Savatda
              </button>
            ) : (
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
            ))}
        </footer>
      </article>
    </Link>
  );
}
