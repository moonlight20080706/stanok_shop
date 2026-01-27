import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/login/Login";
import Like from "./pages/Likes/Like";
import Cart from "./pages/cart/Cart";
import Product from "./pages/products/Product";
import Admin from "./pages/admin/Admin";
import Home from "./pages/Home/Home";
import Footer from "./components/footer/Footer";
import { api } from "./service/api";
import { useState , useEffect } from "react";
import Info from "./pages/info/Info";

const App = () => {
  const [footerInfo, setFooterInfo] = useState([]);

   const getFooterInfo = async () => {
      try {
        const res = await api.get("/footer");
        if (res.status === 200) {
          setFooterInfo(res.data);
        }
      } catch (error) {
        console.error("Footer olishda xatolik:", error);
      }
    };
    useEffect(() => {
      getFooterInfo(); // ✅ sahifa ochilganda footerni ham olib kelamiz
    }, []);
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/likes" element={<Like />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/info" element={<Info />} />
        </Routes>
      </main>
       {/* ✅ Footer */}
     <Footer/>
    </>
  );
};

export default App;
