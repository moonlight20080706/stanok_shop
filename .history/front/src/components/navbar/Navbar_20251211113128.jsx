import { useContext, useEffect, useState } from "react";
import { FaHeart, FaShoppingCart, FaPlus } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { MdSearch } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Context } from "../../context/useContext";
import { api, BASE_URL_IMG } from "../../service/api";
import "./navbar.css";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { admin, setToken, setAdmin, cartItems, decoded, setDecoded } =
    useContext(Context);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const hidePages = ["/login"];
  const hidePages2 = ["/product"];

  const getImageSrc = (img) => {
    if (!img) return "/no-image.png";
    if (img.startsWith("blob:") || img.startsWith("http")) return img;
    const fixedImg = img.replace("/uploadsimg", "/uploads/img");
    return BASE_URL_IMG + fixedImg;
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== "") {
        api
          .get(`/search?query=${encodeURIComponent(searchQuery)}`)
          .then((res) => setSearchResults(res.data))
          .catch(() => setSearchResults([]));
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (hidePages.includes(pathname)) return null;

  const handleLogout = async () => {
    if (!confirm("Siz rostdan ham shu akauntdan chiqib ketmoqchimisiz?"))
      return;

    try {
      await api.delete(`/deleteId/${admin.id}`);
      
    // 🔥 LOCAL STORAGE DAGI HAMMA SAQLANGAN NARSALAR TOZALANADI
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    localStorage.removeItem("cart");
    localStorage.removeItem("likes");

    // 🔥 CONTEXT STATE HAM TOZALANADI
    setAdmin(null);
    setToken("");
    setDecoded(null);

    // 🔥 YONİ ZARARSİZ QILINADI
    navigate("/login");

    // 🔥 OXIRIDA REFRESH QILSA BO’LADI (ixtiyoriy)
    window.location.reload();
    } catch (err) {
      console.error(err);
    }

    // // 🔥 LOCAL STORAGE DAGI HAMMA SAQLANGAN NARSALAR TOZALANADI
    // localStorage.removeItem("token");
    // localStorage.removeItem("admin");
    // localStorage.removeItem("cart");
    // localStorage.removeItem("likes");

    // // 🔥 CONTEXT STATE HAM TOZALANADI
    // setAdmin(null);
    // setToken("");
    // setDecoded(null);

    // // 🔥 YONİ ZARARSİZ QILINADI
    // navigate("/login");

    // // 🔥 OXIRIDA REFRESH QILSA BO’LADI (ixtiyoriy)
    // window.location.reload();
  };

  return (
    <header className="header">
      <Link className="logo" to={"/"}>
        {/* <span>S</span>
        <span>D</span>
        <span>S</span>
         <br />
        <span>M</span>
        <span>A</span>
        <span>X</span> */}
        SDS MAX
      </Link>

      <div className="header-right">
        {hidePages2.includes(pathname) ? null : (
          <div className="search-container">
            <input
              type="text"
              placeholder="Qidirish..."
              className="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <MdSearch className="icon" />
            {searchResults.length > 0 && (
              <ul className="search-results">
                <h3>Mahsulotlar</h3>
                {searchResults.map((item) => (
                  <li key={item.id}>
                    <Link
                      to={`/product/${item.id}`}
                      onClick={() => setSearchQuery("")}
                      className="search-item"
                    >
                      <img
                        src={getImageSrc(item.img)}
                        alt={item.title || "Mahsulot"}
                      />
                      <p>{item.title}</p>
                      <p>{item.price}</p>
                    </Link>
                    <hr />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
       <div className="navbar-icons">
         {admin &&
        decoded &&
        (decoded.role === "super_admin" || decoded.role === "admin") ? (
          <>
            {pathname !== "/admin" && (
              <Link to={"/admin"} className="icon">
                <FaPlus />
              </Link>
            )}
            <button className="icon" onClick={handleLogout}>
              Chiqish
            </button>
          </>
        ) : (
          <>
            <Link to={"/likes"} className="icon">
              <FaHeart />
            </Link>
            <Link to={"/cart"} className="icon">
              <FaShoppingCart />
              {cartItems.length > 0 && <span>{cartItems.length}</span>}
            </Link>
            <Link to={"/login"} className="icon">
              <IoPersonSharp />
            </Link>
          </>
        )}
       </div>
      </div>
    </header>
  );
};

export default Navbar;
