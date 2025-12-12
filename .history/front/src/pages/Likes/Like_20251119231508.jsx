import { useContext } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api";
import "./like.css";
import { Link } from "react-router-dom";

const Like = () => {
  const { likes, removeLike, addToCart } = useContext(Context);

  if (likes.length === 0)
    return <p>Hech qanday yoqtirilgan mahsulot yo‘q</p>;

  const getImgSrc = (img) => {
    if (!img) return "/no-image.png";
    if (img.startsWith("http") || img.startsWith("blob:")) return img;
    return BASE_URL_IMG + img;
  };

  return (
    <div className="like-page">
      <h1>Yoqtirilgan mahsulotlar</h1>

      {likes.map((item) => (
        <div key={item.id} className="like-item">

          <Link to={`/product/${item.id}`} className="like-link">
            <img src={getImgSrc(item.img)} alt={item.title} />
            <h2>{item.title}</h2>
            <p>Narxi: {item.price} so'm</p>
          </Link>


          <button onClick={() => removeLike(item.id)}>
            O‘chirish
          </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(e);
              }}
              className="pro-card-btn"
            >
              Savatchaga
            </button>
        </div>
      ))}
    </div>
  );
};

export default Like;
