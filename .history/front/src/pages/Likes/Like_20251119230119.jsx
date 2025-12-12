import { useContext } from "react";
import { Context } from "../../context/useContext";
import { BASE_URL_IMG } from "../../service/api"; // 🔹 qo‘shildi
import "./like.css";
import { Link } from "react-router-dom";

const Like = () => {
  const { likes, removeLike } = useContext(Context);

  if (likes.length === 0) return <p>Hech qanday yoqtirilgan mahsulot yo‘q</p>;

  console.log(likes);

  const getImgSrc = (img) => {
    if (!img) return "/no-image.png";
    if (img.startsWith("http") || img.startsWith("blob:")) return img;
    return BASE_URL_IMG + img; // 🔹 asosiy yechim
  };

  return (
    <Link to={`/product/${id}`}>
      Bosh sahifaga qaytish
    </Link>
  );
};

export default Like;
